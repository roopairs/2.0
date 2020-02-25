################################################################################
# Imports
from unittest import mock

from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper
from ..Properties.models import Property
from ..PropertyManagers.models import PropertyManager
from .views import ERROR, FAIL, INCORRECT_FIELDS, PROPERTY_ALREADY_EXISTS, STATUS, SUCCESS


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
APP_VIEW = 'appliance_view'
VIEW_APP = 'view_appliance'
UPDATE_APP = 'update_appliance'
LOGIN = 'login'

################################################################################
# Tests

class CreateAppliance(TestCase):
    def setUp(self):
        setUpHelper()

    def tearDown(self):
        tearDownHelper()

    @classmethod
    def tearDownClass(self):
        setUpHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = {'id': 'd1oDOK5', 'physical_address_formatted': '130 Grand Ave, San Luis Obispo, CA 93405, USA'}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    @mock.patch('Apps.Properties.views.postRooTokenAPI', return_value=mockVal2, autospec=True)
    def test_create_appliance_allCorrect(self):
        '''Everything is correct'''
        name = 'Fridge'
        manufacturer = 'Company'
        category = 'cool'
        modelNum = 68
        serialNum = 70
        location = 'Garage'
        propId = Property.objects.filter()[0].id

        data = {
                  'name': name,
                  'manufacturer': manufacturer,
                  'category': category,
                  'modelNum': modelNum,
                  'serialNum': serialNum,
                  'location': location,
                  'propId': propId,
               }
        responseData = getInfoPost(APP_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        appId = responseData.get('id')
        data = {
                  'appId': appId
               }

        responseData = getInfo(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        app = responseData.get('app')
        self.assertEqual(app.get('name'), name)
        self.assertEqual(app.get('manufacturer'), manufacturer)
        self.assertEqual(app.get('category'), category)
        self.assertEqual(app.get('modelNum'), modelNum)
        self.assertEqual(app.get('serialNum'), serialNum)
        self.assertEqual(app.get('location'), location)

    # Test that passes bad propId
    def test_CREATE_APP_bad_address(self):
        '''Incorrect Fields Being Sent'''
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
               }
        responseData = getInfoPost(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), PROPERTY_DOESNT_EXIST)
