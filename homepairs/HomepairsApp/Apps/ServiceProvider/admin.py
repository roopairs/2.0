from django.contrib import admin

from .models import ServiceProvider, PreferredProviders


# Register your models here.

admin.site.register(ServiceProvider)
admin.site.register(PreferredProviders)
