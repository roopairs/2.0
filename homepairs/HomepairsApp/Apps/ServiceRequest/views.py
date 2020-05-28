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
            required = ['provPhoneNum', 'serviceCategory', 'serviceType', 'serviceDate', 'details', 'pocName', 'poc', 'token', 'propId', 'appId', 'isPm']
        else:
            required = ['phoneNumber', 'serviceCategory', 'serviceType', 'serviceDate', 'details', 'pocName', 'poc', 'propId', 'appId', 'isPm']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))

        provPhoneNum = inData.get('provPhoneNum')
        serviceCategory = inData.get('serviceCategory')
        serviceDateStr = inData.get('serviceDate')
        serviceType = inData.get('serviceType')
        details = inData.get('details')
        propId = inData.get('propId')
        appId = inData.get('appId')
        token = inData.get('token')
        poc = inData.get('poc')
        pocName = inData.get('pocName')
        serviceDate = dateutil.parser.parse(serviceDateStr)
        propList = Property.objects.filter(rooId=propId)
        appList = Appliance.objects.filter(rooAppId=appId)
        if propList.exists():
            prop = propList[0]
            url = BASE_URL + 'service-locations/' + '/' + prop.rooId + '/jobs/'
            types = ['Repair', 'Installation', 'Maintenance']
            typeNum = -1
            for i in range(0, len(types)):
                if types[i] == serviceType:
                    typeNum = i + 1
            if isPm:
                provList = ServiceProvider.objects.filter(phoneNum=provPhoneNum)
                if (not provList.exists()):
                    return JsonResponse(data=returnError(SERVPRO_DOESNT_EXIST))
                prov = provList[0]
                status = 'Pending'
                

                data = {
                            'service_company': prov.rooId,
                            'service_category': 1,
                            'service_type': typeNum,
                            'details': details,
                            'point_of_contact_name': pocName,
                            'requested_arrival_time': str(serviceDate)
                    }
                print("TOKEN?")
                print(token)
                info = postRooTokenAPI(url, data, token)
                if NON_FIELD_ERRORS in info:
                    return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
                elif(info.get('detail') == 'Invalid token.'):
                    return JsonResponse(data=returnError(info.get('detail')))
            else:
                provList = ServiceProvider.objects.all()
                status = 'WaitingApproval'
                phoneNumber = inData.get('phoneNumber')
                print(phoneNumber)
                tenant = Tenant.objects.filter(phoneNumber=phoneNumber)[0]
                if propId != tenant.place.rooId:
                    return JsonResponse(data=returnError(NOT_YOUR_PROPERTY))

        
            prop = propList[0]
            if (appList.exists()):
                app = appList[0]
            else:
                app = None
            prov = provList[0]

            req = ServiceRequest(serviceCategory=serviceCategory,
                                serviceCompany=prov,
                                serviceType=str(typeNum),
                                status=status,
                                client=str(prop.pm),
                                serviceDate=serviceDate,
                                details=details,
                                poc=poc,
                                pocName=pocName,
                                location=prop,
                                appFixed=app)
            try:
                req.save()
            except Exception as e:
                return JsonResponse(data=returnError(e.message))
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
        required = ['reqId', 'status', 'token']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            id = inData.get('reqId')
            status = inData.get('status')
            token = inData.get('token')

            # The ServiceRequest
            reqList = ServiceRequest.objects.filter(id=id)
            if reqList.exists():
                req = reqList[0]

                if req.status == 'WaitingApproval' and status == 'Pending':
                    url = BASE_URL + 'service-locations/' + '/propId/jobs/'
                    types = ['Repair', 'Installation', 'Maintenance']
                    typeNum = -1
                    for i in range(0, len(types)):
                        if types[i] == req.serviceType:
                            typeNum = i + 1
                    

                    data = {
                                'service_company': req.location.id,
                                'service_category': 1,
                                'service_type': typeNum,
                                'details': req.details,
                                'point_of_contact_name': str(req.pocName),
                                'requested_arrival_time': str(req.serviceDate)
                        }
                    print("TOKEN?")
                    print(token)
                    info = postRooTokenAPI(url, data, token)
                    if NON_FIELD_ERRORS in info:
                        return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
                    elif(info.get('detail') == 'Invalid token.'):
                        return JsonResponse(data=returnError(info.get('detail')))

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
