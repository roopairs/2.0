################################################################################
# Imports
from unittest import mock

from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper
from ..Properties.models import Property
from .views import ERROR, FAIL, PROPERTY_DOESNT_EXIST, STATUS, SUCCESS


################################################################################
# Vars

# EXTRA URLS
APP_VIEW = 'appliance_view'
LOGIN = 'login'
PROP_VIEW = 'property_view'

################################################################################
# Tests


class CreateAppliance(TestCase):
    def setUp(self):
        setUpHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    @mock.patch('Apps.ServiceRequest.views.postRooTokenAPI', return_value=mockVal, autospec=True)
    def test_create_appliance_allCorrect(self, mocked):
        '''Everything is correct'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        name = 'Fridge'
        manufacturer = 'Company'
        category = 'cool'
        modelNum = 68
        serialNum = 70
        location = 'Garage'
        propId = Property.objects.filter()[0].rooId
        data = {
                  'name': name,
                  'manufacturer': manufacturer,
                  'category': category,
                  'modelNum': modelNum,
                  'serialNum': serialNum,
                  'location': location,
                  'propId': propId,
                  'token': responseData.get('token')
               }
        responseData = getInfoPost(APP_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

    # Test that passes bad propId
    def test_CREATE_APP_bad_propId(self):
        '''Incorrect Fields Being Sent'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

        name = 'Fridge'
        manufacturer = 'Company'
        category = 'cool'
        modelNum = 68
        serialNum = 70
        location = 'Garage'

        data = {
                  'name': name,
                  'manufacturer': manufacturer,
                  'category': category,
                  'modelNum': modelNum,
                  'serialNum': serialNum,
                  'location': location,
                  'propId': -1,
                  'token': responseData.get('token')
               }
        responseData = getInfoPost(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), PROPERTY_DOESNT_EXIST)
