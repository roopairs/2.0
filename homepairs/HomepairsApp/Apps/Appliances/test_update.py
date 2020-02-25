################################################################################
# Imports
from unittest import mock

from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
from ..PropertyManagers.models import PropertyManager
from .models import Property
from .views import ERROR, FAIL, INCORRECT_FIELDS, PROPERTY_ALREADY_EXISTS, STATUS, SUCCESS


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
PRO_VIEW = 'service_provider_view'

################################################################################
# Tests


class UpdateServiceProvider(TestCase):

    def setUp(self):
        setUpHelper()

    def tearDown(self):
        tearDownHelper()

    @classmethod
    def tearDownClass(self):
        setUpHelper()

    mockVal = {"token": "cb3e47056453b655d9f9052f7368dfe170e91f39"}
    mockVal2 = {'id': '6x7OVxX',
                'physical_address_formatted': '1661 McCollum St, San Luis Obispo, CA 93405, USA'}
    mockVal3 = {'id': '6x7OVxX'}
    @mock.patch('Apps.PropertyManagers.views.postRooAPI', return_value=mockVal, autospec=True)
    @mock.patch('Apps.Properties.views.postRooTokenAPI', return_value=mockVal2, autospec=True)
    @mock.patch('Apps.Properties.views.putRooTokenAPI', return_value=mockVal3, autospec=True)
    def test_update_service_provider_allCorrect(self):
        '''Everything is correct, I create the property first, then update it.'''
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
        id = responseData.get(id)

        name = 'Burger King'
        email = 'burgerking@gmail.com'
        phoneNum = '555555555'
        contractLic = '666666'
        skills = 'can cook burgers not great'
        founded = '2000-01-01'
        data = {
                  'name': name,
                  'email': email,
                  'phoneNum': phoneNum,
                  'contractLic': contractLic,
                  'skills': skills,
                  'founded': founded,
               }

        responseData = getInfoPut(APP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'id': id,
               }

        responseData = getInfoGet(PRO_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        app = responseData.get('pro')
        self.assertEqual(app.get('name'), name)
        self.assertEqual(app.get('email'), manufacturer)
        self.assertEqual(app.get('phoneNum'), category)
        self.assertEqual(app.get('contractLic'), modelNum)
        self.assertEqual(app.get('skills'), serialNum)

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
