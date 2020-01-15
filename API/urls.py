from django.urls import path
from . import views

urlpatterns = [
    path('login/tenant/', views.tenantLogin, name='tenant login'),
    path('login/pm/', views.pmLogin, name='property manager login'),
    path('register/tenant/', views.tenantRegister, name='tenant registration'),
    path('register/pm/', views.pmRegister, name='property manager registration'),
]
