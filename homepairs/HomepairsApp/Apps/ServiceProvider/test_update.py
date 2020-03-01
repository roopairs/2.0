################################################################################
# Imports
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, getInfoPut, setUpHelper
from .views import ERROR, FAIL, INVALID_DATE, SERVPRO_DOESNT_EXIST, STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

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

        # responseData = getInfoGet(PRO_VIEW, data)
        #
        # self.assertEqual(responseData.get(STATUS), SUCCESS)
        # app = responseData.get('pro')
        # self.assertEqual(app.get('name'), name)
        # self.assertEqual(app.get('email'), email)
        # self.assertEqual(app.get('phoneNum'), phoneNum)
        # self.assertEqual(app.get('contractLic'), contractLic)
        # self.assertEqual(app.get('skills'), skills)

    def test_update_service_provider_bad_date(self):
        '''Incorrect Fields Being Sent'''
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

        oldPhoneNum = '8007733030'
        name = 'Burger King'
        email = 'burgerking@gmail.com'
        phoneNum = '555555555'
        contractLic = '666666'
        skills = 'can cook burgers not great'
        founded = 'bad'
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

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), INVALID_DATE)

    def test_update_service_provider_bad_phone_num(self):
        '''Incorrect Fields Being Sent'''
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

        oldPhoneNum = '555'
        name = 'Burger King'
        email = 'burgerking@gmail.com'
        phoneNum = '555555555'
        contractLic = '666666'
        skills = 'can cook burgers not great'
        founded = '2014-05-01'
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

        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), SERVPRO_DOESNT_EXIST)
