from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/tenant/', views.tenantRegister, name='tenant registration'),
    path('register/pm/', views.pmRegister, name='property manager registration'),
    path('property/create/', views.createProperty, name='Adding a property'),
    path('property/view/', views.viewProperty, name='View a property'),
    path('setUpTests/', views.setUpTests, name='setting up tests'),
    path('tearDownTests/', views.tearDownTests, name='tear down tests'),
]
