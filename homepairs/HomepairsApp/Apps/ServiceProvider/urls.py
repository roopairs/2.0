from django.urls import path

from .views import ServiceProviderView
from .prefferedViews import PreferredProviderView


urlpatterns = [
    path('prefprov/*', PreferredProviderView.as_view(), name='prof_provider_view'),
    path('.*', ServiceProviderView.as_view(), name='service_provider_view'),
]
