################################################################################
# Imports
import random
from unittest import mock

from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost
from ..Properties.models import Property
from .views import ERROR, FAIL, INCORRECT_FIELDS, STATUS, SUCCESS


################################################################################
# Vars

LOGIN = 'login'
PM_REG = 'pm_register'

################################################################################
# Tests
# Property Manager Registration Tests


class PMRegistration(TestCase):

    mockVal = {'token': '6d8a51999f5ed8802bc303c779074a7fde788c89'}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    def test_pm_allCorrect(self, mocked):
        '''Everything is correct'''
        email = "tempPerson@gmail.com"
        firstName = "Mr. Big Man"
        lastName = "Ugly Man"
        companyName = firstName + " Rentals"
        data = {
                  'firstName': firstName,
                  'lastName': lastName,
                  'email': email,
                  'password': 'pass4fake',
                  'companyName': companyName,
               }
        responseData = getInfoPost(PM_REG, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), firstName)
        self.assertEqual(pm.get('lastName'), lastName)
        self.assertEqual(pm.get('email'), email)

    def test_pm_missing_firstName(self):
        '''PM Missing fields'''
        data = {
                  'lastName': 'Ugly Boi',
                  'email': 'fakeEmail@gmail.com',
                  'password': 'pass4fake',
               }
        responseData = getInfoPost(PM_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": firstName")

    def test_pm_missing_lastName(self):
        data = {
                  'firstName': 'Test',
                  'email': 'fakeEmail@gmail.com',
                  'password': 'pass4fake',
               }
        responseData = getInfoPost(PM_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": lastName")

    def test_pm_missing_email(self):
        data = {
                  'firstName': 'Adam',
                  'lastName': 'Ugly Boi',
                  'password': 'pass4fake',
               }
        responseData = getInfoPost(PM_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    def test_pm_missing_password(self):
        randEmail = "fakeEmail.@gmail.com"
        randName = "BBNo{0}".format(str(random.randint(0, 10000000)))
        data = {
                  'firstName': randName,
                  'lastName': 'Ugly Boi',
                  'email': randEmail,
               }
        responseData = getInfoPost(PM_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")


class PMRegistrationRoopairs(TestCase):
    '''Property Manager Login Tests with Roopairs'''

    # Everything is correct
    mockVal = {'first_name': 'Ever',
               'last_name': 'Greatest',
               'email': 'temp@gmail.com',
               'token': 'be07667beb21e100feff06378de712c874a9121b'}

    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    def test_pm_allCorrect(self, mocked):
        pmEmail = "temp@gmail.com"
        pmPass = "pass4temp"

        data = {
                  'email': pmEmail,
                  'password': pmPass,
               }

        responseData = getInfoPost(LOGIN, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('email'), pmEmail)
        self.assertTrue('token' in responseData)

    def test_pm_noEmail(self):
        data = {
                  'password': 'pass4test',
               }
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    def test_pm_noPass(self):
        data = {
                  'email': 'test@gmail.com'
               }
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")

    mockVal = {'first_name': 'Sync',
               'last_name': 'CheckRegister',
               'email': 'syncCheckRegister@gmail.com',
               'token': '4b1e51eb69376cc7d7e08a718166dd624036b62e'}
    mockVal2 = [{'id': 'wkGXJxE',
                 'physical_address_formatted': '537 Couper Dr, San Luis Obispo, CA 93405, USA'},
                {'id': 'X1bJb1l', 'physical_address_formatted': '1 Grand Ave, San Luis Obispo, CA 93405, USA'}]

    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    @mock.patch('Apps.Properties.views.getRooTokenAPI', return_value=mockVal2, autospec=True)
    def test_pm_allCorrectPlusProps(self, mocked, mocked2):
        '''They already have two properties'''
        pmEmail = "syncCheckRegister@gmail.com"
        pmPass = "nisbyb-sidvUz-6qonve"
        pmFirstName = 'Sync'
        pmLastName = 'CheckRegister'

        data = {
                  'email': pmEmail,
                  'password': pmPass,
               }
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue('token' in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), pmFirstName)
        self.assertEqual(pm.get('lastName'), pmLastName)
        self.assertEqual(pm.get('email'), pmEmail)
        properties = responseData.get('properties')
        self.assertEqual(properties[0].get('streetAddress'), '537 Couper Dr')
        self.assertEqual(properties[0].get('city'), 'San Luis Obispo')
        self.assertEqual(properties[0].get('state'), 'CA')
        self.assertEqual(properties[0].get('numBath'), 1)
        self.assertEqual(properties[0].get('numBed'), 1)
        self.assertEqual(properties[0].get('maxTenants'), 1)

        prop = Property.objects.filter(streetAddress='537 Couper Dr')[0]
        self.assertEqual(str(prop), '537 Couper Dr, San Luis Obispo, CA')
        prop = Property.objects.filter(streetAddress='1 Grand Ave')[0]
        self.assertEqual(str(prop), '1 Grand Ave, San Luis Obispo, CA')
