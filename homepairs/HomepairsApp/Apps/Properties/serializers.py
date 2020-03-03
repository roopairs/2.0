from rest_framework.serializers import ModelSerializer

from ..Appliances.serializers import ApplianceSerializer
from ..Tenants.serializers import TenantSerializer
from .models import Property


class PropertySerializer(ModelSerializer):
    tenant_set = TenantSerializer(many=True, read_only=True)
    appliance_set = ApplianceSerializer(many=True, read_only=True)

    class Meta(object):
        model = Property
        fields = [
            "id", "rooId", "pm", "streetAddress", "city", "state", "numBath", "numBed", "maxTenants",
            "tenant_set", "appliance_set"
        ]
