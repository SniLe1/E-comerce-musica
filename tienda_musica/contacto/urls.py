from django.db import router
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet, enviar_contacto

urlpatterns = [
    path('', enviar_contacto, name='enviar_contacto'),
]