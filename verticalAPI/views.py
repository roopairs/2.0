from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
import psycopg2
import requests



################################################################################
# GLOBAL VARS
#

dbUrl = ("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d"
         "50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:54"
         "32/d1es3so922rir0")

################################################################################
# Views / API Endpoints
#

@api_view(['GET', 'POST'])
def testVert(request):
   user = request.data.get('username')
   password = request.data.get('password')

   deleteTables()
   insertDummyInfo()

   returnable = loginAndGet(user, password)


   url = "https://capstone.api.roopairs.com/v0/auth/login/"
   data = {
             "username": user,
             "password": password
          }

   response = requests.post(url, json=data)
   if(response.text.startswith('{"token":')):
      returnable["roopairs"] = response.text[10:-2].replace("\\", "")
   else:
      returnable["roopairs"] = "failure"

   return Response(data=returnable)

################################################################################
# General Functions
#

def packagePMInfo(info):
   dict = {"manId": info[0],
           "LastName": info[1],
           "FirstName": info[2],
           "email": info[3],
           "phone": info[4],
           "password": info[5],
           "tenantId": info[6],
           "propId": info[7]
          }
   return dict

def packagePropertyInfo(info):
   dict = {"propId": info[0],
           "address": info[1],
           "SLID": info[2],
           "numBath": info[3],
           "numBed": info[4],
           "maxTenants": info[5],
           "applianceId": info[6],
           "tenantId": info[7],
           "manId": info[8]
          }
   return dict

def loginAndGet(email, password):
   # Make connection to the database
   conn = psycopg2.connect(dbUrl, sslmode='require')

   # Cursors let you perform database operations
   cur = conn.cursor()

   # Find account if it exists
   select_sql = ("SELECT * FROM prop_manager "
                 "WHERE email = '%s' and password = '%s';") % (email, password)
   cur.execute(select_sql)
   pmInfo = cur.fetchone()

   # Check if it exists
   if(pmInfo == None):
      return {
              "status": "failure",
              "pmInfo": None,
              "properties" : None
             }
   else:
      manId = pmInfo[0]

   # Now get all the properties they own
   select_sql = "SELECT * FROM property WHERE manId = " + str(manId) + ";"
   cur.execute(select_sql)
   properties = []

   # Get each property data
   output = cur.fetchone()
   while (not(output is None)):
       properties.append(packagePropertyInfo(output))
       output = cur.fetchone()

   # Close communication with the database
   cur.close()
   conn.close()

   returnable = {
                 "status": "success",
                 "pmInfo": packagePMInfo(pmInfo),
                 "properties": properties
                }
   return returnable

################################################################################
# Vertical Prototype Functions
#

def insertDummyInfo():
   # Vars
   pmTargets = "(LastName, FirstName, email, phone, password)"
   propertyTargets = "(address, SLID, numBath, numBed, maxTenats, manId)"

   # Make connection to the database
   conn = psycopg2.connect(dbUrl, sslmode='require')

   # Cursors let you perform database operations
   cur = conn.cursor()

   # Inserts a dummy Adam account into the database
   values = "('Berard', 'Adam', 'adam@gmail.com', '9092614617', 'pass4adam')"
   cur.execute("INSERT INTO prop_manager %s VALUES %s;" % (pmTargets, values))

   # Inserts a dummy Tommy account into the database
   values = "('Bergmann', 'Thomas', 'tommy@gmail.com', '8575552323', 'pass4tommy')"
   cur.execute("INSERT INTO prop_manager %s VALUES %s;" % (pmTargets, values))

   # Get the auto-created manager id for Tommy
   select_sql = ("SELECT managerId FROM prop_manager "
                "WHERE email = 'tommy@gmail.com' and password = 'pass4tommy';")
   cur.execute(select_sql)
   manId = cur.fetchone()
   manId = manId[0]

   # Insert a property owned by Tommy
   values = "('200 North Santa Rosa Street', 1, 3, 3, 6," + str(manId) + ")"
   insert_sql = "INSERT INTO property %s VALUES %s;" % (propertyTargets, values)
   cur.execute(insert_sql)

   # Insert a property owned by Tommy
   values = "('110 Orange Drive', 2, 2, 1.5, 3, " + str(manId) + ")"
   insert_sql = "INSERT INTO property %s VALUES %s;" % (propertyTargets, values)
   cur.execute(insert_sql)

   # Make the changes to the database persistent
   conn.commit()

   # Close communication with the database
   cur.close()
   conn.close()
   
def deleteTables():
   # Make connection to the database
   conn = psycopg2.connect(dbUrl, sslmode='require')

   # Cursors let you perform database operations
   cur = conn.cursor()

   # Delete everything
   cur.execute("DELETE FROM prop_manager where true")
   cur.execute("DELETE FROM property where true")

   # Make the changes to the database persistent
   conn.commit()

   # Close communication with the database
   cur.close()
   conn.close()

