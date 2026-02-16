from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings

from django.utils.http import urlsafe_base64_decode
from django.http import HttpResponse

from django.contrib.auth import get_user_model



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        activation_link = f"http://localhost:3000/activate/{uid}/{token}/"

        send_mail(
            subject="Activa tu cuenta",
            message=f"Hola {user.username},\n\nPor favor haz clic en el siguiente enlace para activar tu cuenta:\n{activation_link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


User = get_user_model()

def activate_account(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except:
        return HttpResponse("Link inválido ❌")

    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse("Cuenta activada correctamente 🎉")
    else:
        return HttpResponse("Token inválido o expirado ❌")
