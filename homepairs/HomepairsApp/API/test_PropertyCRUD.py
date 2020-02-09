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
CRE_PROP_URL = 'property/create/'
VIEW_PROP_URL = 'property/view/'
UPDATE_PROP_URL = 'property/update/'
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

class CreateProperty(TestCase):
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
      pmPass = 'pass4eeron'

      data = {
                'email': pmEmail,
                'password': pmPass
             }
      url = globUrl + LOGIN_URL
      x = requests.post(url, json=data)
      info = x.json()

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBath': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
                'token': info.get('token')
             }

      url = globUrl + CRE_PROP_URL
      x = requests.post(url, json=data)

      info = x.json()
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

   # Property manager tries to add the same property twice
   def test_create_property_duplicate(self):
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
                'token': 'hello'
             }
      url = globUrl + CRE_PROP_URL

      #succeeds the first time the property is created
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)
      #fails the second time trying to create the same property
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
   
   # Property manager fills in the form incorrectly
   def test_create_property_bad_fields(self):
      #setup()
      streetAddress = '1 Grand Ave'
      city = 'SLO'
      state = 'CA'
      numBed = 3
      numBath = 3
      maxTenants = 3
      pmEmail = 'eerongrant@gmail.com'
   
      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBth': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
             }
      url = globUrl + CRE_PROP_URL
      #fails because numBath is an incorrect field
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)

class UpdateProperty(TestCase):
   def setUp(self):
      setUpHelper()
   def tearDown(self):
      tearDownHelper()
   @classmethod
   def tearDownClass(self):
      setUpHelper()

   # Everything is correct, I create the property first, then update it.
   def test_update_property_allCorrect(self):
      streetAddress = '1 Grand Ave'
      city = 'SLO'
      state = 'CA'
      numBed = 3
      numBath = 1
      maxTenants = 3
      pmEmail = 'eerongrant@gmail.com'
      #setup()

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBath': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
                'token': 'hello'
             }
      url = globUrl + CRE_PROP_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)

      # NOW UPDATE IT

      oldStreetAddress = '1 Grand Ave'
      oldCity = 'SLO'
      streetAddress = '1054 Saint James Ct.'
      city = 'San Dimas'
      state = 'CA'
      numBed = 6
      numBath = 4
      maxTenants = 4
      data = {
                'oldStreetAddress': oldStreetAddress,
                'oldCity': oldCity,
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBath': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
             }

      url = globUrl + UPDATE_PROP_URL
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

   # The street address dict entry will be wrong
   def test_update_property_wrongStreetAddress(self):
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
                'token': 'haha'
             }
      url = globUrl + CRE_PROP_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)

      # NOW UPDATE IT

      oldStreetAddress = '1 Grand Ave'
      oldCity = 'SLO'
      streetAddress = '1054 Saint James Ct.'
      city = 'San Dimas'
      state = 'CA'
      numBed = 6
      numBath = 4
      maxTenants = 4
      data = {
                'oldStreetAddress': oldStreetAddress,
                'oldCity': oldCity,
                'stretAddress': streetAddress,
                'city': city,
                'state': state,
                'numBed': numBed,
                'numBath': numBath,
                'maxTenants': maxTenants,
                'pm': pmEmail,
             }

      url = globUrl + UPDATE_PROP_URL
      x = requests.post(url, json=data)
      info = json.loads(x.text)

      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), INCORRECT_FIELDS)
