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
from .views import INCORRECT_FIELDS

################################################################################
# Vars
#INCORRECT_FIELDS = 'Incorrect fields'
#INCORRECT_FIELDS = views.
MULTIPLE_ACCOUNTS = 'Multiple Accounts Detected'
STATUS = 'status'
SUCCESS = 'success'
FAIL = 'failure'
ERROR = 'error'
ROOPAIR_ACCOUNT_CREATION_FAILED = 'Failed to create a Roopairs account'
HOMEPAIRS_ACCOUNT_CREATION_FAILED = 'Failed to create a Homepairs account'
TOO_MANY_PROPERTIES = 'Too many properties associated with tenant'
INVALID_PROPERTY = 'Invalid property'
NON_FIELD_ERRORS = 'non_field_errors'
TOKEN = 'token'

globUrl = 'https://homepairs-alpha.herokuapp.com/API/'
globUrl = 'http://localhost:8000/API/'

# MODEL FIELDS
# Tenant
tenantFirstName = 'firstName'
tenantLastName = 'lastName'
tenantEmail = 'email'
tenantPhone = 'phone'
tenantPassword = 'password'
tenantPlace = 'place'
tenantPropertyManager = 'pm'

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
      #setup()
      email = 'adamkberard@gmail.com'
      password = 'pass4adam'
      data = {'email': email, 'password': password}
      url = globUrl + 'login/'

      x = requests.post(url, json=data)
      info = json.loads(x.text)

      self.assertEqual(info.get(STATUS), SUCCESS)
      tenant = info.get('tenant')
      self.assertEqual(tenant.get(tenantFirstName), 'Adam')
      self.assertEqual(tenant.get(tenantLastName), 'Berard')
      self.assertEqual(tenant.get('email'), 'adamkberard@gmail.com')
      self.assertEqual(tenant.get('phone'), '9092614646')
      self.assertEqual(tenant.get('password'), 'pass4adam')
      place = tenant.get('place')
      self.assertEqual(place.get('streetAddress'), '200 N. Santa Rosa')
      self.assertEqual(place.get('city'), 'San Luis Obispo')
      self.assertEqual(place.get('state'), 'CA')
      self.assertEqual(place.get('SLID'), 69)
      self.assertEqual(place.get('numBath'), 2)
      self.assertEqual(place.get('numBed'), 3)
      self.assertEqual(place.get('maxTenants'), 5)
      self.assertEqual(place.get('pm'), 'Eeron Grant')
      pm = tenant.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
      self.assertEqual(pm.get('phone'), '5558393823')


   # Incorrect Email
   def test_tenant_incorrectEmail(self):
      #setup()
      data = {'email': 'damkberard@gmail.com', 'password': 'pass4adam'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Incorrect Pass
   def test_tenant_incorrectPass(self):
      #setup()
      data = {'email': 'adamkberard@gmail.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Incorrect Pass & Email
   def test_tenant_incorrectPassAndEmail(self):
      data = {'email': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Email Field
   def test_tenant_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Pass Field
   def test_tenant_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Correct Fields
   def test_tenant_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/'
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
      #setup()
      data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      self.assertTrue('token' in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
      self.assertEqual(pm.get('phone'), '5558393823')

   # Email is wrong
   def test_pm_wrongEmail(self):
      #setup()
      data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Pass is wrong
   def test_pm_wrongPass(self):
      #setup()
      data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Pass is wrong and email is wrong
   def test_pm_wrongPassAndEmail(self):
      #setup()
      data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Email Field
   def test_pm_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Pass Field
   def test_pm_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Correct Fields
   def test_pm_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

# Property Manager Login Tests
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
      #setup()
      randEmail = "fakeEmail{0}@gmail.com".format(str(random.randint(0, 10000000)))
      data = {
                tenantFirstName: 'Fake',
                tenantLastName: 'Name',
                'email': randEmail,
                'phone': '9029833892',
                'streetAddress': '537 Couper Dr.',
                'city': 'San Luis Obispo',
                'password': 'pass4fake',
                }
      url = globUrl + 'register/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      ten = info.get('tenant')
      self.assertEqual(ten.get(tenantFirstName), 'Fake')
      self.assertEqual(ten.get(tenantLastName), 'Name')
      self.assertEqual(ten.get('email'), randEmail)
      self.assertEqual(ten.get('phone'), '9029833892')
      prop = ten.get('place')
      self.assertEqual(prop.get('streetAddress'), '537 Couper Dr.')
      self.assertEqual(prop.get('numBath'), 2)

# Property Manager Login Tests
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
      #setup()
      randEmail = "fakeEmailsForFakePeople{0}@gmail.com".format(str(random.randint(0, 10000000)))
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': randName,
                'lastName': 'Ugly Boi',
                'email': randEmail,
                'phone': '887282939',
                'password': 'pass4fake',
                'companyName': randName + " Rentals",
                }
      url = globUrl + 'register/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), randName)
      self.assertEqual(pm.get('lastName'), 'Ugly Boi')
      self.assertEqual(pm.get('email'), randEmail)
      self.assertEqual(pm.get('phone'), '887282939')

# Property Manager Login Tests
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
      #setup()
      randEmail = "fakeEmailsForFakePeople{0}@gmail.com".format(str(random.randint(0, 10000000)))
      randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
      data = {
                'firstName': randName,
                'lastName': 'Ugly Boi',
                'email': randEmail,
                'phone': '887282939',
                'password': 'pass4fake',
                'companyName': randName + " Rentals",
                }
      url = globUrl + 'register/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), randName)
      self.assertEqual(pm.get('lastName'), 'Ugly Boi')
      self.assertEqual(pm.get('email'), randEmail)
      self.assertEqual(pm.get('phone'), '887282939')

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
      #setup()
      pmEmail = "testForRoopairsRegistration@gmail.com"
      pmPass = "pass4test"
      pmFirstName = 'Test'
      pmLastName = 'RooRegistration'
      
      data = {
                'email': pmEmail,
                'password': 'pass4test',
             }

      url = globUrl + 'login/'
      x = requests.post(url, json=data)

      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), pmFirstName)
      self.assertEqual(pm.get('lastName'), pmLastName)
      self.assertEqual(pm.get('email'), pmEmail)
      PropertyManager.objects.filter(email=pmEmail).delete()
