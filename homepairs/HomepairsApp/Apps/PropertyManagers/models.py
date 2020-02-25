from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class PropertyManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    rooToken = models.CharField(max_length=45, null=True, blank=True)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "firstName": self.firstName,
                  "lastName": self.lastName,
                  "email": self.email,
               }
