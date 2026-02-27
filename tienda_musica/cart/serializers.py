from rest_framework import serializers
from .models import Carrito, CarritoItem
from tienda_app.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'titulo', 'artista', 'formato', 'precio', 'imagen', 'slug']

class CarritoItemSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CarritoItem
        fields = ['id', 'producto', 'cantidad', 'subtotal']

    def get_subtotal(self, obj):
        return obj.subtotal()

class CarritoSerializer(serializers.ModelSerializer):
    items = CarritoItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'items', 'total']

    def get_total(self, obj):
        return obj.total()
