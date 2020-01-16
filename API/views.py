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
         print("PROPERITES")
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
   return returnError('incorrect credentials')

def getTenant(tenantEmail, tenantPassword):
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
   return {"status": "failure", "error": "incorrect credentials"}
################################################################################
# Views / API Endpoints
#

@api_view(['GET', 'POST'])
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
         return Response(data=returnError('incorrect credentials'))
      elif 'token' in info:
         pm = getPropertyManager(pmEmail)
         tempDict = getPropertyManager(pmEmail)
         if tempDict['status'] == 'failure':
            return Response(data=returnError('no homepairs account: %s' % tempDict['error']))
         tempDict['token'] = info.get('token')
         return Response(data=tempDict)
   else:
      return Response(data=returnError('incorrect fields'))

def tenantRegister(request):
   print('')

def pmRegister(request):
   print('')

@api_view(['GET', 'POST'])
def tenantLogin(request):
   if "email" in request.data and "password" in request.data:
      tenantEmail = request.data.get("email")
      tenantPass = request.data.get("password")
      return Response(data=getTenant(tenantEmail, tenantPass))
   else:
      return Response(data=returnError('incorrect fields'))
