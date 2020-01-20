from django.db import models

# Create your models here.

class PropertyManager(models.Model):
   firstName = models.CharField(max_length=100)
   lastName = models.CharField(max_length=100)
   email = models.CharField(max_length=255)
   phone = models.CharField(max_length=30,
                            blank=True,
                            null=True)

   def __str__(self):
      return self.firstName + " " + self.lastName

   def toDict(self):
      return {
                "firstName": self.firstName,
                "lastName": self.lastName,
                "email": self.email,
                "phone": self.phone
             }

class Property(models.Model):
   streetAddress = models.CharField(max_length=255)
   city = models.CharField(max_length=255)
   state = models.CharField(max_length=255)
   SLID = models.IntegerField()
   numBath = models.IntegerField()
   numBed = models.IntegerField()
   maxTenants = models.IntegerField()
   pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

   def __str__(self):
      return "%s, %s, %s" % (self.streetAddress, self.city, self.state)
   
   def toDictNoRecurs(self):
      return {
                "streetAddress": self.streetAddress,
                "city": self.city,
                "state": self.state,
                "SLID": self.SLID,
                "numBath": self.numBath,
                "numBed": self.numBed,
                "maxTenants": self.maxTenants,
                "pm": str(self.pm)
             }
   def toDict(self):
      return {
                "streetAddress": self.streetAddress,
                "city": self.city,
                "state": self.state,
                "SLID": self.SLID,
                "numBath": self.numBath,
                "numBed": self.numBed,
                "maxTenants": self.maxTenants,
                "pm": self.pm.toDict()
             }

class Tenant(models.Model):
   firstName = models.CharField(max_length=100)
   lastName = models.CharField(max_length=100)
   email = models.CharField(max_length=255)
   phone = models.CharField(max_length=30)
   password = models.CharField(max_length=20)
   place = models.ForeignKey(Property, on_delete=models.CASCADE)
   pm = models.ForeignKey(PropertyManager, on_delete=models.CASCADE)

   def __str__(self):
      return self.firstName + " " + self.lastName

   def toDict(self):
      editPlace = self.place.toDict()
      editPlace.pop('pm', None)
      editPlace['pm'] = str(self.pm)
      return {
                "firstName": self.firstName,
                "lastName": self.lastName,
                "email": self.email,
                "phone": self.phone,
                "password": self.password,
                "place": editPlace,
                "pm": self.pm.toDict()
             }
