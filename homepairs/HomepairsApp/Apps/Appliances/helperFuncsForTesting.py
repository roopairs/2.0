from django.urls import reverse
from rest_framework.test import APIClient

from ..Properties.models import Property
from ..PropertyManagers.models import PropertyManager
from ..Tenants.models import Tenant
from .models import Appliance


def setUpHelper():
    PropertyManager.objects.all().delete()
    Property.objects.all().delete()
    Tenant.objects.all().delete()
    tempPM = PropertyManager(firstName='Eeron',
                             lastName='Grant',
                             email='eerongrant@gmail.com')
    tempProperty1 = Property(streetAddress='537 Couper Dr.',
                             city='San Luis Obispo',
                             state='CA',
                             numBath=2,
                             numBed=5,
                             maxTenants=8,
                             pm=tempPM)
    tempProperty2 = Property(streetAddress='200 N. Santa Rosa',
                             city='San Luis Obispo',
                             state='CA',
                             numBath=2,
                             numBed=3,
                             maxTenants=5,
                             pm=tempPM)
    tempTenant = Tenant(firstName='Adam',
                        lastName='Berard',
                        email='adamkberard@gmail.com',
                        password='pass4adam',
                        place=tempProperty2,
                        pm=tempPM)
    tempPM.save()
    tempProperty1.save()
    tempProperty2.save()
    tempTenant.save()


def tearDownHelper():
    Appliance.objects.all().delete()
    PropertyManager.objects.all().delete()
    Property.objects.all().delete()
    Tenant.objects.all().delete()


def getInfo(endpoint, data):
    client = APIClient()
    response = client.post(path=reverse(endpoint), data=data, format="json")
    return response.json()
