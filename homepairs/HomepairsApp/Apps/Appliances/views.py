import json

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from ..helperFuncs import postRooTokenAPI
from ..Properties.models import Property
from ..Tools.models import Token
from .models import Appliance


################################################################################
# CONSTANTS
#
INCORRECT_FIELDS = 'Incorrect fields'
STATUS = 'status'
SUCCESS = 'success'
FAIL = 'failure'
ERROR = 'error'
NON_FIELD_ERRORS = 'non_field_errors'
PROPERTY_DOESNT_EXIST = 'Property does not exist.'
APPLIANCE_DOESNT_EXIST = 'Appliance does not exist.'

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
class ApplianceView(View):
    # Create a new appliance
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
        required = ['name', 'category', 'location', 'propId']
        missingFields = checkRequired(required, inData)

        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))

        name = inData.get('name')
        manufacturer = inData.get('manufacturer')
        category = inData.get('category')
        modelNum = inData.get('modelNum')
        serialNum = inData.get('serialNum')
        location = inData.get('location')
        propId = inData.get('propId')

        try:
            prop = Property.objects.get(rooId=propId)
            if(prop.pm != pm):
                return JsonResponse(returnError("You do not own this property."))
        except Exception as e:
            return JsonResponse(returnError("Property doesn't exist."))

        url = BASE_URL + 'service-locations/' + str(propId) + '/equipment/'
        data = {
                   'display_name': name,
                   'type': 1
               }
        info = postRooTokenAPI(url, data, token.getRooPairsToken())

        if NON_FIELD_ERRORS in info:
            return JsonResponse(data=returnError(info.get(NON_FIELD_ERRORS)))
        elif(info.get('detail') == 'Invalid token.'):
            return JsonResponse(data=returnError(info.get('detail')))

        rooAppId = info.get('id')
        app = Appliance(name=name,
                        manufacturer=manufacturer,
                        category=category,
                        modelNum=modelNum,
                        serialNum=serialNum,
                        location=location,
                        rooAppId=rooAppId,
                        place=prop)
        try:
            app.save()
        except Exception as e:
            return JsonResponse(data=returnError(e.message))
        data = {
                STATUS: SUCCESS,
                'appId': app.rooAppId
               }
        return JsonResponse(data=data)

    # Update a appliance

    def put(self, request):
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
        required = ['appId', 'newName', 'newCategory']
        missingFields = checkRequired(required, inData)
        if(len(missingFields) != 0):
            return JsonResponse(data=missingError(missingFields))

        appId = inData.get('appId')
        newName = inData.get('newName')
        newCategory = inData.get('newCategory')
        newManufacturer = inData.get('newManufacturer')
        newModelNum = inData.get('newModelNum')
        newSerialNum = inData.get('newSerialNum')
        newLocation = inData.get('newLocation')

        try:
            appliance = Appliance.objects.get(rooAppId=appId, place__pm = pm)
        except Exception as e:
            return JsonResponse(returnError("An appliance doesn't exist with this id and pm."))


        # The Appliance
        appList = Appliance.objects.filter(rooAppId=appId)
        if appList.exists():
            app = appList[0]
            app.name = newName
            app.location = newLocation
            app.category = newCategory
            app.manufacturer = newManufacturer
            app.serialNum = newSerialNum
            app.modelNum = newModelNum
            app.rooAppId = appId
            try:
                app.save()
            except Exception as e:
                return JsonResponse(data=returnError(e.message))
            return JsonResponse(data={STATUS: SUCCESS})
        else:
            return JsonResponse(data=returnError(APPLIANCE_DOESNT_EXIST))
