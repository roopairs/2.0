################################################################################
# Imports
from unittest import mock

from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper, tearDownHelper
from .views import ERROR, FAIL, INCORRECT_CREDENTIALS, INCORRECT_FIELDS, STATUS, SUCCESS, TOKEN


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
LOGIN = 'pm_login'

################################################################################
# Tests
# Property Manager Login Tests


class Login(TestCase):
    def setUp(self):
        setUpHelper()

    def tearDown(self):
        tearDownHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    def test_login_correct(self, mocked):
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Eeron')
        self.assertEqual(pm.get('lastName'), 'Grant')
        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
        properties = responseData.get('properties')
        prop1 = properties[0]
        prop2 = properties[1]
        self.assertEqual(prop1.get('streetAddress'), '537 Couper Dr.')
        self.assertEqual(prop1.get('city'), 'San Luis Obispo')
        self.assertEqual(prop1.get('state'), 'CA')
        self.assertEqual(prop1.get('numBath'), 2)
        self.assertEqual(prop1.get('numBed'), 5)
        self.assertEqual(prop1.get('maxTenants'), 8)
        self.assertEqual(prop2.get('streetAddress'), '200 N. Santa Rosa')
        self.assertEqual(prop2.get('city'), 'San Luis Obispo')
        self.assertEqual(prop2.get('state'), 'CA')
        self.assertEqual(prop2.get('numBath'), 2)
        self.assertEqual(prop2.get('numBed'), 3)
        self.assertEqual(prop2.get('maxTenants'), 5)

    def test_pm_wrongEmail(self):
        '''Email is wrong'''
        data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_wrongPass(self):
        '''Pass is wrong'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_wrongPassAndEmail(self):
        '''Pass is wrong and email is wrong'''
        data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_incorrectEmailField(self):
        '''No Email Field'''
        data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    def test_pm_incorrectPassField(self):
        '''No Pass Field'''
        data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")

    def test_pm_incorrectFields(self):
        '''No Correct Fields'''
        data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email password")

    mockVal1 = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = [{'physical_address_formatted': '1 Grand Ave, San Luis Obispo, CA 93405, USA'}]

    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal1, autospec=True)
    @mock.patch('Apps.Properties.views.getRooTokenAPI', return_value=mockVal2, autospec=True)
    def test_pm_propOnRoopairs(self, mocked, mocked2):
        '''Has a property on Roopairs not in Homepairs'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Eeron')
        self.assertEqual(pm.get('lastName'), 'Grant')
        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
        properties = responseData.get('properties')
        self.assertEqual(properties[2].get('streetAddress'), '1 Grand Ave')
        self.assertEqual(properties[2].get('city'), 'San Luis Obispo')
        self.assertEqual(properties[2].get('state'), 'CA')
        self.assertEqual(properties[2].get('numBath'), 1)
        self.assertEqual(properties[2].get('numBed'), 1)
        self.assertEqual(properties[2].get('maxTenants'), 1)

    mockVal1 = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = [{'physical_address_formatted': '1 Grand Ave, San Luis Obispo, CA 93405, USA'},
                {'physical_address_formatted': '1661 McCollum St, San Luis Obispo, CA 93405, USA'}]

#    @mock.patch('Apps.helperFuncs.postRooAPI', return_value=mockVal1, autospec=True)
#    @mock.patch('Apps.helperFuncs.getRooTokenAPI', return_value=mockVal2, autospec=True)
#    def test_pm_propOnRoopairsXFour(self, mocked, mocked2):
#        '''Has four properties on Roopairs not in Homepairs'''
#        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
#        responseData = getInfoPost(LOGIN, data)
#
#        self.assertEqual(responseData.get(STATUS), SUCCESS)
#        self.assertTrue(TOKEN in responseData)
#        pm = responseData.get('pm')
#        self.assertEqual(pm.get('firstName'), 'Eeron')
#        self.assertEqual(pm.get('lastName'), 'Grant')
#        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
#        properties = responseData.get('properties')
#        self.assertEqual(len(properties), 4)
#        self.assertEqual(properties[3].get('streetAddress'), '1661 McCollum St')
#        self.assertEqual(properties[3].get('city'), 'San Luis Obispo')
#        self.assertEqual(properties[3].get('state'), 'CA')
#        self.assertEqual(properties[3].get('numBath'), 1)
#        self.assertEqual(properties[3].get('numBed'), 1)
#        self.assertEqual(properties[3].get('maxTenants'), 1)
