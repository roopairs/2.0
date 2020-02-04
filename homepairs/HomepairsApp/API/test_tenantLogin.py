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
from .views import INCORRECT_CREDENTIALS

################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
LOGIN_URL = 'login/'

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

# Tenant Login Tests
class TenantLogin(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_tenant_allCorrect(self):
      email = 'adamkberard@gmail.com'
      password = 'pass4adam'
      data = {'email': email, 'password': password}
      url = globUrl + LOGIN_URL

      x = requests.post(url, json=data)
      info = json.loads(x.text)

      self.assertEqual(info.get(STATUS), SUCCESS)
      tenant = info.get('tenant')
      self.assertEqual(tenant.get('firstName'), 'Adam')
      self.assertEqual(tenant.get('lastName'), 'Berard')
      self.assertEqual(tenant.get('email'), 'adamkberard@gmail.com')
      self.assertEqual(tenant.get('password'), 'pass4adam')
      place = tenant.get('place')
      self.assertEqual(place.get('streetAddress'), '200 N. Santa Rosa')
      self.assertEqual(place.get('city'), 'San Luis Obispo')
      self.assertEqual(place.get('state'), 'CA')
      self.assertEqual(place.get('numBath'), 2)
      self.assertEqual(place.get('numBed'), 3)
      self.assertEqual(place.get('maxTenants'), 5)
      self.assertEqual(place.get('pm'), 'Eeron Grant')
      pm = tenant.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')


   # Incorrect Email
   def test_tenant_incorrectEmail(self):
      data = {'email': 'damkberard@gmail.com', 'password': 'pass4adam'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # Incorrect Pass
   def test_tenant_incorrectPass(self):
      data = {'email': 'adamkberard@gmail.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # Incorrect Pass & Email
   def test_tenant_incorrectPassAndEmail(self):
      data = {'email': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # No Email Field
   def test_tenant_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Pass Field
   def test_tenant_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Correct Fields
   def test_tenant_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)
