from django.db import models


# Create your models here.

class PropertyManager(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=255)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "firstName": self.firstName,
                  "lastName": self.lastName,
                  "email": self.email,
               }


class Property(models.Model):
    streetAddress = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    numBath = models.FloatField()
    numBed = models.IntegerField()
    maxTenants = models.IntegerField()
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
                  "pm": str(self.pm)
               }


class Tenant(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)
    place = models.ForeignKey(Property, on_delete=models.CASCADE)
    pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

    def __str__(self):
        return self.firstName + " " + self.lastName

    def toDict(self):
        return {
                  "firstName": self.firstName,
                  "lastName": self.lastName,
                  "email": self.email,
                  "password": self.password,
                  "pm": [self.pm.toDict()]
               }


class Appliance(models.Model):
    category = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    modelNum = models.IntegerField()
    serialNum = models.IntegerField()
    location = models.CharField(max_length=100)
    rooAppId = models.IntegerField()
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
