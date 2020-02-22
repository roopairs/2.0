from django.urls import path

from .views import ApplianceView


urlpatterns = [
                path('.*', ApplianceView.as_view(), name='appliance_view'),
]
