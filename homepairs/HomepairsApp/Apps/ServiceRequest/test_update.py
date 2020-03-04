################################################################################
# Imports
from django.test import TestCase

from ..Appliances.models import Appliance
from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
from ..Properties.models import Property
from .views import STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'
APP_VIEW = 'appliance_view'

################################################################################
# Tests


class UpdateServiceProvider(TestCase):

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

        id = responseData.get('reqId')
        job = 'Break sink'
        serviceCompany = 'King kong'
        client = 'BK'
        status = 'Done'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'

        data = {
                  'reqId': id,
                  'job': job,
                  'serviceCompany': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }

        responseData = getInfoPut(REQ_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

    # update with wrong request id
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

        id = responseData.get('reqId')
        job = 'Break sink'
        serviceCompany = 'King kong'
        client = 'BK'
        status = 'Done'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'

        data = {
                  'reqId': id,
                  'job': job,
                  'serviceCompany': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }

        responseData = getInfoPut(REQ_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
