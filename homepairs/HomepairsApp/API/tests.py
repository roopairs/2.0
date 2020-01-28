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
import random
from .models import PropertyManager, Property, Tenant
from .views import INCORRECT_FIELDS, MULTIPLE_ACCOUNTS, STATUS
from .views import SUCCESS, FAIL, ERROR, ROOPAIR_ACCOUNT_CREATION_FAILED
from .views import HOMEPAIRS_ACCOUNT_CREATION_FAILED, TOO_MANY_PROPERTIES
from .views import INVALID_PROPERTY, NON_FIELD_ERRORS, TOKEN, RESIDENTIAL_CODE

################################################################################
# Vars

globUrl = 'http://localhost:8000/API/'
globUrl = 'https://homepairs-alpha.herokuapp.com/API/'

# EXTRA URLS
LOGIN_URL = 'login/'
PM_REG_URL = 'register/pm/'
TEN_REG_URL = 'register/tenant/'
CRE_PROP_URL = 'property/create/'
VIEW_PROP_URL = 'property/view/'

# MODEL FIELDS
# Tenant
#tenantFirstName = 'firstName'
#tenantLastName = 'lastName'
#tenantEmail = 'email'
#tenantPassword = 'password'
#tenantPlace = 'place'
#tenantPropertyManager = 'pm'

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
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Incorrect Pass
   def test_tenant_incorrectPass(self):
      data = {'email': 'adamkberard@gmail.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Incorrect Pass & Email
   def test_tenant_incorrectPassAndEmail(self):
      data = {'email': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

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

# Property Manager Login Tests
class PropertyManagerLogin(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_pm_allCorrect(self):
      data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      self.assertTrue('token' in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')

   # Email is wrong
   def test_pm_wrongEmail(self):
      data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Pass is wrong
   def test_pm_wrongPass(self):
      data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Pass is wrong and email is wrong
   def test_pm_wrongPassAndEmail(self):
      data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Email Field
   def test_pm_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Pass Field
   def test_pm_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Correct Fields
   def test_pm_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

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

# Property Manager Registration Tests
class PMRegistration(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_pm_allCorrect(self):
      randEmail = "fakeEmail{0}@gmail.com".format(str(random.randint(0, 10000000)))
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': randName,
                'lastName': 'Ugly Boi',
                'email': randEmail,
                'password': 'pass4fake',
                'companyName': randName + " Rentals",
             }
      url = globUrl + PM_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), randName)
      self.assertEqual(pm.get('lastName'), 'Ugly Boi')
      self.assertEqual(pm.get('email'), randEmail)

   # PM Missing fields
   def test_pm_missing_firstName(self):
      data = {
                'lastName': 'Ugly Boi',
                'email': 'fakeEmail@gmail.com',
                'password': 'pass4fake',
             }
      url = globUrl + PM_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_pm_missing_lastName(self):
      randEmail = "fakeEmail.@gmail.com"
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': 'Test',
                'email': 'fakeEmail@gmail.com',
                'password': 'pass4fake',
             }
      url = globUrl + PM_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_pm_missing_email(self):
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': randName,
                'lastName': 'Ugly Boi',
                'password': 'pass4fake',
             }
      url = globUrl + PM_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   def test_pm_missing_password(self):
      randEmail = "fakeEmail.@gmail.com"
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': randName,
                'lastName': 'Ugly Boi',
                'email': randEmail,
             }
      url = globUrl + PM_REG_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

# Property Manager Login Tests with Roopairs
class PMRegistrationRoopairs(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_pm_allCorrect(self):
      pmEmail = "testForRoopairsRegistration@gmail.com"
      pmPass = "pass4test"
      pmFirstName = 'Test'
      pmLastName = 'RooRegistration'

      data = {
                'email': pmEmail,
                'password': 'pass4test',
             }

      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)

      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), pmFirstName)
      self.assertEqual(pm.get('lastName'), pmLastName)
      self.assertEqual(pm.get('email'), pmEmail)
      PropertyManager.objects.filter(email=pmEmail).delete()


class PropertyCRUD(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct
   def test_create_property_allCorrect(self):
      #setup()
      streetAddress = '1 Grand Ave'
      city = 'SLO'
      state = 'CA'
      numBed = 3
      numBath = 1
      maxTenants = 3
      pmEmail = 'eerongrant@gmail.com'

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBath': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
             }
      url = globUrl + CRE_PROP_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'pm': pmEmail,
             }
      url = globUrl + VIEW_PROP_URL
      x = requests.post(url, json=data)

      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      prop = info.get('prop')
      self.assertEqual(prop.get('streetAddress'), streetAddress)
      self.assertEqual(prop.get('city'), city)
      self.assertEqual(prop.get('state'), state)
      self.assertEqual(prop.get('numBed'), numBed)
      self.assertEqual(prop.get('numBath'), numBath)
      self.assertEqual(prop.get('maxTenants'), maxTenants)
