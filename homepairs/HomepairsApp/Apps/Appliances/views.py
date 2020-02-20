import json

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Appliance, Property, PropertyManager, Tenant


# You might need this Tommy but it was pissing of the linter since it is
# currently unused
# from rest_framework.authentication import TokenAuthentication

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

@api_view(['GET', 'POST'])
def createAppliance(request):
    # roopairs api does not have a section for appliances yet
    # url = BASE_URL + 'service-locations/'

    required = ['name', 'description', 'location', 'address', 'city', 'state', 'token']

    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        name = request.data.get('name')
        description = request.data.get('description')
        location = request.data.get('location')
        streetAddress = request.data.get('address')
        city = request.data.get('city')
        state = request.data.get('state')

        propList = Property.objects.filter(streetAddress=streetAddress, city=city, state=state)
        if propList.exists():
            prop = propList[0]
            app = Appliance(name=name,
                            description=description,
                            location=location,
                            place=prop)
            app.save()
            data = {
                    STATUS: SUCCESS
                   }
            return Response(data=data)
        else:
            return Response(data=returnError(PROPERTY_DOESNT_EXIST))
    else:
        return Response(data=missingError(missingFields))
