################################################################################
# Imports
from django.test import TestCase

from ..Appliances.models import Appliance
from ..helperFuncsForTesting import getInfoGet, getInfoPost, setUpHelper
from ..Properties.models import Property
from .views import STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'
REQ_GET_VIEW = 'request_get'
APP_VIEW = 'appliance_view'

################################################################################
# Tests


class GetServiceRequest(TestCase):

    def setUp(self):
        setUpHelper()

    def test_update_service_request_allCorrect(self):
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

        job = 'Break sink'
        serviceCompany = 'King kong'
        client = 'BK'
        status = 'Done'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'

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

        responseData = getInfoGet('request_get', propId)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertEqual(len(responseData.get('reqs')), 2)
