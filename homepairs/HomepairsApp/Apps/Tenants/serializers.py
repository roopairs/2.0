from rest_framework.serializers import ModelSerializer

from .models import Tenant


class TenantSerializer(ModelSerializer):

    class Meta(object):
        model = Tenant
        fields = [
            'firstName', 'lastName', 'email', 'password', 'place', 'pm'
        ]
