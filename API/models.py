from django.db import models

# Create your models here.

class PropertyManager(models.Model):
   lastName = models.CharField(max_length=100)
   firstName = models.CharField(max_length=100)
   email = models.CharField(max_length=255)
   phone = models.CharField(max_length=30)

class Property(models.Model):
   address = models.CharField(max_length=255)
   SLID = models.IntegerField()
   numBath = models.IntegerField()
   numBed = models.IntegerField()
   maxTenants = models.IntegerField()
   manager = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

class Tenant(models.Model):
   lastName = models.CharField(max_length=100)
   firstName = models.CharField(max_length=100)
   email = models.CharField(max_length=255)
   phone = models.CharField(max_length=30)
   password = models.CharField(max_length=20)
   propId = models.ForeignKey(Property, on_delete=models.CASCADE)
   pmId = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

# FOR LATER
#class Appliance(models.Model):
#   applianceId = models.AutoField(primary_key=True)
#   name = models.CharField(max_length=255)
#   description = models.CharField(max_length=1000)
#   location = models.CharField(max_length=255)
#
#class Job(models.Model):
