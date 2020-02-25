################################################################################
# Imports
from unittest import mock

# from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoGet, setUpHelper
from ..Properties.models import Property
# from ..PropertyManagers.models import PropertyManager
from .views import ERROR, PROPERTY_DOESNT_EXIST, FAIL, STATUS, SUCCESS


################################################################################
# Vars

# globUrl = settings.TEST_URL

# EXTRA URLS
APP_VIEW = 'appliance_view'

################################################################################
# Tests

class CreateAppliance(TestCase):
    def setUp(self):
        setUpHelper()

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

        #this code is not necessary so is commented out (because I'm too scared to delete it) 

        # appId = responseData.get('id')
        # data = {
        #           'appId': appId
        #        }
        # print('HERE: ', appId)
        # responseData = getInfoGet(APP_VIEW, data)
        #
        # self.assertEqual(responseData.get(STATUS), SUCCESS)
        # app = responseData.get('app')
        # self.assertEqual(app.get('name'), name)
        # self.assertEqual(app.get('manufacturer'), manufacturer)
        # self.assertEqual(app.get('category'), category)
        # self.assertEqual(app.get('modelNum'), modelNum)
        # self.assertEqual(app.get('serialNum'), serialNum)
        # self.assertEqual(app.get('location'), location)

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
