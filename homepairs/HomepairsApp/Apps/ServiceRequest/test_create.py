################################################################################
# Imports
from django.test import TestCase

from ..helperFuncsForTesting import getInfoGet, getInfoPost, setUpHelper
from .views import STATUS, SUCCESS


# from .views import FAIL

################################################################################
# Vars

# EXTRA URLS
REQ_VIEW = 'service_request_view'

################################################################################
# Tests


class CreateServiceProvider(TestCase):
    def setUp(self):
        setUpHelper()

    def test_create_service_provider_allCorrect(self):
        '''Everything is correct'''
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

        # this code is not necessary so is commented out (because I'm too scared to delete it)

        # phoneNum = responseData.get('phoneNum')
        # data = {
        #           'phoneNum': phoneNum
        #        }
        #
        # responseData = getInfoGet(PRO_VIEW, data)
        #
        # self.assertEqual(responseData.get(STATUS), SUCCESS)
        #
        # pro = responseData.get('pro')
        # self.assertEqual(pro.get('name'), name)
        # self.assertEqual(pro.get('email'), email)
        # self.assertEqual(pro.get('phoneNum'), phoneNum)
        # self.assertEqual(pro.get('contractLic'), contractLic)
        # self.assertEqual(pro.get('skills'), skills)

    # Test that passes bad propId
    # def test_create_pro_bad_date(self):
    #     '''Incorrect Fields Being Sent'''
    #     name = 'McDs'
    #     email = 'mcds@gmail.com'
    #     phoneNum = '8007733030'
    #     contractLic = '681234'
    #     skills = 'can cook burgers okay'
    #     founded = 'bad'
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
    #
    #     self.assertEqual(responseData.get(STATUS), FAIL)
    #     self.assertEqual(responseData.get(ERROR), PROPERTY_DOESNT_EXIST)
