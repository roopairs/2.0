from django.urls import path

from .views import PropertyView


urlpatterns = [
    path('.*', PropertyView.as_view(), name='property_view'),
]
