import datetime
import json
import re

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import PreferredProviders, ServiceProvider
from ..PropertyManagers.models import PropertyManager
from ..Tools.models import Token

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
INVALID_DATE = 'Invalid date'
PROPERTY_ALREADY_EXISTS = 'Property given already exists'
NON_FIELD_ERRORS = 'non_field_errors'
SERVPRO_DOESNT_EXIST = 'Service provider does not exist.'
SERVPRO_ALREADY_EXIST = 'Service provider already exists.'
PREF_PRO_DOESNT_EXIST = 'Preferred service provider doesnt exists.'
PREF_PRO_ALREADY_EXIST = 'Preferred service provider already exists.'
APPLIANCE_DOESNT_EXIST = 'Appliance does not exist.'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
NOT_PROP_OWNER = 'You are not the property owner'
TOKEN = 'token'
RESIDENTIAL_CODE = 1
INCORRECT_CREDENTIALS = ['Unable to log in with provided credentials.']
PROPERTY_MAN_DOESNT_EXIST = 'The specified property manager does not exist'

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

##############################################################


@method_decorator(csrf_exempt, name='dispatch')
class PreferredProviderView(View):
    def post(self, request):
        # This is token validation
        try:
            print(request.headers)
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        inData = json.loads(request.body)
        required = ['phoneNum']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))
            
        phoneNum = inData.get('phoneNum')
        phoneNum = re.sub('\D', '', phoneNum)

        try:
            prov = ServiceProvider.objects.get(phoneNum=phoneNum)
        except:
            return JsonResponse(returnError("Service Provider does not exist with that phone number."))
        
        try:
            pref = PreferredProviders.objects.get(provider=proList[0],
                                                      pm=pmList[0])
            data = {
                    STATUS: SUCCESS,
                    'prefId': pref.id
                   }
            return JsonResponse(data=data)
        except:
            pref = PreferredProviders(provider=prov,
                                      pm=pm)
            pref.save()
            data = {
                    STATUS: SUCCESS,
                    'prefId': pref.id
                   }
            return JsonResponse(data)
        else:
            return JsonResponse(data=returnError(PREF_PRO_ALREADY_EXIST))

    def get(self, request):
        # This is token validation
        try:
            print(request.headers)
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        preferredProviders = PreferredProviders.objects.filter(pm=pm)
        niceList = []
        #ALSO RETURN PROVID
        for prov in preferredProviders:
            dict = prov.provider.toDict()
            dict["prefId"] = prov.id
            niceList.append(dict)
        print({'providers': niceList})
        return JsonResponse(data={'providers': niceList})

    def delete(self, request):
        # This is token validation
        try:
            print(request.headers)
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        inData = json.loads(request.body)
        required = ['prefId']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))
        prefId = inData.get('prefId')
        prefList = PreferredProviders.objects.filter(id=prefId)
        if prefList.exists():
            pref = prefList[0]
            pref.delete()
            return JsonResponse(data={STATUS: SUCCESS})
        else:
            return JsonResponse(data=returnError(PREF_PRO_DOESNT_EXIST))
