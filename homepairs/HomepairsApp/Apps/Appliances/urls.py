from django.urls import path

from . import views


urlpatterns = [
                path('appliance/view/', views.viewAppliance, name='view_appliance'),
                path('appliance/update/', views.updateAppliance, name='update_appliance'),
                path('appliance/delete/', views.deleteAppliance, name='delete_appliance'),
]
