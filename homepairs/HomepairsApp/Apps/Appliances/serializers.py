from rest_framework.serializers import ModelSerializer

from .models import Appliance


class ApplianceSerializer(ModelSerializer):

    class Meta(object):
        model = Appliance
        fields = [
            'category', 'name', 'manufacturer', 'modelNum', 'serialNum', 'location',
            'rooAppId', 'place'
        ]
