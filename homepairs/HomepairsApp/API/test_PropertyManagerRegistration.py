################################################################################
# Imports
import json
import random

import psycopg2
import requests
from django.conf import settings
from django.test import TestCase

from .views import ERROR, FAIL, INCORRECT_FIELDS, STATUS, SUCCESS


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
LOGIN_URL = 'login/'
PM_REG_URL = 'register/pm/'

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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": firstName")
 
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": lastName")
 
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": email")
 
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
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": password")
 
 
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
    #def test_pm_allCorrect(self):
    #   pmEmail = "testForRoopairsRegistration@gmail.com"
    #   pmPass = "pass4test"
    #   pmFirstName = 'Test'
    #   pmLastName = 'RooRegistration'
 
    #   data = {
    #             'email': pmEmail,
    #             'password': pmPass,
    #          }
 
    #   url = globUrl + LOGIN_URL
    #   x = requests.post(url, json=data)
 
    #   info = json.loads(x.text)
    #   print(":LDSKFJ")
    #   print(x.text)
    #   self.assertEqual(info.get(STATUS), SUCCESS)
    #   pm = info.get('pm')
    #   self.assertEqual(pm.get('firstName'), pmFirstName)
    #   self.assertEqual(pm.get('lastName'), pmLastName)
    #   self.assertEqual(pm.get('email'), pmEmail)
 
    def test_pm_noEmail(self):
        pmPass = "pass4test"
        pmFirstName = 'Test'
        pmLastName = 'RooRegistration'
 
        data = {
                  'password': 'pass4test',
               }
 
        url = globUrl + LOGIN_URL
        x = requests.post(url, json=data)
 
        info = json.loads(x.text)
        self.assertEqual(info.get(STATUS), FAIL)
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": email")
 
    def test_pm_noPass(self):
        pmEmail = "testForRoopairsRegistration@gmail.com"
        pmFirstName = 'Test'
        pmLastName = 'RooRegistration'
 
        data = {
                  'email': pmEmail,
               }
 
        url = globUrl + LOGIN_URL
        x = requests.post(url, json=data)
 
        info = json.loads(x.text)
        self.assertEqual(info.get(STATUS), FAIL)
        self.assertEqual(info.get(ERROR), INCORRECT_FIELDS + ": password")
 
    # They already have properties
    def test_pm_allCorrectPlusProps(self):
        pmEmail = "syncCheckRegister@gmail.com"
        pmPass = "nisbyb-sidvUz-6qonve"
        pmFirstName = 'Sync'
        pmLastName = 'CheckRegister'
 
        data = {
                  'email': pmEmail,
                  'password': pmPass,
               }
 
        url = globUrl + LOGIN_URL
        x = requests.post(url, json=data)
 
        info = json.loads(x.text)
        self.assertEqual(info.get(STATUS), SUCCESS)
        pm = info.get('pm')
        self.assertEqual(pm.get('firstName'), pmFirstName)
        self.assertEqual(pm.get('lastName'), pmLastName)
        self.assertEqual(pm.get('email'), pmEmail)
        properties = info.get('properties')
        self.assertEqual(properties[0].get('streetAddress'), '1170 W Branch St')
        self.assertEqual(properties[0].get('city'), 'Arroyo Grande')
        self.assertEqual(properties[0].get('state'), 'CA')
        self.assertEqual(properties[0].get('numBath'), 1)
        self.assertEqual(properties[0].get('numBed'), 1)
        self.assertEqual(properties[0].get('maxTenants'), 1)
