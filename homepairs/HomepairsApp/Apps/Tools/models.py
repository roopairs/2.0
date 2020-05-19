import secrets
import datetime

from django.db import models

from ..PropertyManagers.models import PropertyManager
from ..Tenants.models import Tenant

# Create your models here.

def quickEnough(time1):
    time2 = datetime.datetime.now()
    return time1 - datetime.timedelta(minutes=30) < time2

class APIKey(models.Model):
    apikey = models.CharField(max_length=100)

    def getKey(self):
        return self.apikey

class Token(models.Model):
    token = models.CharField(max_length = 64)
    rooPairsToken = models.CharField(max_length=40, null=True)
    isPm = models.BooleanField(null=True, default=False)
    isTenant = models.BooleanField(null=True, default=False)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE, null=True, default=None)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, default=None)
    lastAccessed = models.DateTimeField(auto_now_add=True)

    def __init__(self):
        token = secrets.token_hex()

    def getToken():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return token
        else:
            return None


    def isPm():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return isPm
        else:
            return None

    def isTenant():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return isTenant
        else:
            return None

    def getPm():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return pm
        else:
            return None

    def getTenant():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return tenant
        else:
            return None

    def getRooPairsToken():
        if(quickEnough(lastAccessed)):
            lastAccessed = datetime.datetime.now()
            return rooPairsToken
        else:
            return None

    def setRooPairsToken(aToken):
        rooPairsToken = aToken

    def setTenant(aTenant):
        tenant = aTenant
        pm = None
        isTenant = True
        isPm = False

    def setPm(aPm):
        pm = aPm
        tenant = None
        isTenant = False
        isPm = True

    def setRooPairsToken(aToken):
        rooPairsToken = aToken

    def resetTime():
        lastAccessed = datetime.datetime.now()
