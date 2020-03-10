################################################################################
# Imports
from django.test import TestCase

from ..Appliances.models import Appliance
from ..ServiceProvider.models import ServiceProvider
from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
from ..Properties.models import Property
from .views import STATUS, SUCCESS, FAIL, SERVREQ_DOESNT_EXIST, ERROR


################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'
APP_VIEW = 'appliance_view'
PRO_VIEW = 'service_provider_view'
LOGIN = 'login'

################################################################################
# Tests


class UpdateServiceProvider(TestCase):

    def setUp(self):
        setUpHelper()

    def test_update_service_request_allCorrect(self):
        '''Everything is correct, I create the property first, then update it.'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)
        token = responseData.get('token')

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
                  'token': token
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

        job = 'Fix sink'
        serviceCompany = ServiceProvider.objects.filter()[0].id
        client = 'McDs'
        status = 'Pending'
        dayStarted = '2000-01-01'
        details = 'Sink dont work so good'
        propId = Property.objects.filter()[0].id
        appId = Appliance.objects.filter()[0].id
        data = {
                  'job': job,
                  'provId': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId,
                  'token': token
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        id = responseData.get('reqId')
        job = 'Break sink'
        client = 'MCD'
        status = 'Just started'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'
        propId = Property.objects.filter()[1].id
        appId = Appliance.objects.filter()[0].id

        data = {
                  'reqId': id,
                  'job': job,
                  'provId': serviceCompany,
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
    def test_update_service_request_bad_reqid(self):
        '''Everything is correct, I create the property first, then update it.'''
        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)
        token = responseData.get('token')

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
                  'token': token
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

        job = 'Fix sink'
        serviceCompany = ServiceProvider.objects.filter()[0].id
        client = 'McDs'
        status = 'Pending'
        dayStarted = '2000-01-01'
        details = 'Sink dont work so good'
        propId = Property.objects.filter()[0].id
        appId = Appliance.objects.filter()[0].id
        data = {
                  'job': job,
                  'provId': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId,
                  'token': token
               }
        responseData = getInfoPost(REQ_VIEW, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

        id = -1
        job = 'Break sink'
        client = 'MCD'
        status = 'Just started'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'
        propId = Property.objects.filter()[1].id
        appId = Appliance.objects.filter()[0].id

        data = {
                  'reqId': id,
                  'job': job,
                  'provId': serviceCompany,
                  'client': client,
                  'status': status,
                  'dayStarted': dayStarted,
                  'details': details,
                  'propId': propId,
                  'appId': appId
               }

        responseData = getInfoPut(REQ_VIEW, data)

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), SERVREQ_DOESNT_EXIST)
