import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..Appliances.models import Appliance
from ..helperFuncs import getRooTokenAPI, postRooTokenAPI, putRooTokenAPI
from ..PropertyManagers.models import PropertyManager
from ..Tenants.models import Tenant
from ..Tools.models import Token
from .models import Property


# You might need this Tommy but it was pissing of the linter since it is
# currently unused
# from rest_framework.authentication import TokenAuthentication

################################################################################
# CONSTANTS
#
INCORRECT_FIELDS = 'Incorrect fields'
MULTIPLE_PROPERTIES = 'Multiple properties with same address found'
STATUS = 'status'
SUCCESS = 'success'
FAIL = 'failure'
ERROR = 'error'
TOO_MANY_PROPERTIES = 'Too many properties associated with tenant'
PROPERTY_SQUISH = 'This address and city are associated with more than one property'
INVALID_PROPERTY = 'Invalid property'
PROPERTY_ALREADY_EXISTS = 'Property given already exists'
NON_FIELD_ERRORS = 'non_field_errors'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
NOT_PROP_OWNER = 'You are not the property owner'
TOKEN = 'token'
PM_SQUISH = 'This email is associated with more than one pm'
PM_DOESNT_EXIST = 'This email is associated with more than one pm'
RESIDENTIAL_CODE = 1

BASE_URL = 'https://capstone.api.roopairs.com/v0/'

################################################################################
# Helper Functions
#


def checkRequired(required, inData):
    missingFields = []
    for term in required:
        if(term not in inData):
            missingFields.append(term)
    return missingFields


def returnError(error):
    return {STATUS: FAIL, ERROR: error}


def missingError(missingFields):
    finalErrorString = INCORRECT_FIELDS + ": "
    for field in missingFields:
        finalErrorString += field + " "
    return returnError(finalErrorString.strip())


################################################################################
# Getter Functions
#


def getProperty(email, streetAddress, city, state):
    pmList = PropertyManager.objects.filter(email=email)

    # Two quick integrity checks to make sure PM is chill
    # Technically could check this before hand but you know, what
    # are you gonna do ¯\_(ツ)_/¯
    if(not pmList.exists()):
        return returnError(PM_DOESNT_EXIST)
    if(pmList.count() > 1):
        return returnError(PM_SQUISH)

    pm = pmList[0]

    propList = Property.objects.filter(streetAddress=streetAddress, city=city, state=state, pm=pm)

    # Two more integrity checks to make sure this property exists and
    # that only one of them exists
    if(not propList.exists()):
        return returnError(PROPERTY_DOESNT_EXIST)
    if propList.count() > 1:
        return returnError(PROPERTY_SQUISH)

    prop = propList[0]
    return {
               STATUS: SUCCESS,
               'prop': prop.toDict(),
           }

################################################################################
# Adding Functions
#

def roopairsToUs(email, token):
    # This is for requesting properties from them
    url = BASE_URL + "service-locations/"
    properties = getRooTokenAPI(url, token)

    # Now check each of the properties against the database to see if
    # any of them are new
    # For now we will just assign them a default bed, bath and tenants
    # of 1 since front end is not set up to ask them yet
    if isinstance(properties, dict):
        if(properties.get('detail') != None):
            return returnError(properties.get('detail'))
    for prop in properties:
        # We steal the propId froms from Roopairs
        propId = prop.get('id')
        others = Property.objects.filter(rooId=propId)
        if not others.exists():
            # We know the pm account exists in our database and only ours
            # since we checked earlier and it didn't fail so we don't have
            # to check it
            tempPM = PropertyManager.objects.filter(email=email)[0]
            addy = prop.get('physical_address_formatted').split(',')
            tempStreetAddress = addy[0].strip()
            tempCity = addy[1].strip()
            tempState = addy[2].strip().split(' ')[0].strip()

            # This means the property is not already in the database
            prop = Property(streetAddress=tempStreetAddress,
                            city=tempCity,
                            state=tempState,
                            numBed=1,
                            numBath=1,
                            maxTenants=1,
                            rooId=propId,
                            pm=tempPM)
            try:
                prop.save()
            except Exception as e:
                return e.message
    return "success"

def usToRoopairs(token):
    unpostedProperties = Property.objects.filter(rooId='')
    url = BASE_URL + 'service-locations/'

    for prop in unpostedProperties:
        sendAddress = prop.streetAddress + ", " + prop.city + ", " + prop.state

        data = {
                   'physical_address': sendAddress
               }
        info = postRooTokenAPI(url, data, token)

        if(NON_FIELD_ERRORS in info):
            return info.get(NON_FIELD_ERRORS)

        if('detail' in info):
            return info.get('detail')

        prop.rooId = info.get('id')
        prop.save()

    return 'success'

def addNewProperties(email, token):
    temp = roopairsToUs(email, token)
    if(temp != 'success'):
        return temp

    temp = usToRoopairs(token)
    if(temp != 'success'):
        return temp

    return "success"

################################################################################
# Views / API Endpoints
#


@method_decorator(csrf_exempt, name='dispatch')
class PropertyView(View):
    def post(self, request):
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        inData = json.loads(request.body)
        required = ['longAddress', 'numBed', 'numBath', 'maxTenants']
        missingFields = checkRequired(required, inData)

        # If they missed any fields just return
        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        longAddress = inData.get('longAddress')
        splitAddress = longAddress.split(',')
        streetAddress = splitAddress[0]
        city = splitAddress[1]
        state = splitAddress[2]
        numBed = inData.get('numBed')
        numBath = inData.get('numBath')
        maxTenants = inData.get('maxTenants')

        # FIRST NEED TO SEE IF IT ALREADY EXISTS
        # Since properties get synced when you login, we only have to
        # check our database
        try:
            temp = Property.objects.get(streetAddress=streetAddress, city=city, state=state)
            return JsonResponse(returnError("Property at this address already exists."))
        except Exception as e:
            pass

        # Add it to their database, then add it to ours
        data = {
                   'physical_address': longAddress
               }
        url = BASE_URL + 'service-locations/'
        info = postRooTokenAPI(url, data, token.getRooPairsToken())

        if(NON_FIELD_ERRORS in info):
            return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))

        if(info.get('detail') == 'Invalid token.'):
            return JsonResponse(data=returnError(info.get('detail')))

        propId = info.get('id')

        prop = Property(streetAddress=streetAddress,
                        city=city,
                        state=state,
                        numBed=numBed,
                        numBath=numBath,
                        maxTenants=maxTenants,
                        rooId=propId,
                        pm=pm)
        try:
            prop.save()
        except Exception as e:
            return JsonResponse(data=request(e.message))

        data = {
                   STATUS: SUCCESS,
                   'propId': propId
               }
        return JsonResponse(data=data)

    def put(self, request):
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        inData = json.loads(request.body)
        required = ['longAddress', 'numBed', 'numBath', 'maxTenants', 'propId']

        missingFields = checkRequired(required, inData)
        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        longAddress = inData.get('longAddress')
        splitAddress = longAddress.split(',')

        streetAddress = splitAddress[0]
        city = splitAddress[1]
        state = splitAddress[2]
        numBed = inData.get('numBed')
        numBath = inData.get('numBath')
        maxTenants = inData.get('maxTenants')
        propId = inData.get('propId')

        # Making sure the property id is valid
        try:
            propToUpdate = Property.objects.get(rooId = propId)
            if(propToUpdate.pm != pm):
                return JsonResponse(returnError("You do not own this property."))
        except Exception as e:
            return JsonResponse(returnError("A property with this id does not exist."))

        # Making sure the property isn't being updated into another properties address
        try:
            propToUpdate = Property.objects.get(streetAddress=streetAddress, 
                                                city=city, state=state, rooId=propId)
        except Exception as e:
            pass

        url = BASE_URL + 'service-locations/' + propId + '/'

        data = {
                   'physical_address': longAddress
               }
        response = putRooTokenAPI(url, data, token.getRooPairsToken())

        # THIS IS FUNNY
        if(not response.get('id') == propId):
            JsonResponse(data=returnError("UPDATE FAILED"))

        propToUpdate.streetAddress = streetAddress
        propToUpdate.city = city
        propToUpdate.state = state
        propToUpdate.numBed = numBed
        propToUpdate.numBath = numBath
        propToUpdate.maxTenants = maxTenants
        propToUpdate.save()
        return JsonResponse(data={STATUS: SUCCESS})

    def get(self, request, inPropId):
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))
            
        if(token.isPm()):
            pm = token.getPm()
        else:
            pm = token.getTenant().pm

        temp = token.isPm()

        try:
            place = Property.objects.get(rooId=inPropId, pm=pm)
        except Exception as e:
            return JsonResponse(returnError("Cannot find this property."))

        listOfTenants = Tenant.objects.filter(place__rooId=inPropId)
        listOfNice = []
        for ten in listOfTenants:
            listOfNice.append(ten.toDict())

        listOfApps = Appliance.objects.filter(place__rooId=inPropId)
        listOfNiceApps = []
        for app in listOfApps:
            print("NOTHING HERE")
            listOfNiceApps.append(app.toDict())

        returnable = {
                         STATUS: SUCCESS,
                         'tenants': listOfNice,
                         'appliances': listOfNiceApps
                     }
        return JsonResponse(returnable)
