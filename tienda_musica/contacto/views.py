from django.shortcuts import render
from .models import Contacto
from django.core.mail import send_mail
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ContactoSerializer

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

@api_view(["POST"])
def enviar_contacto(request):
    nombre = request.data.get("nombre")
    email = request.data.get("email")
    mensaje = request.data.get("mensaje")

    if not nombre or not email or not mensaje:
        return Response({"error": "Faltan datos"}, status=400)

    # 🔥 Guardar en DB
    Contacto.objects.create(
        nombre=nombre,
        email=email,
        mensaje=mensaje
    )

    # 📩 Enviar correo
    send_mail(
        subject=f"Nuevo mensaje de {nombre}",
        message=mensaje,
        from_email=email,
        recipient_list=["gonzaandres1251@gmail.com"],
    )

    return Response({"success": "Mensaje enviado"})
