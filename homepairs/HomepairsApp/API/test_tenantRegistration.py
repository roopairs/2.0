################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from .helperFuncsForTesting import getInfo, setUpHelper, tearDownHelper
from .views import ERROR, FAIL, INCORRECT_FIELDS, STATUS, SUCCESS


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
TENANT_REG = 'tenant_registration'

################################################################################
# Tests
# Tenant Login Tests


class TenantRegistration(TestCase):
    def setUp(self):
        setUpHelper()

    def tearDown(self):
        tearDownHelper()

    @classmethod
    def tearDownClass(self):
        setUpHelper()

    def test_tenant_allCorrect(self):
        '''Everything is correct'''
        tenEmail = 'fakeEmail@gmail.com'
        data = {
                  'firstName': 'Fake',
                  'lastName': 'Name',
                  'email': tenEmail,
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
                  'password': 'pass4fake',
                  }
        responseData = getInfo(TENANT_REG, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        ten = responseData.get('tenant')
        self.assertEqual(ten.get('firstName'), 'Fake')
        self.assertEqual(ten.get('lastName'), 'Name')
        self.assertEqual(ten.get('email'), tenEmail)
        tenProp = responseData.get('properties')[0]
        self.assertEqual(tenProp.get('streetAddress'), '537 Couper Dr.')
        self.assertEqual(tenProp.get('numBath'), 2)

    def test_tenant_noLastName(self):
        '''Not all fields supplied'''
        tenEmail = 'fakeEmail@gmail.com'
        data = {
                  'firstName': 'Fake',
                  'email': tenEmail,
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
                  'password': 'pass4fake',
               }
        responseData = getInfo(TENANT_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": lastName")

    def test_tenant_noFirstName(self):
        tenEmail = 'fakeEmail@gmail.com'
        data = {
                  'lastName': 'Name',
                  'email': tenEmail,
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
                  'password': 'pass4fake',
               }
        responseData = getInfo(TENANT_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": firstName")

    def test_tenant_Email(self):
        data = {
                  'firstName': 'Fake',
                  'lastName': 'Name',
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
                  'password': 'pass4fake',
               }
        responseData = getInfo(TENANT_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": email")

    def test_tenant_noPassword(self):
        tenEmail = 'fakeEmail@gmail.com'
        data = {
                  'firstName': 'Fake',
                  'lastName': 'Name',
                  'email': tenEmail,
                  'streetAddress': '537 Couper Dr.',
                  'city': 'San Luis Obispo',
               }
        responseData = getInfo(TENANT_REG, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": password")
