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

@api_view(["POST"])
def responder_contacto(request, pk):
    try:
        mensaje = Contacto.objects.get(pk=pk)
    except Contacto.DoesNotExist:
        return Response({"error": "Mensaje no encontrado"}, status=404)

    respuesta = request.data.get("respuesta")

    if not respuesta or not respuesta.strip():
        return Response({"error": "La respuesta no puede estar vacía"}, status=400)

    email_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #1abc9c;">Respuesta a tu mensaje</h2>
        <p>Hola <strong>{mensaje.nombre}</strong>,</p>
        <p>Gracias por contactarnos. Aquí tienes nuestra respuesta:</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; border-left: 4px solid #1abc9c; margin: 15px 0;">
            {respuesta.replace(chr(10), '<br>')}
        </div>
        <p>Saludos,<br><strong>Tienda de Música</strong></p>
    </body>
    </html>
    """

    send_mail(
        subject=f"Respuesta a tu mensaje - Tienda de Música",
        message=respuesta,
        from_email="gonzaandres1251@gmail.com",
        recipient_list=[mensaje.email],
        html_message=email_html,
        fail_silently=False,
    )

    mensaje.respondido = True
    mensaje.save()

    return Response({"success": "Respuesta enviada correctamente"})
