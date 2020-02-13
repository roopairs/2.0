from django.urls import path

from . import views


urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/tenant/', views.tenantRegister, name='tenant_registration'),
    path('register/pm/', views.pmRegister, name='pm_registration'),
    path('property/create/', views.createProperty, name='create_prop'),
    path('property/view/', views.viewProperty, name='view_prop'),
    path('property/update/', views.updateProperty, name='update_prop'),
    path('appliance/create/', views.createAppliance, name='create_appliance'),
    path('setUpTests/', views.setUpTests, name='setup'),
    path('tearDownTests/', views.tearDownTests, name='teardown'),
]
