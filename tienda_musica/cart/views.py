from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Carrito, CarritoItem
from .serializers import CarritoSerializer, CarritoItemSerializer
from tienda_app.models import Producto
from rest_framework.permissions import IsAuthenticated

class CarritoViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        carrito, created = Carrito.objects.get_or_create(usuario=request.user)
        serializer = CarritoSerializer(carrito, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))
        carrito, _ = Carrito.objects.get_or_create(usuario=request.user)
        producto = Producto.objects.get(id=producto_id)

        item, created = CarritoItem.objects.get_or_create(carrito=carrito, producto=producto)
        if not created:
            item.cantidad += cantidad
        else:
            item.cantidad = cantidad
        item.save()

        serializer = CarritoSerializer(carrito)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        producto_id = request.data.get('producto_id')
        carrito = Carrito.objects.get(usuario=request.user)
        CarritoItem.objects.filter(carrito=carrito, producto_id=producto_id).delete()
        serializer = CarritoSerializer(carrito)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_quantity(self, request):
        producto_id = request.data.get('producto_id')
        cantidad = int(request.data.get('cantidad', 1))
        
        try:
            carrito = Carrito.objects.get(usuario=request.user)
            item = CarritoItem.objects.get(producto_id=producto_id)
            
            if cantidad <= 0:
                item.delete()
            else:
                item.cantidad = cantidad
                item.save()
            serializer = CarritoSerializer(carrito, context={'request': request})
            return Response(serializer.data)
        
        except (Carrito.DoesNotExist, CarritoItem.DoesNotExist):
            return Response({'error': 'Carrito o item no encontrado'}, status=status.HTTP_404_NOT_FOUND)