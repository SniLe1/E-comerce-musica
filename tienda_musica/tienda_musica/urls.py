from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from users.views import CustomTokenObtainPairView   

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Tienda
    path('api/tienda/', include('tienda_app.urls')),
    
    # Usuarios
    path('api/users/', include('users.urls')),

    # JWT endpoints
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Carrito endpoints
    path('api/cart/', include('cart.urls')),
    
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)