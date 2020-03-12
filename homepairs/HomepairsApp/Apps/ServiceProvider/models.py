import datetime

from django.db import models


# Create your models here.


class ServiceProvider(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, null=True)
    phoneNum = models.CharField(max_length=15)
    contractLic = models.CharField(max_length=15, null=True)
    skills = models.CharField(max_length=200, null=True)
    founded = models.DateField(default=datetime.date.today)

    # image????

    def __str__(self):
        return self.name + ", " + self.email + ", ID HERE ---->" + str(self.id)

    def toDict(self):
        return {
                  "name": self.name,
                  "email": self.email,
                  "phoneNum": self.phoneNum,
                  "contractLic": self.contractLic,
                  "skills": self.skills,
                  "founded": self.founded,
                  "provId": self.rooProvId,
               }
