from django.shortcuts import render
from .models import Contacto
from django.core.mail import send_mail
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ContactoSerializer

class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all().order_by("-creado_en")
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

def responder_contacto(request, pk):
    mensaje = Contacto.objects.get(pk=pk)
    respuesta = request.data.get("respuesta")
    
    send_mail(
        subject=f"Respuesta a tu mensaje: {mensaje.nombre}",
        message=respuesta,
        from_email="gonzaandres1251@gmail.com",
        recipient_list=[mensaje.email],
    )
    
    mensaje.respondido = True
    mensaje.save()

    return Response({"success": "Respuesta enviada"})
