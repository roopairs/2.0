import secrets
import datetime

from django.db import models

from ..PropertyManagers.models import PropertyManager
from ..Tenants.models import Tenant

# Create your models here.

def quickEnough(time1):
    timeDelay = 30
    time1 = time1.astimezone(datetime.timezone.utc)
    time2 = datetime.datetime.now(datetime.timezone.utc)
    margin = datetime.timedelta(minutes=timeDelay)
    return time2 - time1 <= margin

class APIKey(models.Model):
    apikey = models.CharField(max_length=100)

    def getKey(self):
        return self.apikey

class Token(models.Model):
    token = models.CharField(max_length = 64)
    rooPairsToken = models.CharField(max_length=40, null=True)
    pmBool = models.BooleanField(null=True, default=False)
    tenantBool = models.BooleanField(null=True, default=False)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE, null=True, default=None)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, default=None)
    lastAccessed = models.DateTimeField()

    def __str__(self):
        return self.token

    def isValid(self):
        if(quickEnough(self.lastAccessed)):
            self.lastAccessed = datetime.datetime.now(datetime.timezone.utc)
            self.save()
            return True
        else:
            return  False

    def selfInitialize(self):
        print("HERE")
        print(self.token)
        self.token = secrets.token_hex()
        print(secrets.token_hex())
        self.lastAccessed = datetime.datetime.now(datetime.timezone.utc)
        self.save()

    def getToken(self):
        return self.token

    def isPm(self):
        return self.pmBool

    def isTenant(self):
        return self.tenantBool

    def getPm(self):
        return self.pm

    def getTenant(self):
        return self.tenant

    def getRooPairsToken(self):
        return self.rooPairsToken

    def setRooPairsToken(self, aToken):
        self.rooPairsToken = aToken
        self.save()

    def setTenant(self, aTenant):
        self.tenant = aTenant
        self.pm = None
        self.tenantBool = True
        self.pmBool = False
        self.save()

    def setPm(self, aPm):
        self.tenant = None
        self.pm = aPm
        self.tenantBool = False
        self.pmBool = True
        self.save()

    def setRooPairsToken(self, aToken):
        self.rooPairsToken = aToken
        self.save()
