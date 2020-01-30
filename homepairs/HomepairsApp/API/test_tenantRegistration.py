################################################################################
# Imports
from django.test import TestCase
from django.conf import settings
import psycopg2
import requests
import json
import random
from .views import INCORRECT_FIELDS, MULTIPLE_ACCOUNTS, STATUS
from .views import SUCCESS, FAIL, ERROR, ROOPAIR_ACCOUNT_CREATION_FAILED
from .views import HOMEPAIRS_ACCOUNT_CREATION_FAILED, TOO_MANY_PROPERTIES
from .views import INVALID_PROPERTY, NON_FIELD_ERRORS, TOKEN, RESIDENTIAL_CODE

################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
TEN_REG_URL = 'register/tenant/'

################################################################################
# Helper Functions

def setUpHelper():
   email = 'adamkberard@gmail.com'
   password = 'pass4testing'
   data = {'email': email, 'password': password}
   url = globUrl + 'setUpTests/'
   requests.post(url, json=data)

def tearDownHelper():
   email = 'adamkberard@gmail.com'
   password = 'pass4testing'
   data = {'email': email, 'password': password}
   url = globUrl + 'tearDownTests/'
   requests.post(url, json=data)

################################################################################
# Tests

#  Tenant Login Tests
class TenantRegistration(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_tenant_allCorrect(self):
      tenEmail = 'fakeEmail@gmail.com'
      data = {
                'firstName': 'Fake',
                'lastName': 'Name',
                'email': tenEmail,
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
                'password': 'pass4fake',
                }
      url = globUrl + TEN_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      ten = info.get('tenant')
      self.assertEqual(ten.get('firstName'), 'Fake')
      self.assertEqual(ten.get('lastName'), 'Name')
      self.assertEqual(ten.get('email'), tenEmail)
      prop = ten.get('place')
      self.assertEqual(prop.get('streetAddress'), '537 Couper Dr.')
      self.assertEqual(prop.get('numBath'), 2)

   # Not all fields supplied
   def test_tenant_noLastName(self):
      tenEmail = 'fakeEmail@gmail.com'
      data = {
                'firstName': 'Fake',
                'email': tenEmail,
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
                'password': 'pass4fake',
             }
      url = globUrl + TEN_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_tenant_noFirstName(self):
      tenEmail = 'fakeEmail@gmail.com'
      data = {
                'lastName': 'Name',
                'email': tenEmail,
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
                'password': 'pass4fake',
             }
      url = globUrl + TEN_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_tenant_Email(self):
      tenEmail = 'fakeEmail@gmail.com'
      data = {
                'firstName': 'Fake',
                'lastName': 'Name',
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
                'password': 'pass4fake',
             }
      url = globUrl + TEN_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_tenant_noPassword(self):
      tenEmail = 'fakeEmail@gmail.com'
      data = {
                'lastName': 'Name',
                'email': tenEmail,
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
             }
      url = globUrl + TEN_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)
