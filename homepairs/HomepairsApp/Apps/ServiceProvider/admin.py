from django.contrib import admin

from .models import PreferredProviders, ServiceProvider


# Register your models here.

admin.site.register(ServiceProvider)
admin.site.register(PreferredProviders)
