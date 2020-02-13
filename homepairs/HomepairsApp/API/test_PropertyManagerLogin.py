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

    # Everything is correct
    def test_pm_allCorrect(self):
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue(TOKEN in responseData)
        pm = responseData.get('pm')
        self.assertEqual(pm.get('firstName'), 'Eeron')
        self.assertEqual(pm.get('lastName'), 'Grant')
        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')

    # Email is wrong
    def test_pm_wrongEmail(self):
        data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    # Pass is wrong
    def test_pm_wrongPass(self):
        data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    # Pass is wrong and email is wrong
    def test_pm_wrongPassAndEmail(self):
        data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_CREDENTIALS)

    # No Email Field
    def test_pm_incorrectEmailField(self):
        data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    # No Pass Field
    def test_pm_incorrectPassField(self):
        data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")

    # No Correct Fields
    def test_pm_incorrectFields(self):
        data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email password")

    # Has a property on Roopairs not in Homepairs
    def test_pm_propOnRoopairs(self):
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

    # Has four properties on Roopairs not in Homepairs
    def test_pm_propOnRoopairsXFour(self):
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
