################################################################################
# Imports
from django.conf import settings
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPut, setUpHelper
from .views import ERROR, FAIL, STATUS, SUCCESS, TENANT_ALREADY_IN_PROP


################################################################################
# Vars

globUrl = settings.TEST_URL

# EXTRA URLS
LOGIN = 'ten_edit'

################################################################################
# Tests
# Property Manager Login Tests


class TenantEdit(TestCase):
    def setUp(self):
        setUpHelper()

    def test_all_correct(self):
        data = {'tenantEmail': 'adamkberard@gmail.com', 'propId': 'abcdef'}
        responseData = getInfoPut(LOGIN, data)
        self.assertEqual(responseData.get(STATUS), SUCCESS)

    def test_already_in_prop(self):
        data = {'tenantEmail': 'adamkberard@gmail.com', 'propId': 'ghijkl'}
        responseData = getInfoPut(LOGIN, data)
        self.assertEqual(responseData.get(STATUS), FAIL)
        self.assertEqual(responseData.get(ERROR), TENANT_ALREADY_IN_PROP)

#        self.assertEqual(responseData.get(STATUS), SUCCESS)
#        self.assertTrue(TOKEN in responseData)
#        pm = responseData.get('pm')
#        self.assertEqual(pm.get('firstName'), 'Eeron')
#        self.assertEqual(pm.get('lastName'), 'Grant')
#        self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
#        properties = responseData.get('properties')
#        prop1 = properties[0]
#        prop2 = properties[1]
#        self.assertEqual(prop1.get('streetAddress'), '537 Couper Dr.')
#        self.assertEqual(prop1.get('city'), 'San Luis Obispo')
#        self.assertEqual(prop1.get('state'), 'CA')
#        self.assertEqual(prop1.get('numBath'), 2)
#        self.assertEqual(prop1.get('numBed'), 5)
#        self.assertEqual(prop1.get('maxTenants'), 8)
#        self.assertEqual(prop1.get('rooId'), 'abcdef')
#        self.assertEqual(prop2.get('streetAddress'), '200 N. Santa Rosa')
#        self.assertEqual(prop2.get('city'), 'San Luis Obispo')
#        self.assertEqual(prop2.get('state'), 'CA')
#        self.assertEqual(prop2.get('numBath'), 2)
#        self.assertEqual(prop2.get('numBed'), 3)
#        self.assertEqual(prop2.get('maxTenants'), 5)
#        self.assertEqual(prop2.get('rooId'), 'ghijkl')
#
