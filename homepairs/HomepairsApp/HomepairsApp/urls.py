"""HomepairsApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from Apps.Appliances.views import ApplianceView
from Apps.Properties.views import PropertyView
from Apps.PropertyManagers.views import LoginView
from Apps.ServiceProvider.views import ServiceProviderView
from Apps.ServiceRequest.views import ServiceRequestView
from Apps.ServiceProvider.preferredViews import PreferredProviderView
from Apps.Tools.views import APIKeyView
from Apps.ServiceRequest.views_get_pm import GetServiceRequestPmView
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('dungeon/', admin.site.urls),
    path('pm/', include('Apps.PropertyManagers.urls')),
    path('property/', PropertyView.as_view(), name='tempIguess'),
    path('property/<str:inPropId>/', PropertyView.as_view(), name='otherOne'),
    path('tenant/', include('Apps.Tenants.urls')),
    path('appliances/', ApplianceView.as_view(), name='appliance_view'),
    path('serviceprovider/prefprov/', PreferredProviderView.as_view(), name='pref_provider_view'),
    path('serviceprovider/prefprov/<str:inPmId>/', PreferredProviderView.as_view(), name='request_get'),
    path('serviceprovider/', ServiceProviderView.as_view(), name='service_provider_view'),
    path('serviceprovider/<int:inPmId>/', ServiceProviderView.as_view(), name='pprovider_view'),
    path('servicerequest/', ServiceRequestView.as_view(), name='service_request_view'),
    path('servicerequest/<str:inPropId>/', ServiceRequestView.as_view(), name='request_get'),
    path('servicerequest/pm/<str:inPmId>/', GetServiceRequestPmView.as_view(), name='request_get_pm'),
    path('login/', LoginView.as_view(), name='login'),
    path('apikey/', APIKeyView.as_view(), name='apikey'),
]
