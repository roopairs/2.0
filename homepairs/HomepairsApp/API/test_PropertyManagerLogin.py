################################################################################
# Imports
from django.test import TestCase
import requests
from .views import INCORRECT_FIELDS, STATUS, SUCCESS, FAIL, ERROR
from .views import ROOPAIR_ACCOUNT_CREATION_FAILED, TOKEN
from .views import INCORRECT_CREDENTIALS

################################################################################
# Vars

globUrl = 'https://homepairs-alpha.herokuapp.com/API/'
globUrl = 'http://localhost:8000/API/'

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
      info = x.json()
      self.assertEqual(info.get(STATUS), SUCCESS)
      self.assertTrue(TOKEN in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')

   # Email is wrong
   def test_pm_wrongEmail(self):
      data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # Pass is wrong
   def test_pm_wrongPass(self):
      data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # Pass is wrong and email is wrong
   def test_pm_wrongPassAndEmail(self):
      data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_CREDENTIALS)

   # No Email Field
   def test_pm_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Pass Field
   def test_pm_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # No Correct Fields
   def test_pm_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)

   # Has a property on Roopairs not in Homepairs
   def test_pm_propOnRoopairs(self):
      data = {'email': 'syncCheck@gmail.com', 'password': 'nisbyb-sidvUz-6qonve'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()

      self.assertEqual(info.get(STATUS), SUCCESS)
      self.assertTrue(TOKEN in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Sync')
      self.assertEqual(pm.get('lastName'), 'Checker')
      self.assertEqual(pm.get('email'), 'syncCheck@gmail.com')
      properties = info.get('properties')
      self.assertEqual(properties[0].get('streetAddress'), '1661 McCollum St')
      self.assertEqual(properties[0].get('city'), 'San Luis Obispo')
      self.assertEqual(properties[0].get('state'), 'CA')
      self.assertEqual(properties[0].get('numBath'), 1)
      self.assertEqual(properties[0].get('numBed'), 1)
      self.assertEqual(properties[0].get('maxTenants'), 1)

   # Has four properties on Roopairs not in Homepairs
   def test_pm_propOnRoopairsXFour(self):
      data = {'email': 'syncCheckFour@gmail.com', 'password': 'nisbyb-sidvUz-6qonve'}
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()

      self.assertEqual(info.get(STATUS), SUCCESS)
      self.assertTrue(TOKEN in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Sync')
      self.assertEqual(pm.get('lastName'), 'CheckerFour')
      self.assertEqual(pm.get('email'), 'syncCheckFour@gmail.com')
      properties = info.get('properties')
      self.assertEqual(len(properties), 4)
      self.assertEqual(properties[0].get('streetAddress'), '763 Foothill Blvd')
      self.assertEqual(properties[0].get('city'), 'San Luis Obispo')
      self.assertEqual(properties[0].get('state'), 'CA')
      self.assertEqual(properties[0].get('numBath'), 1)
      self.assertEqual(properties[0].get('numBed'), 1)
      self.assertEqual(properties[0].get('maxTenants'), 1)
      self.assertEqual(properties[1].get('streetAddress'), '1229 E Grand Ave')
      self.assertEqual(properties[1].get('city'), 'Arroyo Grande')
      self.assertEqual(properties[1].get('state'), 'CA')
      self.assertEqual(properties[1].get('numBath'), 1)
      self.assertEqual(properties[1].get('numBed'), 1)
      self.assertEqual(properties[1].get('maxTenants'), 1)
      self.assertEqual(properties[2].get('streetAddress'), '5550 Wilshire Blvd')
      self.assertEqual(properties[2].get('city'), 'Los Angeles')
      self.assertEqual(properties[2].get('state'), 'CA')
      self.assertEqual(properties[2].get('numBath'), 1)
      self.assertEqual(properties[2].get('numBed'), 1)
      self.assertEqual(properties[2].get('maxTenants'), 1)
      self.assertEqual(properties[3].get('streetAddress'), '530 W 27th St')
      self.assertEqual(properties[3].get('city'), 'Los Angeles')
      self.assertEqual(properties[3].get('state'), 'CA')
      self.assertEqual(properties[3].get('numBath'), 1)
      self.assertEqual(properties[3].get('numBed'), 1)
      self.assertEqual(properties[3].get('maxTenants'), 1)
