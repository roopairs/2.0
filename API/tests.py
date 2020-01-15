
# Create your tests here.
################################################################################
# File Name : loginAndRegistrationTests.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Tue Jan 14 13:16:27 2020
# Description:

################################################################################
# Imports
from django.test import TestCase
import psycopg2
import requests
import json
import unittest
from .models import PropertyManager, Property, Tenant

################################################################################
# Vars

url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI/"
url = "https://homepairs-alpha.herokuapp.com/API/login/"
url = "http://localhost:8000/API/login/"

################################################################################
# Vertical Prototype Functions
#

################################################################################
# Setup
#

def clearData():
   PropertyManager.objects.all().delete()
   Property.objects.all().delete()
   Tenant.objects.all().delete()

def setup():
   clearData()
   pm = PropertyManager(firstName="Tommy",
                        lastName="Bergmann", 
                        email="tbbergma@calpoly.edu",
                        phone="5558393823")
   pm.save()
   prop = Property(streetAddress="200 N. Santa Rosa",
                   city="San Luis Obispo",
                   state="CA",
                   SLID=69,
                   numBath=2,
                   numBed=3,
                   maxTenants=5,
                   manager=pm)
   prop.save()
   tenant = Tenant(firstName="Adam",
                   lastName="Berard",
                   email="adamkberard@gmail.com",
                   phone="9092614646",
                   password="pass4adam",
                   propId=prop,
                   pmId=pm)
   tenant.save()

################################################################################
class TestStringMethods(unittest.TestCase):

   # Tenant Login Tests
   def test_tenant_allCorrect(self):
      setup()
      data = {"type": "login", "email": "ad@m.com", "password": "adamiscool"}
      x = requests.post(url, json=data)
      print(x.text)
      #info = json.loads(x.text)
      #self.assertEqual(info.get("status"), "success")
      #self.assertEqual(info.get("tenantInfo").get("firstName"), "Adam")
      #self.assertEqual(info.get("tenantInfo").get("lastName"), "Lastname")
      #self.assertEqual(info.get("propertyInfo").get("address"), "200 North Santa Rosa Street")
      #self.assertEqual(info.get("propertyInfo").get("numBath"), 1)
      #self.assertEqual(info.get("propertyInfo").get("numBed"), 3)
      #self.assertEqual(info.get("propertyInfo").get("maxTenants"), 3)

   #def test_tenant_incorrectEmail(self):
   #   data = {"type": "login", "email": "adam@m.com", "password": "adamiscool"}
   #   x = requests.post(url, json=data)
   #   info = json.loads(x.text)
   #   self.assertEqual(info.get("status"), "incorrect credentials")

   #def test_tenant_incorrectPass(self):
   #   data = {"type": "login", "email": "ad@m.com", "password": "adamisNOTcool"}
   #   x = requests.post(url, json=data)
   #   info = json.loads(x.text)
   #   self.assertEqual(info.get("status"), "incorrect credentials")

   #def test_tenant_incorrectPassAndEmail(self):
   #   data = {"type": "login", "email": "adam@m.com", "password": "adamisNOTcool"}
   #   x = requests.post(url, json=data)
   #   info = json.loads(x.text)
   #   self.assertEqual(info.get("status"), "incorrect credentials")

   ## Property Manager Tests
   #def test_pm_allCorrect(self):
   #   data = {"type": "login", "email": "tommy@gmail.com", "password": "pass4tommy"}
   #   x = requests.post(url, json=data)
   #   #info = json.loads(x.text)
   #   #self.assertEqual(info.get("status"), "success")
   #   #self.assertTrue("token" in info)
   #   print(x.text)

if __name__ == '__main__':
   setup()
   #unittest.main()
