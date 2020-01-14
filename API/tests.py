
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

################################################################################
# Vars

url = "http://localhost:8000/API/login/"
url = "https://homepairs-alpha.herokuapp.com/API/login/"
url = "https://vertical-proto-homepairs.herokuapp.com/verticalAPI/"

################################################################################
# Vertical Prototype Functions
#

################################################################################
class TestStringMethods(unittest.TestCase):

   # Tenant Login Tests
   def test_tenant_allCorrect(self):
      data = {"type": "login", "email": "ad@m.com", "password": "adamiscool"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get("status"), "success")
      self.assertEqual(info.get("tenantInfo").get("firstName"), "Adam")
      self.assertEqual(info.get("tenantInfo").get("lastName"), "Lastname")
      self.assertEqual(info.get("propertyInfo").get("address"), "200 North Santa Rosa Street")
      self.assertEqual(info.get("propertyInfo").get("numBath"), 1)
      self.assertEqual(info.get("propertyInfo").get("numBed"), 3)
      self.assertEqual(info.get("propertyInfo").get("maxTenants"), 3)

   def test_tenant_incorrectEmail(self):
      data = {"type": "login", "email": "adam@m.com", "password": "adamiscool"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get("status"), "incorrect credentials")

   def test_tenant_incorrectPass(self):
      data = {"type": "login", "email": "ad@m.com", "password": "adamisNOTcool"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get("status"), "incorrect credentials")

   def test_tenant_incorrectPassAndEmail(self):
      data = {"type": "login", "email": "adam@m.com", "password": "adamisNOTcool"}
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get("status"), "incorrect credentials")

   # Property Manager Tests
   def test_pm_allCorrect(self):
      data = {"type": "login", "email": "tommy@gmail.com", "password": "pass4tommy"}
      x = requests.post(url, json=data)
      #info = json.loads(x.text)
      #self.assertEqual(info.get("status"), "success")
      #self.assertTrue("token" in info)
      print(x.text)

if __name__ == '__main__':
    unittest.main()
