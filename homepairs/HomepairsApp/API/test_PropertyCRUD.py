################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from .helperFuncsForTesting import getInfo, setUpHelper, tearDownHelper
from .views import ERROR, FAIL, INCORRECT_FIELDS, PROPERTY_ALREADY_EXISTS, STATUS, SUCCESS


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
CREATE_PROP = 'create_prop'
VIEW_PROP = 'view_prop'
UPDATE_PROP = 'update_prop'
LOGIN = 'login'

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

    def test_create_property_allCorrect(self):
        '''Everything is correct'''
        streetAddress = "130 Grand Ave"
        city = 'San Luis Obispo'
        state = 'CA'
        numBed = 3
        numBath = 1
        maxTenants = 3
        pmEmail = 'eerongrant@gmail.com'

        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'streetAddress': streetAddress,
                  'city': city,
                  'state': state,
                  'numBed': numBed,
                  'numBath': numBath,
                  'maxTenants': maxTenants,
                  'pm': pmEmail,
                  'token': responseData.get('token')
               }

        responseData = getInfo(CREATE_PROP, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'streetAddress': streetAddress,
                  'city': city,
                  'state': state,
                  'pm': pmEmail,
               }

        responseData = getInfo(VIEW_PROP, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        prop = responseData.get('prop')
        self.assertEqual(prop.get('streetAddress'), streetAddress)
        self.assertEqual(prop.get('city'), city)
        self.assertEqual(prop.get('state'), state)
        self.assertEqual(prop.get('numBed'), numBed)
        self.assertEqual(prop.get('numBath'), numBath)

    def test_create_property_duplicate(self):
        '''Property manager tries to add the same property twice.'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        streetAddress = '353 Grand Ave'
        city = 'San Luis Obispo'
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
                  'token': responseData.get('token')
               }
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), PROPERTY_ALREADY_EXISTS)

    def test_create_property_bad_field_street(self):
        '''Incorrect Fields Being Sent'''
        data = {
                  'city': 'test',
                  'state': 'test',
                  'numBed': 1,
                  'numBath': 2,
                  'maxTenants': 2,
                  'pm': 'test',
                  'token': 'asasdfasdf'
               }
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": streetAddress")

    def test_create_property_bad_field_city(self):
        '''Incorrect Fields Being Sent'''
        data = {
                  'streetAddress': 'Test',
                  'state': 'test',
                  'numBed': 1,
                  'numBath': 2,
                  'maxTenants': 2,
                  'pm': 'test',
                  'token': 'asasdfasdf'
               }
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": city")

    def test_create_property_bad_field_bath(self):
        '''Incorrect Fields Being Sent'''
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
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": numBath")

    def test_create_property_bad_field_mult(self):
        '''Incorrect Fields Being Sent'''
        data = {
                  'streetAddress': 'Test',
                  'city': 'test',
                  'numBath': 2,
                  'maxTenants': 2,
                  'pm': 'test',
               }
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": state numBed token")


class UpdateProperty(TestCase):
    def setUp(self):
        setUpHelper()

    def tearDown(self):
        tearDownHelper()

    @classmethod
    def tearDownClass(self):
        setUpHelper()

    def test_update_property_allCorrect(self):
        '''Everything is correct, I create the property first, then update it.'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfo(LOGIN, data)

        streetAddress = '395 Grand Ave'
        city = 'San Luis Obispo'
        state = 'CA'
        numBed = 3
        numBath = 1
        maxTenants = 3
        pmEmail = 'eerongrant@gmail.com'
        token = responseData.get('token')

        data = {
                  'streetAddress': streetAddress,
                  'city': city,
                  'state': state,
                  'numBed': numBed,
                  'numBath': numBath,
                  'maxTenants': maxTenants,
                  'pm': pmEmail,
                  'token': token
               }
        responseData = getInfo(CREATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        oldStreetAddress = '395 Grand Ave'
        oldCity = 'San Luis Obispo'
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
                  'token': token
               }

        responseData = getInfo(UPDATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'streetAddress': streetAddress,
                  'city': city,
                  'state': state,
                  'pm': pmEmail,
               }

        responseData = getInfo(VIEW_PROP, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        prop = responseData.get('prop')
        self.assertEqual(prop.get('streetAddress'), streetAddress)
        self.assertEqual(prop.get('city'), city)
        self.assertEqual(prop.get('state'), state)
        self.assertEqual(prop.get('numBed'), numBed)
        self.assertEqual(prop.get('numBath'), numBath)

    def test_create_property_bad_field_street(self):
        '''Incorrect Fields Being Sent'''
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
        responseData = getInfo(UPDATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": streetAddress")

    def test_create_property_bad_field_city(self):
        '''Incorrect Fields Being Sent'''
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
        responseData = getInfo(UPDATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": city")

    def test_create_property_bad_field_bath(self):
        '''Incorrect Fields Being Sent'''
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
        responseData = getInfo(UPDATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": numBath")

    def test_create_property_bad_field_mult(self):
        '''Incorrect Fields Being Sent'''
        data = {
                  'oldStreetAddress': 'test',
                  'oldCity': 'test',
                  'streetAddress': 'Test',
                  'city': 'test',
                  'numBath': 2,
                  'maxTenants': 2,
                  'pm': 'test',
               }
        responseData = getInfo(UPDATE_PROP, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": state numBed token")
