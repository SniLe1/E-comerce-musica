# home_crud/serializers.py
from rest_framework import serializers
from .models import CarouselImage, HomeConfig

class HomeConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeConfig
        fields = ["title", "description", "carousel_images", "features"]

class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = ["id", "image", "uploaded_at"]
