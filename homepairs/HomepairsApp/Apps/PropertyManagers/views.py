import json

from django.http import JsonResponse
from django.views import View

from ..helperFuncs import postRooAPI
from ..Properties.models import Property
from ..Properties.views import addNewProperties
from .models import PropertyManager


################################################################################
# CONSTANTS
#
INCORRECT_FIELDS = 'Incorrect fields'
MULTIPLE_ACCOUNTS = 'Multiple Accounts Detected'
MULTIPLE_PROPERTIES = 'Multiple properties with same address found'
STATUS = 'status'
SUCCESS = 'success'
FAIL = 'failure'
ERROR = 'error'
ROOPAIR_ACCOUNT_CREATION_FAILED = 'Failed to create a Roopairs account'
HOMEPAIRS_ACCOUNT_CREATION_FAILED = 'Failed to create a Homepairs account'
TOO_MANY_PROPERTIES = 'Too many properties associated with tenant'
PROPERTY_SQUISH = 'This address and city are associated with more than one property'
PM_SQUISH = 'This email is associated with more than one pm'
INVALID_PROPERTY = 'Invalid property'
PROPERTY_ALREADY_EXISTS = 'Property given already exists'
NON_FIELD_ERRORS = 'non_field_errors'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
NOT_PROP_OWNER = 'You are not the property owner'
TOKEN = 'token'
RESIDENTIAL_CODE = 1
INCORRECT_CREDENTIALS = ['Unable to log in with provided credentials.']

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


def getPropertyManager(email):
    # Gets the list of propety managers with that email
    pmList = PropertyManager.objects.filter(email=email)
    if pmList.exists():
        if pmList.count() == 1:
            thisPM = pmList[0]
            propertyList = Property.objects.filter(pm=thisPM)
            sendPropList = []
            for prop in propertyList:
                tempProp = prop.toDict()
                print("TEMP RPOP")
                print(tempProp)
                sendPropList.append(tempProp)
            return {
                       STATUS: SUCCESS,
                       'pm': thisPM.toDict(),
                       'properties': sendPropList,
                   }
        return returnError(MULTIPLE_ACCOUNTS)
    return returnError(INCORRECT_FIELDS)


################################################################################
# Login Helpers
#


def pmLogin(email, password):
    url = BASE_URL + 'auth/login/'

    data = {
               'username': email,
               'password': password
           }
    info = postRooAPI(url, data)

    if NON_FIELD_ERRORS in info:
        return returnError(info.get(NON_FIELD_ERRORS))
    elif TOKEN in info:
        if(not PropertyManager.objects.filter(email=email).exists()):
            # Then they don't exist in our database
            firstName = info.get('first_name')
            lastName = info.get('last_name')
            email = info.get('email')
            tempPM = PropertyManager(firstName=firstName,
                                     lastName=lastName,
                                     email=email)
            tempPM.save()

        tempDict = getPropertyManager(email)

        if tempDict[STATUS] == FAIL:
            return returnError('%s: %s' % (HOMEPAIRS_ACCOUNT_CREATION_FAILED, tempDict[ERROR]))

        addNewProperties(email, info.get(TOKEN))

        tempDict = getPropertyManager(email)
        tempDict[TOKEN] = info.get(TOKEN)
        return tempDict

################################################################################
# Views / API Endpoints
#


class LoginView(View):

    def post(self, request):
        inData = json.loads(request.body)
        required = ['email', 'password']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            email = inData.get('email')
            password = inData.get('password')

            pmTest = pmLogin(email, password)
            if pmTest.get(STATUS) == SUCCESS:
                pmTest['role'] = 'pm'

            return JsonResponse(pmTest, status=200)
        else:
            return JsonResponse(missingError(missingFields), status=200)


class RegisterView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['firstName', 'lastName', 'email', 'password']
        missingFields = checkRequired(required, inData)

        url = BASE_URL + 'auth/register/'

        if(len(missingFields) == 0):
            firstName = inData.get('firstName')
            lastName = inData.get('lastName')
            email = inData.get('email')
            password = inData.get('password')
            pmCompanyName = '%s %s Property Rental' % (firstName, lastName)
            data = {
                      'first_name': firstName,
                      'last_name': lastName,
                      'email': email,
                      'password': password,
                      'internal_client': {
                                            'name': pmCompanyName,
                                            'industry_type': RESIDENTIAL_CODE
                                         }
                   }
            info = postRooAPI(url, data)

            if NON_FIELD_ERRORS in info:
                return JsonResponse(returnError(ROOPAIR_ACCOUNT_CREATION_FAILED))
            elif TOKEN in info:
                tempPM = PropertyManager(
                                           firstName=firstName,
                                           lastName=lastName,
                                           email=email)
                tempPM.save()
                tempDict = getPropertyManager(email)
                if tempDict[STATUS] == FAIL:
                    return JsonResponse(data=returnError(HOMEPAIRS_ACCOUNT_CREATION_FAILED))
                tempDict[TOKEN] = info.get(TOKEN)
                return JsonResponse(data=tempDict)
            else:
                return JsonResponse(data=info)
        else:
            return JsonResponse(data=missingError(missingFields))
