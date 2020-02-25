################################################################################
# Imports
from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper
from .views import STATUS, SUCCESS


################################################################################
# Vars

PROP_VIEW = 'property_view'
VIEW_PROP = 'view_prop'
UPDATE_PROP = 'update_property'
LOGIN = 'login'

################################################################################
# Tests


class SendBackLists(TestCase):

    def setUp(self):
        setUpHelper()

    def test_create_property_allCorrect(self):
        '''Everything is correct'''
        streetAddress = "130 Grand Ave"
        city = 'San Luis Obispo'
        state = 'CA'
        numBed = 3
        numBath = 1
        maxTenants = 3
        pmEmail = 'eerongrant@gmail.com'

        data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
        responseData = getInfoPost(LOGIN, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)

        data = {
                  'streetAddress': streetAddress,
                  'city': city,
                  'state': state,
                  'numBed': numBed,
                  'numBath': numBath,
                  'maxTenants': maxTenants,
                  'pm': pmEmail,
                  'token': responseData.get('token')
               }

        responseData = getInfoPost(PROP_VIEW, data)

        self.assertEqual(responseData.get(STATUS), SUCCESS)
        self.assertTrue('propertyID' in responseData)
        self.assertEqual(responseData.get('propertyID'), 'd1oDOK5')
