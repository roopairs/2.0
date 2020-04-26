################################################################################
# Imports
from unittest import mock

from django.test import TestCase

from ..Appliances.models import Appliance
from ..helperFuncsForTesting import getInfoPost, setUpHelper
from ..Properties.models import Property
from ..ServiceProvider.models import ServiceProvider
from ..ServiceProvider.models import PreferredProviders
from ..PropertyManagers.models import PropertyManager
from .views import APPLIANCE_DOESNT_EXIST, ERROR, FAIL, PROPERTY_DOESNT_EXIST, STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'
APP_VIEW = 'appliance_view'
PRO_VIEW = 'service_provider_view'
LOGIN = 'login'

################################################################################
# Tests


class CreateServiceProvider(TestCase):
    def setUp(self):
        setUpHelper()

    def test_create_service_request_allCorrect(self, mocked):
        '''Everything is correct'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

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

        name = 'McDs'
        email = 'mcds@gmail.com'
        phoneNum = '8007733030'
        contractLic = '681234'
        skills = 'can cook burgers okay'
        founded = '2014-04-07'

        data = {
                  'name': name,
                  'email': email,
                  'phoneNum': phoneNum,
                  'contractLic': contractLic,
                  'skills': skills,
                  'founded': founded,
               }
        responseData = getInfoPost(PRO_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        serviceCompany = ServiceProvider.objects.filter()[0].id
        serviceCategory = 'Plumbing'
        serviceDate = '2008-04-10 11:47:58-05'
        details = 'Sink dont work so good'
        propId = Property.objects.filter()[0].id
        appId = Appliance.objects.filter()[0].id
        data = {
                  'provId': serviceCompany,
                  'serviceCategory': serviceCategory,
                  'serviceDate': serviceDate,
                  'details': details,
                  'propId': propId,
                  'appId': appId,
                  'token': responseData.get('token')
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                    'phoneNum': phoneNum,
                    'pmId': PropertyManager.objects.filter()[0].id
               }
        responseData = getInfoPost(PREF_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)
