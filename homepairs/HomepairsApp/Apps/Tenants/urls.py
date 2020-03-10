from django.urls import path

from .views import LoginView, RegisterView, TenantMove


urlpatterns = [
    path('login/', LoginView.as_view(), name='tenant_login'),
    path('register/', RegisterView.as_view(), name='tenant_register'),
    path('move/', TenantMove.as_view(), name='tenant_move'),
]
