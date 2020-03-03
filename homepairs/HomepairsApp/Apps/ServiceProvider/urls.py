from django.urls import path

from .views import ServiceProviderView


urlpatterns = [
                path('.*', ServiceProviderView.as_view(), name='service_provider_view'),
]
