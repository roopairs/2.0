from django.urls import path

from . import views


urlpatterns = [
                path('create/', views.createAppliance, name='create_appliance'),
                path('view/', views.viewAppliance, name='view_appliance'),
                path('update/', views.updateAppliance, name='update_appliance'),
                path('delete/', views.deleteAppliance, name='delete_appliance'),
]
