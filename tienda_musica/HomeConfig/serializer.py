from rest_framework import serializers
from .models import HomeConfig, CarouselImage

class HomeConfigSerializer(serializers.ModelSerializers):
    class Meta:
        model = HomeConfig
        fields = "__all__"
        
class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = "__all__"