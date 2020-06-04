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
from ..Tools.models import Token
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
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(token.isPm()):
            user = token.getPm()
        else:
            user = token.getTenant()

        required = ['serviceCategory', 'serviceType', 'serviceDate',
                    'details', 'pocName', 'poc', 'propId', 'appId']

        if token.isPm():
            required.append('provId')
        else:
            required.append('phoneNumber')
        inData = json.loads(request.body)
        missingFields = checkRequired(required, inData)

        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        provId = inData.get('provId')
        serviceCategory = inData.get('serviceCategory')
        serviceDateStr = inData.get('serviceDate')
        serviceType = inData.get('serviceType')
        details = inData.get('details')
        propId = inData.get('propId')
        appId = inData.get('appId')
        poc = inData.get('poc')
        pocName = inData.get('pocName')
        serviceDate = dateutil.parser.parse(serviceDateStr)

        try:
            app = Appliance.objects.filter(rooAppId=appId)
        except Exception as e:
            return JsonResponse(returnError("Could not find an appliance with that id."))
        if not app.exists():
            app = None
        types = ['Repair', 'Installation', 'Maintenance']
        typeNum = 1
        for i in range(0, len(types)):
            if types[i] == serviceType:
                typeNum = i + 1

        if token.isPm():
            # Make sure the property exists and is owned by the requester
            try:
                prop = Property.objects.get(rooId=propId)
            except Exception as e:
                return JsonResponse(returnError("This property cannot be found."))

            try:
                prov = ServiceProvider.objects.get(id=provId)
            except Exception as e:
                return JsonResponse(returnError("Service Provider not found with that id"))

            status = 'Pending'
            data = {
                        'service_company': prov.rooId,
                        'service_category': 1,
                        'service_type': typeNum,
                        'details': details,
                        'point_of_contact_name': pocName,
                        'requested_arrival_time': str(serviceDate)
                   }

            url = BASE_URL + 'service-locations/' + propId + '/jobs/'
            info = postRooTokenAPI(url, data, token.getRooPairsToken())
            if NON_FIELD_ERRORS in info:
                return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
            elif(info.get('detail') == 'Invalid token.'):
                return JsonResponse(data=returnError(info.get('detail')))
            print(info)
        else:
            provList = ServiceProvider.objects.all()
            prov = provList[0]
            status = 'WaitingApproval'
            phoneNumber = inData.get('phoneNumber')

            tenant = token.getTenant()
            if propId != tenant.place.rooId:
                return JsonResponse(data=returnError(NOT_YOUR_PROPERTY))

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

    def put(self, request):
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        inData = json.loads(request.body)
        required = ['reqId', 'status']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) > 0):
            return JsonResponse(data=missingError(missingFields))

        id = inData.get('reqId')
        status = inData.get('status')

        # The ServiceRequest
        try:
            req = ServiceRequest.objects.get(id=id)
        except Exception as e:
            return JsonResponse(returnError(SERVREQ_DOESNT_EXIS))

        if req.status == 'WaitingApproval' and status == 'Pending':
            url = BASE_URL + 'service-locations/' + '/propId/jobs/'
            types = ['Repair', 'Installation', 'Maintenance']
            typeNum = 1
            for i in range(0, len(types)):
                if types[i] == req.serviceType:
                    typeNum = i + 1

            data = {
                        'service_company': req.serviceCompany.rooId,
                        'service_category': 1,
                        'service_type': typeNum,
                        'details': req.details,
                        'point_of_contact_name': str(req.pocName),
                        'requested_arrival_time': str(req.serviceDate)
                }
            info = postRooTokenAPI(url, data, token.getRooPairsToken())
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

    def get(self, request, inPropId):
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(token.isPm()):
            pm = token.getPm()
        else:
            pm = token.getTenant().pm

        try:
            prop = Property.objects.get(rooId=inPropId)
            print("SANITY CHECK")
            if(prop.pm != pm):
                return JsonResponse(returnError("You do not own this property."))
        except Exception as e:
            return JsonResponse(returnError("Property not found with that id."))

        reqList = ServiceRequest.objects.filter(location__pm=pm)
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
        # This is token validation
        try:
            token = Token.objects.get(token=request.headers.get('Token'))
            if(not token.isValid()):
                return JsonResponse(returnError("Token has expired."))
        except Exception as e:
            return JsonResponse(returnError("Not a valid token."))

        if(not token.isPm()):
            return JsonResponse(returnError("You are not a pm."))
        pm = token.getPm()

        if(pm.id != inPmId):
            return JsonResponse(returnError("Url id and token id differ."))

        reqList = ServiceRequest.objects.filter(location__pm=pm.id)
        if(not reqList.exists()):
            return JsonResponse(data=returnError(SERVREQ_DOESNT_EXIST))

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
