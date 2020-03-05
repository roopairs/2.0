from django.urls import reverse
from rest_framework.test import APIClient

from .Properties.models import Property
from .PropertyManagers.models import PropertyManager
from .Tenants.models import Tenant


def setUpHelper():
    tempPM = PropertyManager(firstName='Eeron',
                             lastName='Grant',
                             email='eerongrant@gmail.com')
    tempProperty1 = Property(streetAddress='537 Couper Dr.',
                             city='San Luis Obispo',
                             state='CA',
                             numBath=2,
                             numBed=5,
                             maxTenants=8,
                             rooId='abcdef',
                             pm=tempPM)
    tempProperty2 = Property(streetAddress='200 N. Santa Rosa',
                             city='San Luis Obispo',
                             state='CA',
                             numBath=2,
                             numBed=3,
                             maxTenants=5,
                             rooId='ghijkl',
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
    PropertyManager.objects.all().delete()
    Property.objects.all().delete()
    Tenant.objects.all().delete()


def getInfoPut(endpoint, data):
    client = APIClient()
    response = client.put(path=reverse(endpoint), data=data, format="json")
    return response.json()


def getInfoPost(endpoint, data):
    client = APIClient()
    response = client.post(path=reverse(endpoint), data=data, format="json")
    return response.json()


def getInfoGet(endpoint, id):
    client = APIClient()
    response = client.get(path=reverse(endpoint, args=[id]), format="json")
    return response.json()
