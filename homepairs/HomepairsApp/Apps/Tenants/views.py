import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..Properties.models import Property
from ..PropertyManagers.models import PropertyManager
from .models import Tenant


# You might need this Tommy but it was pissing of the linter since it is
# currently unused
# from rest_framework.authentication import TokenAuthentication

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
TOO_MANY_TNENANTS = 'Too many tenants associated with this email.'
NO_TENANTS = 'No tenants associated with this email'
PROPERTY_SQUISH = 'This address and city are associated with more than one property'
PM_SQUISH = 'This email is associated with more than one pm'
INVALID_PROPERTY = 'Invalid property'
PROPERTY_ALREADY_EXISTS = 'Property given already exists'
NON_FIELD_ERRORS = 'non_field_errors'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
NOT_PROP_OWNER = 'You are not the property owner'
TENANT_ALREADY_EXISTS = 'The given email already exists for a tenant'
BAD_ADDRESS_FORMAT = 'Bad address format, "address, city, state"'
TOKEN = 'token'
RESIDENTIAL_CODE = 1
INCORRECT_CREDENTIALS = ['Unable to log in with provided credentials.']
EMAIL_ALREADY_USED = 'This email is already in use.'

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


def getTenant(tenantEmail, tenantPassword):
    tenantList = Tenant.objects.filter(email=tenantEmail, password=tenantPassword)
    if tenantList.exists():
        if tenantList.count() == 1:
            tenant = tenantList[0]
            return {
                        STATUS: SUCCESS,
                        'tenant': tenant.toDict(),
                        'properties': [tenant.place.toDict()]
                    }
        return {STATUS: FAIL, ERROR: MULTIPLE_ACCOUNTS}
    return {STATUS: FAIL, ERROR: INCORRECT_CREDENTIALS}


################################################################################
# Views / API Endpoints
#

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['email', 'password']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            email = inData.get('email')
            password = inData.get('password')
            return JsonResponse(getTenant(email, password))
        else:
            return JsonResponse(data=missingError(missingFields))


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['firstName', 'lastName', 'email', 'password', 'address']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            firstName = inData.get('firstName')
            lastName = inData.get('lastName')
            email = inData.get('email')
            streetAddress = inData.get('address')
            password = inData.get('password')

            temp = streetAddress.split(',')
            if len(temp) < 2:
                return JsonResponse(data=returnError(BAD_ADDRESS_FORMAT))
            streetAddress = temp[0]#.strip()
            city = temp[1]#.strip()
            state = temp[2]#.strip()

            tempPms = PropertyManager.objects.filter(email=email)
            tempTens = Tenant.objects.filter(email=email)
            if(tempPms.count() > 0 or tempTens.count() > 0):
                return JsonResponse(data=returnError(EMAIL_ALREADY_USED))

            print(streetAddress)
            print(city)
            print(state)
            propertyList = Property.objects.filter(streetAddress=streetAddress, city=city, state=state)

            tenantList = Tenant.objects.filter(email=email)
            if tenantList.exists():
                return JsonResponse(data=returnError(TENANT_ALREADY_EXISTS))

            if propertyList.exists():
                if propertyList.count() < 2:
                    tenantsProp = propertyList[0]
                    tenantsPM = tenantsProp.pm
                    ten = Tenant(firstName=firstName,
                                 lastName=lastName,
                                 email=email,
                                 password=password,
                                 place=tenantsProp,
                                 pm=tenantsPM)
                    try:
                        ten.save()
                    except Exception as e:
                        return JsonResponse(data=returnError(e.message))
                    tempDict = getTenant(email, password)
                    tempDict['role'] = 'tenant'
                    return JsonResponse(data=tempDict)
                else:
                    return JsonResponse(data=returnError(TOO_MANY_PROPERTIES))
            else:
                return JsonResponse(data=returnError(INVALID_PROPERTY))
        else:
            return JsonResponse(data=missingError(missingFields))


@method_decorator(csrf_exempt, name='dispatch')
class TenantUpdate(View):
    def post(self, request):
        print("Got here")
        inData = json.loads(request.body)
        required = ['email', 'propId', 'firstName', 'lastName', 'phoneNumber']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        email = inData.get('email')
        propId = inData.get('propId')
        firstName = inData.get('firstName')
        lastName = inData.get('lastName')
        phoneNumber = inData.get('phoneNumber')
        propertyList = Property.objects.filter(rooId=propId)
        tenList = Tenant.objects.filter(email=email)

        if(not propertyList.exists()):
            return JsonResponse(data=returnError(INVALID_PROPERTY))
        if(propertyList.count() > 1):
            return JsonResponse(data=returnError(TOO_MANY_PROPERTIES))

        if(not tenList.exists()):
            return JsonResponse(data=returnError(NO_TENANTS))
        if(tenList.count() > 1):
            return JsonResponse(data=returnError(TOO_MANY_TNENANTS))

        tenantsProp = propertyList[0]
        tenant = tenList[0]

        tenant.place = tenantsProp
        tenant.firstName = firstName
        tenant.lastName = lastName
        tenant.phoneNumber = phoneNumber
        try:
            tenant.save()
        except Exception as e:
            return JsonResponse(data=returnError(e.message))

        return JsonResponse(data={STATUS: SUCCESS})
