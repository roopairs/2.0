from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from verticalAPI import views

urlpatterns = [
    url(r'^verticalAPI/$', views.testVert, name='verticalTest'),
]
