################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoGet, getInfoPost, getInfoPut, setUpHelper
from .views import STATUS, SUCCESS


# from .views import FAIL

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

        oldPhoneNum = phoneNum
        name = 'Burger King'
        email = 'burgerking@gmail.com'
        phoneNum = '555555555'
        contractLic = '666666'
        skills = 'can cook burgers not great'
        founded = '2000-01-01'
        data = {
                  'oldPhoneNum': oldPhoneNum,
                  'name': name,
                  'email': email,
                  'phoneNum': phoneNum,
                  'contractLic': contractLic,
                  'skills': skills,
                  'founded': founded,
               }

        responseData = getInfoPut(PRO_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'phoneNum': phoneNum,
               }

        responseData = getInfoGet(PRO_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        app = responseData.get('pro')
        self.assertEqual(app.get('name'), name)
        self.assertEqual(app.get('email'), email)
        self.assertEqual(app.get('phoneNum'), phoneNum)
        self.assertEqual(app.get('contractLic'), contractLic)
        self.assertEqual(app.get('skills'), skills)

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
