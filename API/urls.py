from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/tenant/', views.tenantRegister, name='tenant registration'),
    path('register/pm/', views.pmRegister, name='property manager registration'),
    path('register/pmRoo/', views.pmRegister, name='property manager registration'),
]
