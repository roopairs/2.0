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
from ..Tenants.models import Tenant
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
NOT_YOUR_PROPERTY = 'The property given is not the tenant\'s property'
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
        isPm = inData.get('isPm')
        if isPm:
            required = ['provId', 'serviceCategory', 'serviceType', 'serviceDate', 'details', 'token', 'propId', 'appId', 'isPm']
        else:
            required = ['tenId', 'serviceCategory', 'serviceType', 'serviceDate', 'details', 'token', 'propId', 'appId', 'isPm']
        missingFields = checkRequired(required, inData)

        url = BASE_URL + 'service-locations/' + '/propId/jobs/'

        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))

        provId = inData.get('provId')
        serviceCategory = inData.get('serviceCategory')
        serviceDateStr = inData.get('serviceDate')
        serviceType = inData.get('serviceType')
        details = inData.get('details')
        propId = inData.get('propId')
        appId = inData.get('appId')
        token = inData.get('token')
        serviceDate = dateutil.parser.parse(serviceDateStr)
        propList = Property.objects.filter(rooId=propId)
        appList = Appliance.objects.filter(rooAppId=appId)
        if isPm:
            provList = ServiceProvider.objects.filter(id=provId)
            status = 'Pending'
        else:
            provList = ServiceProvider.objects.all()
            status = 'WaitingApproval'
            tenId = inData.get('tenId')
            tenant = Tenant.objects.filter(id=propId)[0]
            if Property.filter(rooId=tenant.place).length == 0:
                return JsonResponse(data=returnError(NOT_YOUR_PROPERTY))

        if propList.exists():
            prop = propList[0]
            if (appList.exists()):
                app = appList[0]
            else:
                app = None
            types = ['Repair', 'Installation', 'Maintenance']
            typeNum = -1
            for i in range(0, len(types)):
                if types[i] == serviceType:
                    typeNum = i + 1
            prov = provList[0]

            data = {
                        'service_company': provId,
                        'service_category': 1,
                        'service_type': typeNum,
                        'details': details,
                        'point_of_contact_name': str(prop.pm),
                        'requested_arrival_time': str(serviceDate)
                }
            print("TOKEN?")
            print(token)
            info = postRooTokenAPI(url, data, token)
            if NON_FIELD_ERRORS in info:
                return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
            elif(info.get('detail') == 'Invalid token.'):
                return JsonResponse(data=returnError(info.get('detail')))
            req = ServiceRequest(serviceCategory=serviceCategory,
                                serviceCompany=prov,
                                serviceType=str(typeNum),
                                status=status,
                                client=str(prop.pm),
                                serviceDate=serviceDate,
                                details=details,
                                location=prop,
                                appFixed=app)
            try:
                req.save()
            except Exception as e:
                return JsonResponse(data=req(e.message))
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
        required = ['reqId', 'status']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            id = inData.get('reqId')
            status = inData.get('status')

            # The ServiceRequest
            reqList = ServiceRequest.objects.filter(id=id)
            if reqList.exists():
                req = reqList[0]

                req.status = status
                try:
                    req.save()
                except Exception as e:
                    return JsonResponse(data=returnError(e.message))
                return JsonResponse(data={STATUS: SUCCESS})
            else:
                return JsonResponse(data=returnError(SERVREQ_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    def get(self, request, inPropId):
        propId = inPropId
        reqList = ServiceRequest.objects.filter(location__rooId=propId)
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
    
    def get_pm(self, request, inPmId):
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
