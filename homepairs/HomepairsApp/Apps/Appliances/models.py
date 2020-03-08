from django.db import models

from ..Properties.models import Property


# Create your models here.


class Appliance(models.Model):
    category = models.CharField(max_length=100, default='unspecified')
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100, null=True)
    modelNum = models.IntegerField(null=True)
    serialNum = models.IntegerField(null=True)
    location = models.CharField(max_length=100, null=True)
    rooAppId = models.CharField(null=True)
    place = models.ForeignKey(Property, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + " " + self.location

    def toDict(self):
        return {
                  "name": self.name,
                  "location": self.location,
                  "manufacturer": self.manufacturer,
                  "serialNum": self.serialNum,
                  "modelNum": self.modelNum,
                  "category": self.category,
                  "place": [self.place.toDict()]
               }
