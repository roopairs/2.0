from django.db import models


# Create your models here.

class PropertyManager(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=255)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "firstName": self.firstName,
                  "lastName": self.lastName,
                  "email": self.email,
               }
