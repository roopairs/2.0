from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import PropertyManager, Tenant, Property
import requests
import json

################################################################################
# Functions
#
def returnError(error):
   return {'status': 'failure', 'error': error}

def getPropertyManager(pmEmail):
   pmList = PropertyManager.objects.filter(email=pmEmail)
   if pmList.exists():
      if pmList.count() < 2:
         thisPM = pmList[0]
         propertyList = Property.objects.filter(pm=thisPM)
         sendPropList = []
         for prop in propertyList:
            tempProp = prop.toDictNoRecurs()
            sendPropList.append(tempProp)
         return {
                   "status": "success",
                   "pm": thisPM.toDict(),
                   "properties": sendPropList,
                }
      return returnError('multiple accounts')
   return returnError('incorrect3fields')

def getTenant(tenantEmail, tenantPassword):
   print("EMAIL")
   print(tenantEmail)
   print("PASS")
   print(tenantPassword)
   for ob in Tenant.objects.all():
      print(ob)
   tenantList = Tenant.objects.filter(email=tenantEmail, password=tenantPassword)
   if tenantList.exists():
      if tenantList.count() < 2:
         tenant = tenantList[0]
         tenantProperty = tenant.place
         return {
                   "status": "success",
                   "tenant": tenant.toDict(),
                }
      return {"status": "failure", "error": "multiple accounts"}
   return {"status": "failure", "error": "incorrect5fields"}

def pmLogin(request):
   url = "https://capstone.api.roopairs.com/v0/auth/login/"

   if "email" in request.data and "password" in request.data:
      pmEmail = request.data.get("email")
      pmPass = request.data.get("password")
      data = {
                "username": pmEmail,
                "password": pmPass
             }
      response = requests.post(url, json=data)
      info = json.loads(response.text)

      if "non_field_errors" in info:
         return returnError('incorrect7fields')
      elif 'token' in info:
         pm = getPropertyManager(pmEmail)
         tempDict = getPropertyManager(pmEmail)
         if tempDict['status'] == 'failure':
            return returnError('no homepairs account: %s' % tempDict['error'])
         tempDict['token'] = info.get('token')
         return tempDict
   else:
      return returnError('incorrect9fields')

def tenantLogin(request):
   if "email" in request.data and "password" in request.data:
      tenantEmail = request.data.get("email")
      tenantPass = request.data.get("password")
      return getTenant(tenantEmail, tenantPass)
   else:
      return returnError('incorrect8fields')

def tenantRegister(request):
   print('')

def pmRegister(request):
   print('')

################################################################################
# Views / API Endpoints
#

@api_view(['GET', 'POST'])
def login(request):
   tenantTest = tenantLogin(request)
   if tenantTest.get('status') == "success":
      tenantTest['role'] = 'tenant'
      return Response(data=tenantTest)

   pmTest = pmLogin(request)
   if pmTest.get('status') == 'success':
      pmTest['role'] = 'pm'
      return Response(data=pmTest)

   return Response(data=pmTest)

@api_view(['GET', 'POST'])
def tenantRegister(request):
   if ("firstName" in request.data and "lastName" in request.data and
       "email" in request.data and "phone" in request.data and
       "password" in request.data and "streetAddress" in request.data and
       "city" in request.data):
      tenFirstName = request.data.get("firstName")
      tenLastName = request.data.get("lastName")
      tenEmail = request.data.get("email")
      tenPhone = request.data.get("phone")
      tenStreet = request.data.get("streetAddress")
      tenCity = request.data.get("city")
      tenPass = request.data.get("password")
      tenPropList = Property.objects.filter(streetAddress=tenStreet, city=tenCity)
      print("tenStreet")
      print(tenStreet)
      print('tenity')
      print(tenCity)
      if tenPropList.exists():
         if tenPropList.count() < 2:
            tenProp = tenPropList[0]
            tenPM = tenProp.pm
            ten = Tenant(firstName=tenFirstName,
                         lastName=tenLastName,
                         email=tenEmail,
                         phone=tenPhone,
                         password=tenPass,
                         place=tenProp,
                         pm = tenPM)
            ten.save()
            print("OBJECTS")
            for ob in Tenant.objects.all():
               print(ob)
            return Response(data=tenantLogin(request))
         else:
            return Response(data=returnError('too many props?'))
      else:
         return Response(data=returnError('property not valid'))
   else:
      return Response(data=returnError('incorrect11fields'))

@api_view(['GET', 'POST'])
def pmRegister(request):
   url = "https://capstone.api.roopairs.com/v0/auth/register/"
   print("GOT TO 1")

   if ("firstName" in request.data and "lastName" in request.data and
       "email" in request.data and "phone" in request.data and
       "password" in request.data and "companyName" in request.data):
      print("GOT TO 2")
      pmFirstName = request.data.get("firstName")
      pmLastName = request.data.get("lastName")
      pmEmail = request.data.get("email")
      pmPhone = request.data.get("phone")
      pmPass = request.data.get("password")
      pmCompanyName = request.data.get("companyName")

      data = {
                "first_name": pmFirstName,
                "last_name": pmLastName,
                "email": pmEmail,
                "password": pmPass,
                "internal_client": {
                                      "name": pmCompanyName,
                                      "industry_type": 1
                                   }
             }
      response = requests.post(url, json=data)
      print("GOT TO 3")
      print(response.text)
      info = json.loads(response.text)

      if "non_field_errors" in info:
         return Response(returnError("could'nt make a roopairs account"))
      elif 'token' in info:
         # NEEED TO ADD THEE DUDE
         print("GOT TO 4")
         tempPM = PropertyManager(
                                    firstName=pmFirstName,
                                    lastName=pmLastName,
                                    email=pmEmail,
                                    phone=pmPhone)
         tempPM.save()
         tempDict = getPropertyManager(pmEmail)
         print("GOT TO 5")
         print(tempDict)
         if tempDict['status'] == 'failure':
            return returnError('no homepairs account: %s' % tempDict['error'])
         tempDict['token'] = info.get('token')
         print("RESPONSE")
         print(tempDict)
         print("GOT TO 6")
         return Response(data=tempDict)
   else:
      print("WHACK")
      return Response(data=returnError('incorrect2fields'))
