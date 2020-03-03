import json

from django.http import JsonResponse
from django.views import View

from ..Properties.models import Property
from .models import Appliance


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


class ApplianceView(View):
    # Create a new appliance
    def post(self, request):
        inData = json.loads(request.body)
        required = ['name', 'manufacturer', 'category', 'modelNum', 'serialNum', 'location', 'propId']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) == 0):
            name = inData.get('name')
            manufacturer = inData.get('manufacturer')
            category = inData.get('category')
            modelNum = inData.get('modelNum')
            serialNum = inData.get('serialNum')
            location = inData.get('location')
            propId = inData.get('propId')
            propList = Property.objects.filter(id=propId)
            if propList.exists():
                prop = propList[0]
                app = Appliance(name=name,
                                manufacturer=manufacturer,
                                category=category,
                                modelNum=modelNum,
                                serialNum=serialNum,
                                location=location,
                                place=prop)
                app.save()
                data = {
                        STATUS: SUCCESS,
                        'appId': app.id
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(PROPERTY_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    # Update a appliance
    def put(self, request):
        inData = json.loads(request.body)
        required = ['appId', 'newName', 'newCategory', 'newManufacturer', 'newModelNum', 'newSerialNum', 'newLocation']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            appId = inData.get('appId')
            newName = inData.get('newName')
            newCategory = inData.get('newCategory')
            newManufacturer = inData.get('newManufacturer')
            newModelNum = inData.get('newModelNum')
            newSerialNum = inData.get('newSerialNum')
            newLocation = inData.get('newLocation')

            # The Appliance
            appList = Appliance.objects.filter(id=appId)
            if appList.exists():
                app = appList[0]
                app.name = newName
                app.location = newLocation
                app.category = newCategory
                app.manufacturer = newManufacturer
                app.serialNum = newSerialNum
                app.modelNum = newModelNum
                app.save()
                return JsonResponse(data={STATUS: SUCCESS})
            else:
                return JsonResponse(data=returnError(APPLIANCE_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    # Read a appliance (unused)
    def get(self, request):
        inData = json.loads(request.body)
        required = ['appId']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            appId = inData.get('appId')
            appList = Appliance.objects.filter(id=appId)
            if appList.exists():
                app = appList[0]
                data = {
                           STATUS: SUCCESS,
                           'app': app.toDict(),
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(APPLIANCE_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))

    # delete a appliance (unused)
    def delete(self, request):
        inData = json.loads(request.body)
        required = ['appId']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) == 0):
            appId = inData.get('appId')
            appList = Appliance.objects.filter(id=appId)
            if appList.exists():
                app = appList[0]
                app.delete()
                data = {
                           STATUS: SUCCESS,
                       }
                return JsonResponse(data=data)
            else:
                return JsonResponse(data=returnError(APPLIANCE_DOESNT_EXIST))
        else:
            return JsonResponse(data=missingError(missingFields))
