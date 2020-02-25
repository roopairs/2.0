import json
import datetime

from django.views import View
from django.http import JsonResponse
# from rest_framework.decorators import api_view
from rest_framework.response import Response

# from ..Properties.models import Property
from .models import ServiceProvider


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
SERVPRO_DOESNT_EXIST = 'Service provider does not exist.'
SERVPRO_ALREADY_EXIST = 'Service provider already exists.'
APPLIANCE_DOESNT_EXIST = 'Appliance does not exist.'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
NOT_PROP_OWNER = 'You are not the property owner'
TOKEN = 'token'
RESIDENTIAL_CODE = 1
INCORRECT_CREDENTIALS = ['Unable to log in with provided credentials.']

BASE_URL = 'https://capstone.api.roopairs.com/v0/'

################################################################################
# Helper Functions
#


def checkRequired(required, request):
    missingFields = []
    for term in required:
        if(term not in request.data):
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


class ServiceProviderView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['name', 'email', 'phoneNum', 'contractLic', 'skills', 'founded']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            name = inData.get('name')
            email = inData.get('email')
            phoneNum = inData.get('phoneNum')
            contractLic = inData.get('contractLic')
            skills = inData.get('skills')
            dateStr = inData.get('founded')
            founded = datetime.datetime.strptime(dateStr, "%Y-%m-%d").date()
            proList = ServiceProvider.objects.filter(phoneNum=phoneNum)
            if not proList.exists():
                pro = ServiceProvider(name=name,
                                      email=email,
                                      phoneNum=phoneNum,
                                      contractLic=contractLic,
                                      skills=skills,
                                      founded=founded)
                pro.save()
                data = {
                        STATUS: SUCCESS,
                        'id': pro.id,
                        'phoneNum': pro.phoneNum
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(SERVPRO_ALREADY_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def put(self, request):
        inData = json.loads(request.body)
        required = ['id', 'name', 'email', 'phoneNum', 'contractLic', 'skills', 'founded']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            id = inData.get('id')
            name = inData.get('name')
            email = inData.get('email')
            phoneNum = inData.get('phoneNum')
            contractLic = inData.get('contractLic')
            skills = inData.get('skills')
            dateStr = inData.get('founded')
            founded = datetime.datetime.strptime(dateStr, "%Y-%m-%d").date()

            # The ServiceProvider
            proList = ServiceProvider.objects.filter(id=id)
            if proList.exists():
                pro = proList[0]
                pro.name = name
                pro.email = email
                pro.phoneNum = phoneNum
                pro.contractLic = contractLic
                pro.skills = skills
                pro.founded = founded
                pro.save()
                return JsonResponse(data={STATUS: SUCCESS})
            else:
                return JsonResponse(data=returnError(SERVPRO_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def get(self, request):
        inData = json.loads(request.body)
        required = ['phoneNum']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            phoneNum = inData.get('phoneNum')
            proList = ServiceProvider.objects.filter(phoneNum=phoneNum)
            if proList.exists():
                pro = proList[0]
                data = {
                           STATUS: SUCCESS,
                           'pro': pro.toDict(),
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(SERVPRO_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def delete(self, request):
        inData = json.loads(request.body)
        required = ['id']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            id = inData.get('id')
            proList = ServiceProvider.objects.filter(id=id)
            if proList.exists():
                pro = proList[0]
                pro.delete()
                data = {
                           STATUS: SUCCESS,
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(SERVPRO_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))
