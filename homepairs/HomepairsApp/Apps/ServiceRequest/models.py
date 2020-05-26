from django.db import models
from django.db.models.fields import CharField, DateTimeField

from ..Appliances.models import Appliance
from ..Properties.models import Property
from ..ServiceProvider.models import ServiceProvider


class ServiceRequest(models.Model):
    details = CharField(max_length=300)
    serviceCategory = CharField(max_length=50, default='unknown')
    serviceCompany = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, null=True)
    serviceType = CharField(max_length=100, null=True)
    client = CharField(max_length=100)
    status = CharField(max_length=20)
    serviceDate = DateTimeField()
    pocName = CharField(max_length=20, null=True)
    poc = CharField(max_length=20, null=True)
    appFixed = models.ForeignKey(Appliance, on_delete=models.CASCADE, null=True, blank=True)
    location = models.ForeignKey(Property, on_delete=models.CASCADE)

    def __str__(self):
        return self.details

    def toDict(self):
        if(self.appFixed is None):
            appFixedStr = ''
        else:
            appFixedStr = self.appFixed.toDictNoRecurs()
        return {
                "id": self.id,
                "details": self.details,
                "serviceCategory": self.serviceCategory,
                "serviceCompany": str(self.serviceCompany),
                "client": self.client,
                "status": self.status,
                "serviceDate": self.serviceDate,
                "appFixed": appFixedStr,
                "location": str(self.location)
                }
