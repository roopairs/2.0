from django.urls import path

from .views import LoginView, RegisterView, TenantUpdate


urlpatterns = [
    path('login/', LoginView.as_view(), name='tenant_login'),
    path('register/', RegisterView.as_view(), name='tenant_register'),
    path('update/', TenantUpdate.as_view(), name='tenant_update'),
]
