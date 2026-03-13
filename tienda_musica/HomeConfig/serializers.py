from rest_framework import serializers
from .models import HeroSection, Feature, CarouselImage


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = ["title", "description", "button_text"]


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ["id", "icon", "title", "text", "order"]


class CarouselImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CarouselImage
        fields = ["id", "image_url", "image"]

    def get_image_url(self, obj):
        if not obj.image:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url