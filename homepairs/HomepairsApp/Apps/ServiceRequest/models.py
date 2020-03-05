from django.db import models
from django.db.models.fields import CharField, DateTimeField

from ..Appliances.models import Appliance
from ..Properties.models import Property


class ServiceRequest(models.Model):
    job = CharField(max_length=100)
    details = CharField(max_length=300)
    serviceCompany = CharField(max_length=100)
    client = CharField(max_length=100)
    status = CharField(max_length=20)
    dayStarted = DateTimeField()
    appFixed = models.ForeignKey(Appliance, on_delete=models.CASCADE)
    location = models.ForeignKey(Property, on_delete=models.CASCADE)


    def __str__(self):
        return self.job + " " + self.details


    def toDict(self):
        return {
                "job": self.job,
                "details": self.details,
                "serviceCompany": self.serviceCompany,
                "client": self.client,
                "status": self.status,
                "dayStarted": self.dayStarted,
                "appFixed": self.appFixed.toDict(),
                "location": self.location.toDict()
                }
