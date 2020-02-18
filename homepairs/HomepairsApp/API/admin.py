from django.contrib import admin

from .models import Property, PropertyManager, Tenant


# Register your models here.

admin.site.register(PropertyManager)
admin.site.register(Property)
admin.site.register(Tenant)
