################################################################################
# File Name : test.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Wed Dec  4 22:19:57 2019
# Description:

################################################################################
# Imports
import psycopg2
import requests
import json
import unittest

################################################################################
# Vars

url = "http://localhost:8000/verticalAPI/"
url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI/"
dbUrl = ("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d"
         "50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:54"
         "32/d1es3so922rir0")

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

################################################################################
class TestStringMethods(unittest.TestCase):

   def test_NoRoopairsAccount(self):
      insertDummyInfo()
      data = {"username": "adam@gmail.com", "password": "pass4adam"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      deleteTables()
      assert info.get("status") == "success"
      assert info.get("pmInfo").get("LastName") == "Berard"
      assert info.get("pmInfo").get("FirstName") == "Adam"
      assert info.get("pmInfo").get("email") == "adam@gmail.com"
      assert info.get("pmInfo").get("phone") == "9092614617"
      assert info.get("pmInfo").get("password") == "pass4adam"
      assert info.get("properties") == []
      assert info.get("roopairs") == "failure"
   
   def test_NoAccount(self):
      insertDummyInfo()
      data = {"username": "dam@gmail.com", "password": "pass4adam"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      deleteTables()
      assert info.get("status") == "failure"
      assert info.get("pmInfo") == None
      assert info.get("properties") == None
      assert info.get("roopairs") == "failure"
   
   def test_BothAccounts(self):
      insertDummyInfo()
      data = {"username": "tommy@gmail.com", "password": "pass4tommy"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      deleteTables()
      assert info.get("status") == "success"
      assert info.get("pmInfo").get("LastName") == "Bergmann"
      assert info.get("pmInfo").get("FirstName") == "Thomas"
      assert info.get("pmInfo").get("email") == "tommy@gmail.com"
      assert info.get("pmInfo").get("phone") == "8575552323"
      assert info.get("pmInfo").get("password") == "pass4tommy"
      assert len(info.get("properties")) == 2
      assert info.get("properties")[0].get("address") == "200 North Santa Rosa Street"
      assert info.get("properties")[0].get("SLID") == 1
      assert info.get("properties")[0].get("numBath") == 3
      assert info.get("properties")[0].get("numBed") == 3
      assert info.get("properties")[0].get("maxTenants") == 6
      assert info.get("properties")[1].get("address") == "110 Orange Drive"
      assert info.get("properties")[1].get("SLID") == 2
      assert info.get("properties")[1].get("numBath") == 2
      assert info.get("properties")[1].get("numBed") == 2
      assert info.get("properties")[1].get("maxTenants") == 3
      assert info.get("roopairs") != "failure"

if __name__ == '__main__':
    unittest.main()

