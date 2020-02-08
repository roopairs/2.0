from django.contrib import admin
from .models import PropertyManager, Property, Tenant

# Register your models here.

admin.site.register(PropertyManager)
admin.site.register(Property)
admin.site.register(Tenant)
