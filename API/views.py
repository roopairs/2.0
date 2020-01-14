from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import PropertyManager
import requests
import json

################################################################################
# Functions
#
def getTenant(email, password):
   print(PropertyManager.objects.all())
#def username_present(uemail, upassword):
#    land = landlord.objects.filter(email=uemail)
#    tenant = tenant.objects.filter(email=uemail, password=upassword)
#    if land.exists():
#        #return landlord login
#    elif tenant.exists():
#        #return tenant login
#        tenant[0].id
#    #return login failed

################################################################################
# Views / API Endpoints
#

@api_view(['GET', 'POST'])
def login(request):

   email = request.data.get('email')
   password = request.data.get('password')

   if(request.data.get("type") == "login"):
      returnable = getTenant(email, password)
      if(returnable.get("status") == "success"):
         return Response(data=returnable)

   # If it gets here, they do not have a tenant account with us
   # so we will check with Roopairs to see if they have a
   # property manager account for them.

   url = "https://capstone.api.roopairs.com/v0/auth/login/"
   data = {
             "username": email,
             "password": password
          }

   response = requests.post(url, json=data)
   info = json.loads(response.text)
   
   if "non_field_errors" in info:
      return Response(data={"status": "incorrect credentials"})
   else:
      landlordInfo = getLandlord(email)
      print("LANDLORD INFO")
      print(landlordInfo)
      returnable = {
                      "status": "success",
                      "token": info.get("token")
                   }
      return Response(data=returnable)
