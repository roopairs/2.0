from django.db import models

from ..Properties.models import Property
from ..PropertyManagers.models import PropertyManager


# Create your models here.

class Tenant(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)
    phoneNumber = models.CharField(max_length=20)
    place = models.ForeignKey(Property, on_delete=models.CASCADE, null=True, blank=True)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "firstName": self.firstName,
                  "lastName": self.lastName,
                  "email": self.email,
                  "password": self.password,
                  "phoneNumber": self.phoneNumber,
                  "pm": [self.pm.toDict()]
               }
