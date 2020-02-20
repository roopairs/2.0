import json

from django.http import JsonResponse
from django.views import View

from ..helperFuncs import getRooTokenAPI, postRooTokenAPI, putRooTokenAPI
from ..PropertyManagers.models import PropertyManager
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
    if pmList.exists() and pmList.count() == 1:
        pm = pmList[0]
        propList = Property.objects.filter(streetAddress=streetAddress, city=city, state=state, pm=pm)
        if propList.exists():
            if propList.count() == 1:
                prop = propList[0]
                return {
                           STATUS: SUCCESS,
                           'prop': prop.toDict(),
                       }
            else:
                return {STATUS: FAIL, ERROR: PROPERTY_SQUISH}
        else:
            return {STATUS: FAIL, ERROR: PROPERTY_DOESNT_EXIST}
    return {STATUS: FAIL, ERROR: PM_SQUISH}

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
        addy = prop.get('physical_address_formatted').split(',')
        tempStreetAddress = addy[0].strip()
        tempCity = addy[1].strip()
        tempState = addy[2].strip().split(' ')[0].strip()
        others = Property.objects.filter(streetAddress=tempStreetAddress,
                                         city=tempCity,
                                         state=tempState)
        if not others.exists():
            # We know the pm account exists in our database and only ours
            # since we checked earlier and it didn't fail so we don't have
            # to check it
            tempPM = PropertyManager.objects.filter(email=email)[0]

            # That means the property is not already in the database
            prop = Property(streetAddress=tempStreetAddress,
                            city=tempCity,
                            state=tempState,
                            numBed=1,
                            numBath=1,
                            maxTenants=1,
                            pm=tempPM)
            prop.save()


################################################################################
# Views / API Endpoints
#

class PropertyView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['streetAddress', 'city', 'state', 'pm', 'numBed', 'numBath', 'maxTenants', 'token']
        missingFields = checkRequired(required, inData)

        url = BASE_URL + 'service-locations/'

        if(len(missingFields) == 0):
            streetAddress = inData.get('streetAddress')
            city = inData.get('city')
            state = inData.get('state')
            pm = inData.get('pm')
            numBed = inData.get('numBed')
            numBath = inData.get('numBath')
            maxTenants = inData.get('maxTenants')
            token = inData.get('token')
            sendAddress = streetAddress + ", " + city + ", " + state

            # FIRST NEED TO SEE IF IT ALREADY EXISTS
            # Since properties get synched when you login, we only have to
            # check our database
            isMade = Property.objects.filter(streetAddress=streetAddress, city=city, state=state)
            if not isMade.exists():
                # If it doesn't exist in our database, add it to ours, then to
                # Roopairs
                pmList = PropertyManager.objects.filter(email=pm)
                if pmList.exists() and pmList.count() == 1:
                    pm = pmList[0]
                    prop = Property(streetAddress=streetAddress,
                                    city=city,
                                    state=state,
                                    numBed=numBed,
                                    numBath=numBath,
                                    maxTenants=maxTenants,
                                    pm=pm)
                    prop.save()
                else:
                    return JsonResponse(data=returnError(PM_SQUISH))

                # If we get to here, then adding it to our database was successfull
                data = {
                           'physical_address': sendAddress
                       }
                info = postRooTokenAPI(url, data, token)

                if NON_FIELD_ERRORS in info:
                    return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
                elif(info.get('detail') == 'Invalid token.'):
                    return JsonResponse(data=returnError(info.get('detail')))
                else:
                    data = {
                               STATUS: SUCCESS,
                               'propertyID': info.get('id')
                           }
                    return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(PROPERTY_ALREADY_EXISTS))
        else:
            return JsonResponse(data=missingError(missingFields))

    def put(self, request):
        inData = json.loads(request.body)
        url = BASE_URL + 'service-locations/'
        inData = json.loads(request.body)

        required = ['streetAddress', 'city', 'state', 'pm', 'numBed', 'numBath']
        required.append('maxTenants')
        required.append('oldStreetAddress')
        required.append('oldCity')
        required.append('token')
        required.append('propID')
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            oldStreetAddress = inData.get('oldStreetAddress')
            oldCity = inData.get('oldCity')
            streetAddress = inData.get('streetAddress')
            city = inData.get('city')
            state = inData.get('state')
            pm = inData.get('pm')
            numBed = inData.get('numBed')
            numBath = inData.get('numBath')
            maxTenants = inData.get('maxTenants')
            token = inData.get('token')
            propID = inData.get('propID')

            url = url + propID + '/'

            sendAddress = streetAddress + ", " + city + ", " + state
            data = {
                       'physical_address': sendAddress
                   }
            response = putRooTokenAPI(url, data, token)

            if(not response.get('id') == propID):
                JsonResponse(data=returnError("UPDATE FAILED"))

            thePropertyList = Property.objects.filter(streetAddress=oldStreetAddress,
                                                      city=oldCity)

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
