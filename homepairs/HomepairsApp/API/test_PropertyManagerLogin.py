################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from .helperFuncsForTesting import getInfo, setUpHelper, tearDownHelper
from .views import ERROR, FAIL, INCORRECT_CREDENTIALS, INCORRECT_FIELDS, STATUS, SUCCESS, TOKEN


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
LOGIN = 'login'

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

    def test_pm_allCorrect(self):
        '''Everything is correct'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Eeron')
        self.assertEqual(pm.get('lastName'), 'Grant')
        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')

    def test_pm_wrongEmail(self):
        '''Email is wrong'''
        data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_wrongPass(self):
        '''Pass is wrong'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_wrongPassAndEmail(self):
        '''Pass is wrong and email is wrong'''
        data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    def test_pm_incorrectEmailField(self):
        '''No Email Field'''
        data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    def test_pm_incorrectPassField(self):
        '''No Pass Field'''
        data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")

    def test_pm_incorrectFields(self):
        '''No Correct Fields'''
        data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email password")

    def test_pm_propOnRoopairs(self):
        '''Has a property on Roopairs not in Homepairs'''
        data = {'email': 'syncCheck@gmail.com', 'password': 'nisbyb-sidvUz-6qonve'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Sync')
        self.assertEqual(pm.get('lastName'), 'Checker')
        self.assertEqual(pm.get('email'), 'syncCheck@gmail.com')
        properties = responseData.get('properties')
        self.assertEqual(properties[0].get('streetAddress'), '1661 McCollum St')
        self.assertEqual(properties[0].get('city'), 'San Luis Obispo')
        self.assertEqual(properties[0].get('state'), 'CA')
        self.assertEqual(properties[0].get('numBath'), 1)
        self.assertEqual(properties[0].get('numBed'), 1)
        self.assertEqual(properties[0].get('maxTenants'), 1)

    def test_pm_propOnRoopairsXFour(self):
        '''Has four properties on Roopairs not in Homepairs'''
        data = {'email': 'syncCheckFour@gmail.com', 'password': 'nisbyb-sidvUz-6qonve'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Sync')
        self.assertEqual(pm.get('lastName'), 'CheckerFour')
        self.assertEqual(pm.get('email'), 'syncCheckFour@gmail.com')
        properties = responseData.get('properties')
        self.assertEqual(len(properties), 4)
