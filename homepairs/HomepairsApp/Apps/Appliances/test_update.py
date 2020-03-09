################################################################################
# Imports
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
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

    def test_update_appliance_allCorrect(self):
        '''Everything is correct, I create the appliance first, then update it.'''
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
        appId = responseData.get('appId')
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

        # data = {
        #           'appId': appId,
        #        }
        #
        # responseData = getInfoGet(APP_VIEW, data)
        #
        # self.assertEqual(responseData.get(STATUS), SUCCESS)
        # app = responseData.get('app')
        # self.assertEqual(app.get('name'), newName)
        # self.assertEqual(app.get('manufacturer'), newManufacturer)
        # self.assertEqual(app.get('category'), newCategory)
        # self.assertEqual(app.get('modelNum'), newModelNum)
        # self.assertEqual(app.get('serialNum'), newSerialNum)
        # self.assertEqual(app.get('location'), newLocation)

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
