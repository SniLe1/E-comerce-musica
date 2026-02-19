from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    formato_display = serializers.CharField(
        source='get_formato_display',
        read_only=True
    )
    
    class Meta:
        model = Producto
        fields = '__all__'
        
        
        
