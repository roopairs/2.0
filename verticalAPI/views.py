from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
import psycopg2
import requests

# Create your views here.

@api_view(['GET', 'POST'])
def testVert(request):
   user = request.data.get('username')
   password = request.data.get('password')

   deleteTables()

   returnable = loginAndGet(user, password)

   if(not returnable):
      return Response(data="ERROR: There is no account with the username and password specified.")

   url = "https://capstone.api.roopairs.com/v0/auth/login/"
   data = {
             "username": user,
             "password": password
          }

   response = requests.post(url, json=data)
   if(response.text.startswith('{"token":')):
      print("API Auth succeeded")
   else:
      print("NO!!!! API SAYS NO!!!!")
      return Response(data="ERROR: Roopairs does not have an account linked to this.")

   print(response.text)
   temp = {"token": response.text[10:-2].replace("\\", "")}
   returnable.append(temp)

   return Response(data=returnable)





























def deleteTables():
    # Connect to an existing database
    conn = psycopg2.connect("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:5432/d1es3so922rir0", sslmode='require')
    # Open a cursor to perform database operations
    cur = conn.cursor()

    cur.execute("DELETE FROM prop_manager where true")
    cur.execute("DELETE FROM property where true")

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()

def loginAndGet(email, password):
    # Connect to an existing database
    conn = psycopg2.connect("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:5432/d1es3so922rir0", sslmode='require')

    # Open a cursor to perform database operations
    cur = conn.cursor()

    cur.execute("INSERT INTO prop_manager (LastName, FirstName, email, phone, password) VALUES ('Bergmann', 'Thomas', 'tommy@gmail.com', '8575552323', 'pass4tommy');")

    select_sql = "SELECT managerId FROM prop_manager where email = \'" + email + "\' and password = \'" + password + "\';"
    cur.execute(select_sql)

    manId = cur.fetchone()

    print(manId)
    if(manId == None):
       return False
    else:
       manId = manId[0]


    insert_sql = "INSERT INTO property (address, SLID, numBath, numBed, maxTenats, manId) VALUES ('200 North Santa Rosa Street', 1, 3, 3, 6," + str(manId) + ");"
    cur.execute(insert_sql)

    insert_sql = "INSERT INTO property (address, SLID, numBath, numBed, maxTenats, manId) VALUES ('110 Orange Drive', 2, 2, 1.5, 3, " + str(manId) + ");"
    cur.execute(insert_sql)

    select_sql = "SELECT * FROM prop_manager where email = \'" + email + "\' and password = \'" + password + "\';"
    cur.execute(select_sql)
    pmInfo = cur.fetchone()

    select_sql = "SELECT * FROM property WHERE manId = " + str(manId) + ";"
    cur.execute(select_sql)
    addresses = []

    output = cur.fetchone()
    while (not(output is None)):
        addresses.append(output)
        output = cur.fetchone()

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()

    return [pmInfo, addresses]
