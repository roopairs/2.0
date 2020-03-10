import datetime
import json

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
from django.views import View

from ..helperFuncs import getRooTokenAPI, postRooTokenAPI

from ..Appliances.models import Appliance
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
class ServiceRequestView(View):
    def post(self, request):
        inData = json.loads(request.body)
        required = ['job', 'provId', 'client', 'status', 'dayStarted', 'details', 'token', 'propId', 'appId']
        missingFields = checkRequired(required, inData)
        #propId for our database is the same for roopairs id so use same on for both things
        #ask about shit I dont know

        url = BASE_URL + 'service-locations/' + '/propId/jobs/'

        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))

        job = inData.get('job')
        provId = inData.get('provId')
        client = inData.get('client')
        status = inData.get('status')
        dayStartedStr = inData.get('dayStarted')
        details = inData.get('details')
        propId = inData.get('propId')
        appId = inData.get('appId')
        token = inData.get('token')
        dayStarted = datetime.datetime.strptime(dayStartedStr, "%Y-%m-%d").date()
        propList = Property.objects.filter(id=propId)
        appList = Appliance.objects.filter(id=appId)
        provList = ServiceProvider.objects.filter(id=provId)
        if propList.exists() and appList.exists():
            prop = propList[0]
            app = appList[0]
            prov = provList[0]

            data = {
                        'service_company': provId,
                        'service_category': 1,
                        'service_type': 1,
                        'details': details,
                        'point_of_contact_name': str(prop.pm),
                        'requested_arrival_time': str(dayStarted)
                   }
            info = postRooTokenAPI(url, data, token)
            if NON_FIELD_ERRORS in info:
                return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
            elif(info.get('detail') == 'Invalid token.'):
                return JsonResponse(data=returnError(info.get('detail')))

            req = ServiceRequest(job=job,
                                 serviceCompany=prov,
                                 client=client,
                                 status=status,
                                 dayStarted=dayStarted,
                                 details=details,
                                 location=prop,
                                 appFixed=app)
            req.save()
            data = {
                    STATUS: SUCCESS,
                    'reqId': req.id
                    }
            return JsonResponse(data=data)
        else:
            if propList.exists():
                return JsonResponse(data=returnError(APPLIANCE_DOESNT_EXIST))
            else:
                return JsonResponse(data=returnError(PROPERTY_DOESNT_EXIST))


    def put(self, request):
        inData = json.loads(request.body)
        required = ['reqId', 'job', 'provId', 'client', 'status', 'dayStarted', 'details', 'propId', 'appId']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            id = inData.get('reqId')
            job = inData.get('job')
            provId = inData.get('provId')
            client = inData.get('client')
            status = inData.get('status')
            dayStartedStr = inData.get('dayStarted')
            details = inData.get('details')
            propId = inData.get('propId')
            appId = inData.get('appId')
            dayStarted = datetime.datetime.strptime(dayStartedStr, "%Y-%m-%d").date()
            propList = Property.objects.filter(id=propId)
            appList = Appliance.objects.filter(id=appId)
            provList = ServiceProvider.objects.filter(id=provId)

            # The ServiceRequest
            reqList = ServiceRequest.objects.filter(id=id)
            if reqList.exists():
                req = reqList[0]
                prop = propList[0]
                app = appList[0]
                prov = provList[0]
                
                req.job = job
                req.serviceCompany = prov
                req.client = client
                req.status = status
                req.dayStarted = dayStarted
                req.details = details
                req.location = prop
                req.appFixed = app
                req.save()
                return JsonResponse(data={STATUS: SUCCESS})
            else:
                return JsonResponse(data=returnError(SERVREQ_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def get(self, request, inPropId):
        propId = inPropId
        reqList = ServiceRequest.objects.filter(location=propId)
        if reqList.exists():
            newList = []
            for i in reqList:
                newList.append(i.toDict())
            data = {
                       STATUS: SUCCESS,
                       'reqs': newList,
                   }
            return JsonResponse(data=data)
        else:
            return JsonResponse(data=returnError(SERVREQ_DOESNT_EXIST))
