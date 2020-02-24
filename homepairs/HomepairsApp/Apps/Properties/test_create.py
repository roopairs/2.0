################################################################################
# Imports
from unittest import mock

from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper
from ..Properties.models import Property
from ..PropertyManagers.models import PropertyManager
from .views import ERROR, FAIL, INCORRECT_FIELDS, PROPERTY_ALREADY_EXISTS, STATUS, SUCCESS


################################################################################
# Vars

PROP_VIEW = 'property_view'
VIEW_PROP = 'view_prop'
UPDATE_PROP = 'update_property'
LOGIN = 'login'

################################################################################
# Tests


class CreateProperty(TestCase):

    def setUp(self):
        setUpHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = {'id': 'd1oDOK5', 'physical_address_formatted': '130 Grand Ave, San Luis Obispo, CA 93405, USA'}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    @mock.patch('Apps.Properties.views.postRooTokenAPI', return_value=mockVal2, autospec=True)
    def test_create_property_allCorrect(self, mocked, mocked2):
        '''Everything is correct'''
        streetAddress = "130 Grand Ave"
        city = 'San Luis Obispo'
        state = 'CA'
        numBed = 3
        numBath = 1
        maxTenants = 3
        pmEmail = 'eerongrant@gmail.com'

        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

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

        responseData = getInfoPost(PROP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue('propertyID' in responseData)
        self.assertEqual(responseData.get('propertyID'), 'd1oDOK5')

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    def test_create_property_duplicate(self, mocked):
        '''Property manager tries to add a property already in the database.'''
        # This creates the property and puts it in our database before
        # it is created

        streetAddress = '353 Grand Ave'
        city = 'San Luis Obispo'
        state = 'CA'
        numBed = 3
        numBath = 1
        maxTenants = 3
        pmEmail = 'eerongrant@gmail.com'

        pm = PropertyManager.objects.filter(email=pmEmail)[0]
        prop = Property(streetAddress=streetAddress,
                        city=city,
                        state=state,
                        numBed=numBed,
                        numBath=numBath,
                        maxTenants=maxTenants,
                        pm=pm)
        prop.save()
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)
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

        responseData = getInfoPost(PROP_VIEW, data)
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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": state numBed token")
