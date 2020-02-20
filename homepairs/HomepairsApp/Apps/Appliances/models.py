from django.db import models

from ..Properties.models import Property


# Create your models here.


class Appliance(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    rooAppId = models.IntegerField()
    location = models.CharField(max_length=100)
    place = models.ForeignKey(Property, on_delete=models.CASCADE)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "name": self.name,
                  "description": self.description,
                  "location": self.location,
                  "place": [self.place.toDict()]
               }
