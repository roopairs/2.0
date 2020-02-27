################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoGet, getInfoPost, getInfoPut, setUpHelper
from .views import STATUS, SUCCESS
from ..Properties.models import Property
from ..Appliances.models import Appliance

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

        id = responseData.get('id')
        job = 'Break sink'
        serviceCompany = 'King kong'
        client = 'BK'
        status = 'Done'
        dayStarted = '2014-04-07'
        details = 'Sink works too well'

        data = {
                  'id': id,
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

        # data = {
        #           'phoneNum': phoneNum,
        #        }
        #
        # responseData = getInfoGet(PRO_VIEW, data)
        #
        # self.assertEqual(responseData.get(STATUS), SUCCESS)
        # app = responseData.get('pro')
        # self.assertEqual(app.get('name'), name)
        # self.assertEqual(app.get('email'), email)
        # self.assertEqual(app.get('phoneNum'), phoneNum)
        # self.assertEqual(app.get('contractLic'), contractLic)
        # self.assertEqual(app.get('skills'), skills)

    # def test_update_service_provider_bad_date(self):
    #     '''Incorrect Fields Being Sent'''
    #     name = 'McDs'
    #     email = 'mcds@gmail.com'
    #     phoneNum = '8007733030'
    #     contractLic = '681234'
    #     skills = 'can cook burgers okay'
    #     founded = '2014-04-07'
    #
    #     data = {
    #               'name': name,
    #               'email': email,
    #               'phoneNum': phoneNum,
    #               'contractLic': contractLic,
    #               'skills': skills,
    #               'founded': founded,
    #            }
    #     responseData = getInfoPost(PRO_VIEW, data)
    #     self.assertEqual(responseData.get(STATUS), SUCCESS)
    #     id = responseData.get(id)
    #
    #     name = 'Burger King'
    #     email = 'burgerking@gmail.com'
    #     phoneNum = '555555555'
    #     contractLic = '666666'
    #     skills = 'can cook burgers not great'
    #     founded = 'bad'
    #     data = {
    #               'name': name,
    #               'email': email,
    #               'phoneNum': phoneNum,
    #               'contractLic': contractLic,
    #               'skills': skills,
    #               'founded': founded,
    #            }
    #
    #     responseData = getInfoPut(PRO_VIEW, data)
    #
    #     self.assertEqual(responseData.get(STATUS), FAIL)
