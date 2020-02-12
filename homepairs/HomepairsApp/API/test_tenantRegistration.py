################################################################################
# Imports
import json
import random

import psycopg2
import requests
from django.conf import settings
from django.test import TestCase

from .views import (
    ERROR, FAIL, HOMEPAIRS_ACCOUNT_CREATION_FAILED, INCORRECT_FIELDS, INVALID_PROPERTY, MULTIPLE_ACCOUNTS,
    NON_FIELD_ERRORS, RESIDENTIAL_CODE, ROOPAIR_ACCOUNT_CREATION_FAILED, STATUS, SUCCESS, TOKEN, TOO_MANY_PROPERTIES
)


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
        print("THIS IS IT")
        print(x.text)
        info = json.loads(x.text)
        self.assertEqual(info.get(STATUS), SUCCESS)
        ten = info.get('tenant')
        self.assertEqual(ten.get('firstName'), 'Fake')
        self.assertEqual(ten.get('lastName'), 'Name')
        self.assertEqual(ten.get('email'), tenEmail)
        tenProp = info.get('properties')[0]
        self.assertEqual(tenProp.get('streetAddress'), '537 Couper Dr.')
        self.assertEqual(tenProp.get('numBath'), 2)
  
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": lastName")
  
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": firstName")
  
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": email")
  
    def test_tenant_noPassword(self):
        tenEmail = 'fakeEmail@gmail.com'
        data = {
                  'firstName': 'Fake',
                  'lastName': 'Name',
                  'email': tenEmail,
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
               }
        url = globUrl + TEN_REG_URL
        x = requests.post(url, json=data)
        info = json.loads(x.text)
        self.assertEqual(info.get(STATUS), FAIL)
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": password")
