from django.urls import include, include, path
from rest_framework.routers import DefaultRouter
from .views import CarritoViewSet

router = DefaultRouter()
router.register(r'carrito', CarritoViewSet, basename='carrito')

urlpatterns = [ 
    path('', include(router.urls)), 
]
