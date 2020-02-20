from django.db import models

from ..PropertyManagers.models import PropertyManager


# Create your models here.

class Property(models.Model):
    streetAddress = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    numBath = models.FloatField()
    numBed = models.IntegerField()
    maxTenants = models.IntegerField()
    rooId = models.CharField(max_length=10, blank=True)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

    def __str__(self):
        return "%s, %s, %s" % (self.streetAddress, self.city, self.state)

    def toDict(self):
        return {
                  "streetAddress": self.streetAddress,
                  "city": self.city,
                  "state": self.state,
                  "numBath": self.numBath,
                  "numBed": self.numBed,
                  "maxTenants": self.maxTenants,
                  "rooId": self.rooId,
                  "pm": str(self.pm)
               }
