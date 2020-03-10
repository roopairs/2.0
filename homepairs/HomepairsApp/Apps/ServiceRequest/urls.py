from django.urls import path

from .views import ServiceRequestView


urlpatterns = [
                path('.*', ServiceRequestView.as_view(), name='service_request_view'),
]
