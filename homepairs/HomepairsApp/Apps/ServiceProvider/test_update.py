################################################################################
# Imports
from unittest import mock

from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoPut, getInfoGet, setUpHelper
# from ..PropertyManagers.models import PropertyManager
from .models import Property
from .views import FAIL, STATUS, SUCCESS


################################################################################
# Vars

# EXTRA URLS
APP_VIEW = 'appliance_view'
VIEW_APP = 'view_appliance'
UPDATE_APP = 'update_appliance'
LOGIN = 'login'

################################################################################
# Tests


class UpdateAppliance(TestCase):

    def setUp(self):
        setUpHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = {'id': '6x7OVxX',
                'physical_address_formatted': '1661 McCollum St, San Luis Obispo, CA 93405, USA'}
    mockVal3 = {'id': '6x7OVxX'}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    @mock.patch('Apps.Properties.views.postRooTokenAPI', return_value=mockVal2, autospec=True)
    @mock.patch('Apps.Properties.views.putRooTokenAPI', return_value=mockVal3, autospec=True)
    def test_update_appliance_allCorrect(self):
        '''Everything is correct, I create the property first, then update it.'''
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

        newName = 'freezer'
        newManufacturer = 'different company'
        newCategory = 'really cool'
        newModelNum = 1
        newSerialNum = 2
        newLocation = 'bedroom'
        appId = responseData.get('id')
        data = {
                  'newName': newName,
                  'newManufacturer': newManufacturer,
                  'newCategory': newCategory,
                  'newModelNum': newModelNum,
                  'newSerialNum': newSerialNum,
                  'newLocation': newLocation,
                  'appId': appId,
               }

        responseData = getInfoPut(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'appId': appId,
               }

        responseData = getInfoGet(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        app = responseData.get('app')
        self.assertEqual(app.get('name'), newName)
        self.assertEqual(app.get('manufacturer'), newManufacturer)
        self.assertEqual(app.get('category'), newCategory)
        self.assertEqual(app.get('modelNum'), newModelNum)
        self.assertEqual(app.get('serialNum'), newSerialNum)
        self.assertEqual(app.get('location'), newLocation)

    def test_update_app_bad_app_id(self):
        '''Incorrect Fields Being Sent'''
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

        newName = 'freezer'
        newManufacturer = 'different company'
        newCategory = 'really cool'
        newModelNum = 1
        newSerialNum = 2
        newLocation = 'bedroom'
        data = {
                  'newName': newName,
                  'newManufacturer': newManufacturer,
                  'newCategory': newCategory,
                  'newModelNum': newModelNum,
                  'newSerialNum': newSerialNum,
                  'newLocation': newLocation,
                  'appId': -1,
               }

        responseData = getInfoPut(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
