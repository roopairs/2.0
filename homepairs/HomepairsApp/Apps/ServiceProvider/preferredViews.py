import datetime
import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import PreferredProviders, ServiceProvider


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
class PreferredProviderView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['phoneNum', 'pmId']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            phoneNum = inData.get('phoneNum')
            pmId = inData.get('pmId')

            proList = ServiceProvider.objects.filter(phoneNum=phoneNum)
            pmList = ServiceProvider.objects.filter(id=pmId)
            if proList.exists() and pmList.exists():
                prefList = PreferredProviders.objects.filter(provider=proList[0],
                                                             pm=pmList[0])
                if not prefList.exists():
                    pref = PreferredProviders(provider=proList[0],
                                              pm=pmList[0])
                    pref.save()
                    data = {
                            STATUS: SUCCESS,
                            prefId: pref.id
                           }
                    return JsonResponse(data)
                else:
                    return JsonResponse(data=returnError(PREF_PRO_ALREADY_EXIST))
            elif proList.exists():
                return JsonResponse(data=returnError(SERVPRO_DOESNT_EXIST))
            else:
                return JsonResponse(data=returnError(PROPERTY_MAN_DOESNT_EXIST))

        else:
            return JsonResponse(data=missingError(missingFields))

    def put(self, request):
        inData = json.loads(request.body)
        required = ['oldPhoneNum', 'name', 'email', 'phoneNum', 'contractLic', 'skills', 'founded']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            oldPhoneNum = inData.get('oldPhoneNum')
            name = inData.get('name')
            email = inData.get('email')
            phoneNum = inData.get('phoneNum')
            contractLic = inData.get('contractLic')
            skills = inData.get('skills')
            dateStr = inData.get('founded')
            try:
                founded = datetime.datetime.strptime(dateStr, "%Y-%m-%d").date()
            except:
                return JsonResponse(data=returnError(INVALID_DATE))

            # The ServiceProvider
            proList = ServiceProvider.objects.filter(phoneNum=oldPhoneNum)
            if proList.exists():
                newProList = ServiceProvider.objects.filter(phoneNum=phoneNum)
                if newProList.exists():
                    return JsonResponse(data=returnError(SERVPRO_ALREADY_EXIST))
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

    def get(self, request, inPmId):
        inData = json.loads(request.body)
        required = ['prefId']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            prefId = inData.get('prefId')

            prefList = PreferredProviders.objects.filter(id=prefId)
            if prefList.exists():
                data = {
                        STATUS: SUCCESS,
                        pref: prefList[0].toDict()
                       }
                return JsonResponse(data)
            else:
                return JsonResponse(data=returnError(PREF_PRO_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def delete(self, request):
        return JsonResponse(data={"SKEL": "ETOR"})
