
# Create your tests here.
################################################################################
# File Name : loginAndRegistrationTests.py
# Created By : Adam Berard
# Creation Date : 02-12-2019
# Last Modified : Tue Jan 14 13:16:27 2020
# Description:

################################################################################
# Imports
from django.test import TestCase
import psycopg2
import requests
import json
from .models import PropertyManager, Property, Tenant

################################################################################
# Vars

globUrl = 'https://homepairs-alpha.herokuapp.com/API/'
globUrl = 'http://localhost:8000/API/'

tempPM = PropertyManager(firstName='Tommy',
                         lastName='Bergmann', 
                         email='tbbergma@calpoly.edu',
                         phone='5558393823')
tempProperty = Property(streetAddress='200 N. Santa Rosa',
                        city='San Luis Obispo',
                        state='CA',
                        SLID=69,
                        numBath=2,
                        numBed=3,
                        maxTenants=5,
                        pm=tempPM)
tempTenant = Tenant(firstName='Adam',
                    lastName='Berard',
                    email='adamkberard@gmail.com',
                    phone='9092614646',
                    password='pass4adam',
                    place=tempProperty,
                    pm=tempPM)

################################################################################
# Helper Functions

def clearData():
   PropertyManager.objects.all().delete()
   Property.objects.all().delete()
   Tenant.objects.all().delete()
   
def populateTables():
   tempPM.save()
   tempProperty.save()
   tempTenant.save()
   tempPM.save(using='other')
   tempProperty.save(using='other')
   tempTenant.save(using='other')

def setup():
   clearData()
   populateTables()

################################################################################
# Tests

# Tenant Login Tests
class TenantLogin(TestCase):

   # Everything is correct
   def test_tenant_allCorrect(self):
      #setup()
      data = {'email': 'adamkberard@gmail.com', 'password': 'pass4adam'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      print("HERE")
      print(x.text)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'success')
      tenant = info.get('tenant')
      self.assertEqual(tenant.get('firstName'), 'Adam')
      self.assertEqual(tenant.get('lastName'), 'Berard')
      self.assertEqual(tenant.get('email'), 'adamkberard@gmail.com')
      self.assertEqual(tenant.get('phone'), '9092614646')
      self.assertEqual(tenant.get('password'), 'pass4adam')
      place = tenant.get('place')
      self.assertEqual(place.get('streetAddress'), '200 N. Santa Rosa')
      self.assertEqual(place.get('city'), 'San Luis Obispo')
      self.assertEqual(place.get('state'), 'CA')
      self.assertEqual(place.get('SLID'), 69)
      self.assertEqual(place.get('numBath'), 2)
      self.assertEqual(place.get('numBed'), 3)
      self.assertEqual(place.get('maxTenants'), 5)
      self.assertEqual(place.get('pm'), 'Eeron Grant')
      pm = tenant.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
      self.assertEqual(pm.get('phone'), '5558393823')


   # Incorrect Email
   def test_tenant_incorrectEmail(self):
      #setup()
      data = {'email': 'damkberard@gmail.com', 'password': 'pass4adam'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')

   # Incorrect Pass
   def test_tenant_incorrectPass(self):
      #setup()
      data = {'email': 'adamkberard@gmail.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')

   # Incorrect Pass & Email
   def test_tenant_incorrectPassAndEmail(self):
      data = {'email': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')

   # No Email Field
   def test_tenant_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

   # No Pass Field
   def test_tenant_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

   # No Correct Fields
   def test_tenant_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

# Property Manager Login Tests
class PropertyManagerLogin(TestCase):

   # Everything is correct
   def test_pm_allCorrect(self):
      #setup()
      data = {'email': 'eerongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + 'login/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'success')
      self.assertTrue('token' in info)
      pm = info.get('pm')
      self.assertEqual(pm.get('firstName'), 'Eeron')
      self.assertEqual(pm.get('lastName'), 'Grant')
      self.assertEqual(pm.get('email'), 'eerongrant@gmail.com')
      self.assertEqual(pm.get('phone'), '5558393823')

   # Email is wrong
   def test_pm_wrongEmail(self):
      #setup()
      data = {'email': 'erongrant@gmail.com', 'password': 'pass4eeron'}
      url = globUrl + 'login/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')

   # Pass is wrong
   def test_pm_wrongPass(self):
      #setup()
      data = {'email': 'eerongrant@gmail.com', 'password': 'passeeron'}
      url = globUrl + 'login/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')

   # Pass is wrong and email is wrong
   def test_pm_wrongPassAndEmail(self):
      #setup()
      data = {'email': 'eerongant@gmail.com', 'password': 'passeeron'}
      url = globUrl + 'login/pm/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'incorrect credentials')
   # No Email Field
   def test_pm_incorrectEmailField(self):
      data = {'gmail': 'adam@m.com', 'password': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

   # No Pass Field
   def test_pm_incorrectPassField(self):
      data = {'email': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

   # No Correct Fields
   def test_pm_incorrectFields(self):
      data = {'gmail': 'adam@m.com', 'assword': 'adamisNOTcool'}
      url = globUrl + 'login/tenant/'
      x = requests.post(url, json=data)
      info = json.loads(x.text)
      self.assertEqual(info.get('status'), 'failure')
      self.assertEqual(info.get('error'), 'wrong fields')

