from django.db import router
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet, enviar_contacto, responder_contacto

router = DefaultRouter()
router.register(r'', ContactoViewSet)

urlpatterns = [
    # 👉 este lo usa tu formulario
    path('enviar/', enviar_contacto, name='enviar_contacto'),

    # 👉 este lo usarás para responder
    path('responder/<int:pk>/', responder_contacto),
]

# 👉 esto agrega /contacto/contacto/
urlpatterns += router.urls