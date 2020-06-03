import datetime

from django.db import models

from ..PropertyManagers.models import PropertyManager


# Create your models here.


class ServiceProvider(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=254, null=True)
    phoneNum = models.CharField(max_length=128, null=True)
    website = models.CharField(max_length=200, null=True)
    logo = models.CharField(max_length=200, null=True)
    address = models.CharField(max_length=100, null=True)
    contractLic = models.CharField(max_length=20, null=True)
    rooId = models.CharField(max_length=20, null=True)
    bio = models.CharField(max_length=200, null=True)
    rate = models.CharField(max_length=50, null=True)
    skills = models.CharField(max_length=200, null=True)
    certified = models.BooleanField(null=True)
    founded = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.name

    def toDict(self):
        return {
                  "name": self.name,
                  "email": self.email,
                  "phoneNum": self.phoneNum,
                  "rooId": self.rooId,
                  "contractLic": self.contractLic,
                  "skills": self.skills,
                  "website": self.website,
                  "logo": self.logo,
                  "address": self.address,
                  "bio": self.bio,
                  "rate": self.rate,
                  "founded": self.founded,
                  "certified": self.certified,
                  'provId': self.id,
               }


class PreferredProviders(models.Model):
    provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)
    #timesHired = models.IntegerField(default=0)
