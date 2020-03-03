################################################################################
# Imports
from django.test import TestCase

from ..Appliances.models import Appliance
from ..helperFuncsForTesting import getInfoPost, setUpHelper
from ..Properties.models import Property
from .views import APPLIANCE_DOESNT_EXIST, ERROR, FAIL, PROPERTY_DOESNT_EXIST, STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'
APP_VIEW = 'appliance_view'

################################################################################
# Tests


class CreateServiceProvider(TestCase):
    def setUp(self):
        setUpHelper()

    def test_create_service_request_allCorrect(self):
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

        job = 'Fix sink'
        serviceCompany = 'Joe Plumbing'
        client = 'McDs'
        status = 'Pending'
        dayStarted = '2000-01-01'
        details = 'Sink dont work so good'
        propId = Property.objects.filter()[0].id
        appId = Appliance.objects.filter()[0].id
        data = {
                  'job': job,
                  'serviceCompany': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

    # Test that passes bad propId
    def test_create_service_request_bad_prop(self):
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

        job = 'Fix sink'
        serviceCompany = 'Joe Plumbing'
        client = 'McDs'
        status = 'Pending'
        dayStarted = '2000-01-01'
        details = 'Sink dont work so good'
        propId = -1
        appId = Appliance.objects.filter()[0].id
        data = {
                  'job': job,
                  'serviceCompany': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), PROPERTY_DOESNT_EXIST)

    # Test that passes bad appId
    def test_create_service_request_bad_app(self):
        '''Everything is correct'''
        job = 'Fix sink'
        serviceCompany = 'Joe Plumbing'
        client = 'McDs'
        status = 'Pending'
        dayStarted = '2000-01-01'
        details = 'Sink dont work so good'
        propId = Property.objects.filter()[0].id
        appId = -1
        data = {
                  'job': job,
                  'serviceCompany': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), APPLIANCE_DOESNT_EXIST)
