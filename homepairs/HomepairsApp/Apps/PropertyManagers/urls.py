from django.urls import path

from .views import LoginView, RegisterView, TenantControlView


urlpatterns = [
    path('login/', LoginView.as_view(), name='pm_login'),
    path('register/', RegisterView.as_view(), name='pm_register'),
    path('tenantEdit/', TenantControlView.as_view(), name='ten_edit')
]
