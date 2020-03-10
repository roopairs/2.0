import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..helperFuncs import getRooTokenAPI, postRooTokenAPI, putRooTokenAPI
from ..PropertyManagers.models import PropertyManager
from ..Tenants.models import Tenant
from ..Appliances.models import Appliance
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


def addNewProperties(email, token):
    # This is for requesting properties from them
    url = BASE_URL + "service-locations/"
    properties = getRooTokenAPI(url, token)

    # Now check each of the properties against the database to see if
    # any of them are new
    # For now we will just assign them a default bed, bath and tenants
    # of 1 since front end is not set up to ask them yet
    if isinstance(properties, dict):
        if(properties.get('detail') == 'Invalid token.'):
            return returnError("Invalid token.")
    for prop in properties:
        propId = prop.get('id')
        print("PROPID")
        print(propId)
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
            prop.save()
            print("WHACK")
            print(prop.rooId)


################################################################################
# Views / API Endpoints
#

@method_decorator(csrf_exempt, name='dispatch')
class PropertyView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['streetAddress', 'pm', 'numBed', 
                    'numBath', 'maxTenants', 'token']
        missingFields = checkRequired(required, inData)

        url = BASE_URL + 'service-locations/'

        # If they missed any fields just return
        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        splitAddress = inData.get('streetAddress').split(',')
        streetAddress = splitAddress[0]
        city = splitAddress[1]
        state = splitAddress[2]
        pm = inData.get('pm')
        numBed = inData.get('numBed')
        numBath = inData.get('numBath')
        maxTenants = inData.get('maxTenants')
        token = inData.get('token')
        sendAddress = streetAddress + ", " + city + ", " + state

        # FIRST NEED TO SEE IF IT ALREADY EXISTS
        # Since properties get synced when you login, we only have to
        # check our database
        isMade = Property.objects.filter(streetAddress=streetAddress, city=city, state=state)

        # Check to see if it already exists and just return if it does
        if(isMade.exists()):
            return JsonResponse(data=returnError(PROPERTY_ALREADY_EXISTS))

        # If it doesn't exist in our database, add it to ours, then to Roopairs
        pmList = PropertyManager.objects.filter(email=pm)
        if(not pmList.exists()):
            return JsonResponse(returnError(PM_DOESNT_EXIST))
        if(pmList.count() > 1):
            return JsonResponse(returnError(PM_SQUISH))

        data = {
                   'physical_address': sendAddress
               }
        info = postRooTokenAPI(url, data, token)

        if NON_FIELD_ERRORS in info:
            return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
        elif(info.get('detail') == 'Invalid token.'):
            return JsonResponse(data=returnError(info.get('detail')))
        else:
            pm = pmList[0]
            prop = Property(streetAddress=streetAddress,
                            city=city,
                            state=state,
                            numBed=numBed,
                            numBath=numBath,
                            maxTenants=maxTenants,
                            rooId=info.get('id'),
                            pm=pm)
            prop.save()
            data = {
                       STATUS: SUCCESS,
                       'propId': info.get('id')
                   }
            return JsonResponse(data=data)

    def put(self, request):
        inData = json.loads(request.body)
        url = BASE_URL + 'service-locations/'
        inData = json.loads(request.body)

        required = ['streetAddress', 'pm', 'numBed', 'numBath',
                    'maxTenants', 'token', 'propId']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            splitAddress = inData.get('streetAddress').split(',')
            streetAddress = splitAddress[0]
            city = splitAddress[1]
            state = splitAddress[2]
            pm = inData.get('pm')
            numBed = inData.get('numBed')
            numBath = inData.get('numBath')
            maxTenants = inData.get('maxTenants')
            token = inData.get('token')
            propId = inData.get('propId')

            # Before anything we check to see if the updated place exists already
            # because that is an easy and obviouos error to throw before
            # doing any work
            possibleMatches = Property.objects.filter(streetAddress=streetAddress,
                                                      city=city)
            if(possibleMatches.exists()):
                return JsonResponse(returnError(PROPERTY_ALREADY_EXISTS))

            url = url + propId + '/'

            sendAddress = streetAddress + ", " + city + ", " + state
            data = {
                       'physical_address': sendAddress
                   }
            response = putRooTokenAPI(url, data, token)

            if(not response.get('id') == propId):
                JsonResponse(data=returnError("UPDATE FAILED"))

            thePropertyList = Property.objects.filter(rooId=propId)

            if thePropertyList.exists():
                if thePropertyList.count() == 1:
                    theProperty = thePropertyList[0]
                    if theProperty.pm.email == pm:
                        theProperty.city = city
                        theProperty.state = state
                        theProperty.numBed = numBed
                        theProperty.numBath = numBath
                        theProperty.maxTenants = maxTenants
                        theProperty.streetAddress = streetAddress
                        theProperty.save()
                        return JsonResponse(data={STATUS: SUCCESS})
                    else:
                        return JsonResponse(data=returnError(NOT_PROP_OWNER))
                else:
                    return JsonResponse(data=returnError(PROPERTY_SQUISH))
            else:
                return JsonResponse(data=returnError(PROPERTY_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def get(self, request, inPropId):
        listOfTenants = Tenant.objects.filter(place__rooId=inPropId) 
        listOfNice = []
        for ten in listOfTenants:
           listOfNice.append(ten.toDict())

        listOfApps = Appliance.objects.filter(place__rooId=inPropId) 
        listOfNiceApps = []
        for app in listOfApps:
           listOfNiceApps.append(app.toDict())

        returnable = {
                         STATUS: SUCCESS,
                         'tenants': listOfNice,
                         'appliances': listOfNiceApps
                     }
        return JsonResponse(returnable)
