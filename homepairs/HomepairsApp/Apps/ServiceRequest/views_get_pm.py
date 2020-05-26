import datetime
import json

import dateutil.parser
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..Appliances.models import Appliance
from ..helperFuncs import postRooTokenAPI
from ..Properties.models import Property
from ..ServiceProvider.models import ServiceProvider
from .models import ServiceRequest


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
SERVREQ_DOESNT_EXIST = 'Service request does not exist.'
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
class GetServiceRequestPmView(View):
    def get(self, request, inPmId):
        pmId = inPmId
        reqList = ServiceRequest.objects.filter(location__pm=pmId)
        if reqList.exists():
            newList = []
            for i in reqList:
                newList.append(i.toDict())
            pendNum = 0
            schedNum = 0
            inProgNum = 0
            for i in newList:
                if i['status'] == 'Pending':
                    pendNum += 1
                elif i['status'] == 'In Progress':
                    inProgNum += 1
                elif i['status'] == 'Scheduled':
                    schedNum += 1
            data = {
                       STATUS: SUCCESS,
                       'reqs': newList,
                       'pending': pendNum,
                       'scheduled': schedNum,
                       'inProgress': inProgNum
                   }
            return JsonResponse(data=data)
        else:
            return JsonResponse(data=returnError(SERVREQ_DOESNT_EXIST))
