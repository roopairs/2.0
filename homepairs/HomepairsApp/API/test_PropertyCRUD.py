################################################################################
# Imports
import json
import random

import psycopg2
import requests
from django.conf import settings
from django.test import TestCase
from django.urls import reverse
from rest_framework.status import *
from rest_framework.test import APIClient

from .views import (
    ERROR, FAIL, HOMEPAIRS_ACCOUNT_CREATION_FAILED, INCORRECT_FIELDS, INVALID_PROPERTY,
    MULTIPLE_ACCOUNTS, NON_FIELD_ERRORS, PROPERTY_ALREADY_EXISTS, RESIDENTIAL_CODE,
    ROOPAIR_ACCOUNT_CREATION_FAILED, STATUS, SUCCESS, TOKEN, TOO_MANY_PROPERTIES
)


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

   client = APIClient()
   response = client.post(path=reverse('setup'), data=data, format="json")

def tearDownHelper():
   email = 'adamkberard@gmail.com'
   password = 'pass4testing'
   data = {'email': email, 'password': password}

   client = APIClient()
   response = client.post(path=reverse('teardown'), data=data, format="json")

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
      streetAddress = "{0} Grand Ave".format(str(random.randint(0, 10000)))
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
      client = APIClient()

      response = client.post(path=reverse('login'), data=data, format="json")
      info = response.json()

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

      response = client.post(path=reverse('create_prop'), data=data, format="json")

      info = response.json()
      self.assertEqual(info.get(STATUS), SUCCESS)

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'pm': pmEmail,
             }

      response = client.post(path=reverse('view_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), SUCCESS)
      prop = info.get('prop')
      self.assertEqual(prop.get('streetAddress'), streetAddress)
      self.assertEqual(prop.get('city'), city)
      self.assertEqual(prop.get('state'), state)
      self.assertEqual(prop.get('numBed'), numBed)
      self.assertEqual(prop.get('numBath'), numBath)


   def test_create_property_duplicate(self):
      '''Property manager tries to add the same property twice.'''
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
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')

      self.assertEqual(HTTP_STATUS_OK, response.status)

      info = response.json()

      #succeeds the first time the property is created
      #fails the second time trying to create the same property
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), PROPERTY_ALREADY_EXISTS)
   
   # Incorrect Fields Being Sent
   def test_create_property_bad_field_street(self):
      data = {
                'city': 'test',
                'state': 'test',
                'numBed': 1,
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')
      info = response.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: streetAddress")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_city(self):
      data = {
                'streetAddress': 'Test',
                'state': 'test',
                'numBed': 1,
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')
      info = response.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: city")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_bath(self):
      data = {
                'streetAddress': 'Test',
                'state': 'test',
                'city': 'test',
                'numBed': 1,
                'numBth': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')
      info = response.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: numBath")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_mult(self):
      data = {
                'streetAddress': 'Test',
                'city': 'test',
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
             }
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')
      info = response.json()
      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: state numBed token")

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
      client = APIClient()
      response = client.post(path=reverse('create_prop'), data=data, format='json')
      info = response.json()
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
                'token': 'token'
             }

      response = client.post(path=reverse('update_prop'), data=data, format='json')
      info = response.json()

      print(x.text)
      self.assertEqual(info.get(STATUS), SUCCESS)

      data = {
                'streetAddress': streetAddress,
                'city': city,
                'state': state,
                'pm': pmEmail,
             }

      response = client.post(path=reverse('view_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), SUCCESS)
      prop = info.get('prop')
      self.assertEqual(prop.get('streetAddress'), streetAddress)
      self.assertEqual(prop.get('city'), city)
      self.assertEqual(prop.get('state'), state)
      self.assertEqual(prop.get('numBed'), numBed)
      self.assertEqual(prop.get('numBath'), numBath)

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_street(self):
      data = {
                'oldStreetAddress': 'test',
                'oldCity': 'test',
                'city': 'test',
                'state': 'test',
                'numBed': 1,
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('update_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: streetAddress")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_city(self):
      data = {
                'oldStreetAddress': 'test',
                'oldCity': 'test',
                'streetAddress': 'Test',
                'state': 'test',
                'numBed': 1,
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('update_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: city")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_bath(self):
      data = {
                'oldStreetAddress': 'test',
                'oldCity': 'test',
                'streetAddress': 'Test',
                'state': 'test',
                'city': 'test',
                'numBed': 1,
                'numBth': 2,
                'maxTenants': 2,
                'pm': 'test',
                'token': 'asasdfasdf'
             }
      client = APIClient()
      response = client.post(path=reverse('update_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: numBath")

   # Incorrect Fields Being Sent
   def test_create_property_bad_field_mult(self):
      data = {
                'oldStreetAddress': 'test',
                'oldCity': 'test',
                'streetAddress': 'Test',
                'city': 'test',
                'numBath': 2,
                'maxTenants': 2,
                'pm': 'test',
             }
      client = APIClient()
      response = client.post(path=reverse('update_prop'), data=data, format='json')
      info = response.json()

      self.assertEqual(info.get(STATUS), FAIL)
      self.assertEqual(info.get(ERROR), "Incorrect fields: state numBed token")
