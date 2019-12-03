from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
import psycopg2

# Create your views here.

@api_view(['GET', 'POST'])
def testVert(request):
   print(request.data)

   # Touching the data base
   first_name = "Thomas"
   last_name = "Bergmann"
   getDBInfo(first_name, last_name)
   
   response = {
                 "response": "hello world",
                 "foo": "bar"
              }
   return Response(data=response)












































def getDBInfo(first_name, last_name):
    # Connect to an existing database
    conn = psycopg2.connect("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:5432/d1es3so922rir0", sslmode='require')

    # Open a cursor to perform database operations
    cur = conn.cursor()

    cur.execute("DELETE FROM prop_manager where true")
    cur.execute("DELETE FROM property where true")
    cur.execute("INSERT INTO prop_manager (LastName, FirstName, email, phone, password) VALUES ('Bergmann', 'Thomas', 'tommy@gmail.com', '8575552323', 'password');")

    select_sql = "SELECT managerId FROM prop_manager where LastName = \'" + last_name + "\' and FirstName = \'" + first_name + "\';"
    cur.execute(select_sql)
    manId = cur.fetchone()[0]

    insert_sql = "INSERT INTO property (address, SLID, numBath, numBed, maxTenats, manId) VALUES ('200 North Santa Rosa Street', 1, 3, 3, 6," + str(manId) + ");"
    cur.execute(insert_sql)

    insert_sql = "INSERT INTO property (address, SLID, numBath, numBed, maxTenats, manId) VALUES ('110 Orange Drive', 2, 2, 1.5, 3, " + str(manId) + ");"
    cur.execute(insert_sql)



    select_sql = "SELECT * FROM prop_manager where LastName = \'" + last_name + "\' and FirstName = \'" + first_name + "\';"
    cur.execute(select_sql)
    print("Property Manager")
    output = cur.fetchone()
    print(output)

    print("Properties")
    select_sql = "SELECT * FROM property WHERE manId = " + str(manId) + ";"
    cur.execute(select_sql)
    output = cur.fetchone()
    while (not(output is None)):
        print(output)
        output = cur.fetchone()

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()
