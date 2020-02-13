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

################################################################################
# Getter Functions
#


def getPropertyManager(email):
    # Gets the list of propety managers with that email
    pmList = PropertyManager.objects.filter(email=email)
    if pmList.exists():
        if pmList.count() == 1:
            thisPM = pmList[0]
            propertyList = Property.objects.filter(pm=thisPM)
            sendPropList = []
            for prop in propertyList:
                tempProp = prop.toDict()
                sendPropList.append(tempProp)
            return {
                       STATUS: SUCCESS,
                       'pm': thisPM.toDict(),
                       'properties': sendPropList,
                   }
        return returnError(MULTIPLE_ACCOUNTS)
    return returnError(INCORRECT_FIELDS)


def getTenant(tenantEmail, tenantPassword):
    tenantList = Tenant.objects.filter(email=tenantEmail, password=tenantPassword)
    if tenantList.exists():
        if tenantList.count() == 1:
            tenant = tenantList[0]
            return {
                        STATUS: SUCCESS,
                        'tenant': tenant.toDict(),
                        'properties': [tenant.place.toDict()]
                    }
        return {STATUS: FAIL, ERROR: MULTIPLE_ACCOUNTS}
    return {STATUS: FAIL, ERROR: INCORRECT_FIELDS}


def getProperty(email, streetAddress, city, state):
    pmList = PropertyManager.objects.filter(email=email)
    if pmList.exists() and pmList.count() == 1:
        pm = pmList[0]
        propList = Property.objects.filter(streetAddress=streetAddress, city=city, state=state, pm=pm)
        if propList.exists():
            if propList.count() == 1:
                prop = propList[0]
                return {
                           STATUS: SUCCESS,
                           'prop': prop.toDict(),
                       }
            else:
                return {STATUS: FAIL, ERROR: PROPERTY_SQUISH}
        else:
            return {STATUS: FAIL, ERROR: PROPERTY_DOESNT_EXIST}
    return {STATUS: FAIL, ERROR: PM_SQUISH}

################################################################################
# Adding Functions
#


def addNewProperties(email, token):
    # This is for requesting properties from them
    url = BASE_URL + "service-locations/"
    tokenSend = "Token " + token
    properties = requests.get(url, headers={"Authorization": tokenSend})

    # Now check each of the properties against the database to see if
    # any of them are new
    # For now we will just assign them a default bed, bath and tenants
    # of 1 since front end is not set up to ask them yet
    temp = properties.json()
    if isinstance(temp, dict):
        if(temp.get('detail') == 'Invalid token.'):
            return returnError("Invalid token.")
    for prop in properties.json():
        addy = prop.get('physical_address_formatted').split(',')
        tempStreetAddress = addy[0].strip()
        tempCity = addy[1].strip()
        tempState = addy[2].strip().split(' ')[0].strip()
        others = Property.objects.filter(streetAddress=tempStreetAddress,
                                         city=tempCity,
                                         state=tempState)
        if not others.exists():
            # We know the pm account exists in our database and only ours
            # since we checked earlier and it didn't fail so we don't have
            # to check it
            tempPM = PropertyManager.objects.filter(email=email)[0]

            # That means the property is not already in the database
            prop = Property(streetAddress=tempStreetAddress,
                            city=tempCity,
                            state=tempState,
                            numBed=1,
                            numBath=1,
                            maxTenants=1,
                            pm=tempPM)
            prop.save()


################################################################################
# Login Helpers
#

def pmLogin(email, password):
    url = BASE_URL + 'auth/login/'

    data = {
               'username': email,
               'password': password
           }
    response = requests.post(url, json=data)

    info = json.loads(response.text)

    if NON_FIELD_ERRORS in info:
        return returnError(info.get(NON_FIELD_ERRORS))
    elif TOKEN in info:

        if(not PropertyManager.objects.filter(email=email).exists()):
            # THen they don't exist in our database
            firstName = info.get('first_name')
            lastName = info.get('last_name')
            email = info.get('email')
            tempPM = PropertyManager(firstName=firstName,
                                     lastName=lastName,
                                     email=email)
            tempPM.save()

        tempDict = getPropertyManager(email)

        if tempDict[STATUS] == FAIL:
            return returnError('%s: %s' % (HOMEPAIRS_ACCOUNT_CREATION_FAILED, tempDict[ERROR]))

        addNewProperties(email, info.get(TOKEN))

        tempDict = getPropertyManager(email)
        tempDict[TOKEN] = info.get(TOKEN)
        return tempDict


def tenantLogin(email, password):
    return getTenant(email, password)

################################################################################
# Views / API Endpoints
#


@api_view(['GET', 'POST'])
def login(request):
    required = ['email', 'password']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        email = request.data.get('email')
        password = request.data.get('password')

        tenantTest = tenantLogin(email, password)
        if tenantTest.get(STATUS) == SUCCESS:
            tenantTest['role'] = 'tenant'
            return Response(data=tenantTest)

        pmTest = pmLogin(email, password)
        if pmTest.get(STATUS) == SUCCESS:
            pmTest['role'] = 'pm'

        return Response(data=pmTest)
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def tenantRegister(request):
    required = ['firstName', 'lastName', 'email', 'password', 'streetAddress', 'city']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        firstName = request.data.get('firstName')
        lastName = request.data.get('lastName')
        email = request.data.get('email')
        streetAddress = request.data.get('streetAddress')
        city = request.data.get('city')
        password = request.data.get('password')
        propertyList = Property.objects.filter(streetAddress=streetAddress, city=city)

        if propertyList.exists():
            if propertyList.count() < 2:
                tenantsProp = propertyList[0]
                tenantsPM = tenantsProp.pm
                ten = Tenant(firstName=firstName,
                             lastName=lastName,
                             email=email,
                             password=password,
                             place=tenantsProp,
                             pm=tenantsPM)
                ten.save()
                return Response(data=tenantLogin(email, password))
            else:
                return Response(data=returnError(TOO_MANY_PROPERTIES))
        else:
            return Response(data=returnError(INVALID_PROPERTY))
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def pmRegister(request):
    url = BASE_URL + 'auth/register/'

    required = ['firstName', 'lastName', 'email', 'password']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        firstName = request.data.get('firstName')
        lastName = request.data.get('lastName')
        email = request.data.get('email')
        password = request.data.get('password')
        pmCompanyName = '%s %s Property Rental' % (firstName, lastName)
        data = {
                  'first_name': firstName,
                  'last_name': lastName,
                  'email': email,
                  'password': password,
                  'internal_client': {
                                        'name': pmCompanyName,
                                        'industry_type': RESIDENTIAL_CODE
                                     }
               }
        response = requests.post(url, json=data)
        info = json.loads(response.text)

        if NON_FIELD_ERRORS in info:
            return Response(returnError(ROOPAIR_ACCOUNT_CREATION_FAILED))
        elif TOKEN in info:
            tempPM = PropertyManager(
                                       firstName=firstName,
                                       lastName=lastName,
                                       email=email)
            tempPM.save()
            tempDict = getPropertyManager(email)
            if tempDict[STATUS] == FAIL:
                return Response(data=returnError(HOMEPAIRS_ACCOUNT_CREATION_FAILED))
            tempDict[TOKEN] = info.get(TOKEN)
            return Response(data=tempDict)
        else:
            return Response(data=info)
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def createProperty(request):
    url = BASE_URL + 'service-locations/'

    required = ['streetAddress', 'city', 'state', 'pm', 'numBed', 'numBath', 'maxTenants', 'token']

    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        streetAddress = request.data.get('streetAddress')
        city = request.data.get('city')
        state = request.data.get('state')
        pm = request.data.get('pm')
        numBed = request.data.get('numBed')
        numBath = request.data.get('numBath')
        maxTenants = request.data.get('maxTenants')
        token = request.data.get('token')
        sendAddress = streetAddress + ", " + city + ", " + state

        data = {
                   'physical_address': sendAddress
               }
        sendToken = "Token " + token
        response = requests.post(url, json=data, headers={"Authorization": sendToken})
        info = json.loads(response.text)

        if NON_FIELD_ERRORS in info:
            return Response(returnError(info.get(NON_FIELD_ERRORS)))
        elif(info.get('detail') == 'Invalid token.'):
            return Response(returnError(info.get('detail')))
        else:
            addy = info.get('physical_address_formatted').split(',')
            tempStreetAddress = addy[0].strip()
            tempCity = addy[1].strip()
            tempState = addy[2].strip().split(' ')[0].strip()
            isMade = Property.objects.filter(streetAddress=streetAddress, city=city, state=state)
            if not isMade.exists():
                pmList = PropertyManager.objects.filter(email=pm)
                if pmList.exists() and pmList.count() == 1:
                    pm = pmList[0]
                    prop = Property(streetAddress=tempStreetAddress,
                                    city=tempCity,
                                    state=tempState,
                                    numBed=numBed,
                                    numBath=numBath,
                                    maxTenants=maxTenants,
                                    pm=pm)
                    prop.save()
                    data = {
                            STATUS: SUCCESS
                           }
                    return Response(data=data)
                else:
                    return Response(data=returnError(INCORRECT_FIELDS))
            else:
                return Response(data=returnError(PROPERTY_ALREADY_EXISTS))
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def updateProperty(request):
    required = ['streetAddress', 'city', 'state', 'pm', 'numBed', 'numBath']
    required.append('maxTenants')
    required.append('oldStreetAddress')
    required.append('oldCity')
    required.append('token')
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        oldStreetAddress = request.data.get('oldStreetAddress')
        oldCity = request.data.get('oldCity')
        streetAddress = request.data.get('streetAddress')
        city = request.data.get('city')
        state = request.data.get('state')
        pm = request.data.get('pm')
        numBed = request.data.get('numBed')
        numBath = request.data.get('numBath')
        maxTenants = request.data.get('maxTenants')

        # The Property
        thePropertyList = Property.objects.filter(streetAddress=oldStreetAddress, city=oldCity)

        if thePropertyList.exists():
            if thePropertyList.count() == 1:
                theProperty = thePropertyList[0]
                if theProperty.pm.email == pm:
                    theProperty.city = city
                    theProperty.state = state
                    theProperty.numBed = numBed
                    theProperty.numBath = numBath
                    theProperty.maxTenants = maxTenants
                    theProperty.streetAddress = streetAddress
                    theProperty.save()
                    return Response(data={STATUS: SUCCESS})
                else:
                    return Response(data=returnError(NOT_PROP_OWNER))
            else:
                return Response(data=returnError(PROPERTY_SQUISH))
        else:
            return Response(data=returnError(PROPERTY_DOESNT_EXIST))
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def viewProperty(request):
    required = ['streetAddress', 'city', 'state', 'pm']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        streetAddress = request.data.get('streetAddress')
        city = request.data.get('city')
        state = request.data.get('state')
        email = request.data.get('pm')
        prop = getProperty(email, streetAddress, city, state)
        return Response(data=prop)
    else:
        return Response(data=missingError(missingFields))


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

################################################################################
# Setup/Tear Down Methods
#


@api_view(['GET', 'POST'])
def setUpTests(request):
    required = ['email', 'password']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        inEmail = request.data.get('email')
        inPass = request.data.get('password')
        if(inEmail == 'adamkberard@gmail.com' and inPass == 'pass4testing'):
            PropertyManager.objects.all().delete()
            Property.objects.all().delete()
            Tenant.objects.all().delete()
            tempPM = PropertyManager(firstName='Eeron',
                                     lastName='Grant',
                                     email='eerongrant@gmail.com')
            tempProperty1 = Property(streetAddress='537 Couper Dr.',
                                     city='San Luis Obispo',
                                     state='CA',
                                     numBath=2,
                                     numBed=5,
                                     maxTenants=8,
                                     pm=tempPM)
            tempProperty2 = Property(streetAddress='200 N. Santa Rosa',
                                     city='San Luis Obispo',
                                     state='CA',
                                     numBath=2,
                                     numBed=3,
                                     maxTenants=5,
                                     pm=tempPM)
            tempTenant = Tenant(firstName='Adam',
                                lastName='Berard',
                                email='adamkberard@gmail.com',
                                password='pass4adam',
                                place=tempProperty2,
                                pm=tempPM)
            tempPM.save()
            tempProperty1.save()
            tempProperty2.save()
            tempTenant.save()

        return Response()
    else:
        return Response(data=missingError(missingFields))


@api_view(['GET', 'POST'])
def tearDownTests(request):
    required = ['email', 'password']
    missingFields = checkRequired(required, request)

    if(len(missingFields) == 0):
        inEmail = request.data.get('email')
        inPass = request.data.get('password')
        if(inEmail == 'adamkberard@gmail.com' and inPass == 'pass4testing'):
            Appliance.objects.all().delete()
            PropertyManager.objects.all().delete()
            Property.objects.all().delete()
            Tenant.objects.all().delete()
        return Response()
    else:
        return Response(data=missingError(missingFields))
