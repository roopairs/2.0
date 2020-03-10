################################################################################
# Imports
# from unittest import mock

from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
from .views import ERROR, FAIL, INCORRECT_FIELDS, PROPERTY_ALREADY_EXISTS, STATUS


################################################################################
# Vars

PROP_VIEW = 'property_view'
LOGIN = 'login'

################################################################################
# Tests


class UpdateProperty(TestCase):

    def setUp(self):
        setUpHelper()

#    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
#    mockVal2 = {'id': '6x7OVxX',
#                'physical_address_formatted': '1661 McCollum St, San Luis Obispo, CA 93405, USA'}
#    mockVal3 = {'id': '6x7OVxX'}
#    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
#    @mock.patch('Apps.Properties.views.postRooTokenAPI', return_value=mockVal2, autospec=True)
#    @mock.patch('Apps.Properties.views.putRooTokenAPI', return_value=mockVal3, autospec=True)
#    def test_update_property_allCorrect(self, mocked, mocked2, mocked3):
#        '''Everything is correct. Prop already exists so I just update it.'''
#        pmEmail = 'updatingProps@gmail.com'
#        oldStreetAddress = '1054 Saint James Ct.'
#        oldCity = 'San Dimas'
#        tempPM = PropertyManager(firstName='Updating',
#                                 lastName='Props',
#                                 email=pmEmail)
#        tempProperty1 = Property(streetAddress=oldStreetAddress,
#                                 city=oldCity,
#                                 state='CA',
#                                 numBath=2,
#                                 numBed=5,
#                                 maxTenants=8,
#                                 rooId='lmnopqrs',
#                                 pm=tempPM)
#        tempPM.save()
#        tempProperty1.save()
#        data = {'email': pmEmail, 'password': 'pass4word'}
#
#        responseData = getInfoPost(LOGIN, data)
#
#        self.assertEqual(responseData.get(STATUS), SUCCESS)
#
#        streetAddress = '1661 McCollum'
#        city = 'San Luis Obispo'
#        state = 'CA'
#        numBed = 6
#        numBath = 4
#        maxTenants = 4
#        data = {
#                  'oldStreetAddress': oldStreetAddress,
#                  'oldCity': oldCity,
#                  'streetAddress': streetAddress,
#                  'city': city,
#                  'state': state,
#                  'numBed': numBed,
#                  'numBath': numBath,
#                  'maxTenants': maxTenants,
#                  'pm': pmEmail,
#                  'token': responseData.get('token'),
#                  'propID': '6x7OVxX'
#               }
#
#        responseData = getInfoPut(PROP_VIEW, data)
#
#        self.assertEqual(responseData.get(STATUS), SUCCESS)
#
#        updated = Property.objects.filter(streetAddress=streetAddress, city=city)[0]
#        self.assertEqual(updated.streetAddress, streetAddress)
#        self.assertEqual(updated.city, city)
#        self.assertEqual(updated.numBath, numBath)
#        self.assertEqual(updated.numBed, numBed)
#        self.assertEqual(updated.maxTenants, maxTenants)

    def test_update_to_preexisting(self):
        '''Tyring to update a prop to an address that exists already.'''
        pmEmail = 'eerongrant@gmail.com'
        oldStreetAddress = '1054 Saint James Ct.'
        oldCity = 'San Dimas'
        streetAddress = '200 N. Santa Rosa'
        city = 'San Luis Obispo'
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
                  'token': 'token',
                  'propId': '6x7OVxX'
               }

        responseData = getInfoPut(PROP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), PROPERTY_ALREADY_EXISTS)

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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

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
        responseData = getInfoPost(PROP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INCORRECT_FIELDS + ": state numBed token")
