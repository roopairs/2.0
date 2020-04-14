from rest_framework.serializers import ModelSerializer

from ..Appliances.serializers import ApplianceSerializer
from ..Properties.serializers import PropertySerializer
from ..Tenants.serializers import TenantSerializer
from .models import PropertyManager


class PropertyManagerSerializer(ModelSerializer):
    tenant_set = TenantSerializer(many=True, read_only=True)
    appliance_set = ApplianceSerializer(many=True, read_only=True)
    property_set = PropertySerializer(many=True, read_only=True)

    class Meta(object):
        model = PropertyManager
        fields = [
            "firstName", 'lastName', 'email'
        ]
