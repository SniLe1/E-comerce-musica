from rest_framework import serializers
from .models import Producto
from django.utils.text import slugify

class ProductoSerializer(serializers.ModelSerializer):
    formato_display = serializers.CharField(
        source='get_formato_display',
        read_only=True
    )
    
    class Meta:
        model = Producto
        fields = '__all__'
        
    def update(self, instance, validated_data):
        instance.titulo = validated_data.get('titulo', instance.titulo)
        
        #Actualiza slug si el título ha cambiado
        instance.slug = slugify(instance.titulo)
        
        instance.artista = validated_data.get("artista", instance.artista)
        instance.descripcion = validated_data.get("descripcion", instance.descripcion)
        instance.formato = validated_data.get("formato", instance.formato)
        instance.precio = validated_data.get("precio", instance.precio)
        instance.stock = validated_data.get("stock", instance.stock)
        
        instance.save()
        return instance
        
        
        
