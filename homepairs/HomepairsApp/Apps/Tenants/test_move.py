################################################################################
# Imports

from django.test import TestCase

from ..helperFuncsForTesting import getInfoPost, setUpHelper
from .views import ERROR, FAIL, INCORRECT_CREDENTIALS, INCORRECT_FIELDS, STATUS, SUCCESS


################################################################################
# Vars

MOVE = 'tenant_move'

################################################################################
# Tests
# Tenant Login Tests


class TenantMove(TestCase):

    def setUp(self):
        setUpHelper()

    def test_tenant_move_allCorrect(self):
        '''Everything is correct'''
        email = 'adamkberard@gmail.com'
        propId = 'abcdef'
        data = {'email': email, 'propId': propId}

        responseData = getInfoPost(MOVE, data)
        
        print(responseData)
