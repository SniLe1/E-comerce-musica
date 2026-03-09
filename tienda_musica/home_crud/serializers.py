# home_crud/serializers.py
from rest_framework import serializers
from .models import CarouselImage, HomeConfig

class HomeConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeConfig
        fields = ["title", "description", "features", "carousel_images"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        urls = []
        for img in data.get("carousel_images", []):
            if img.startswith("http"):
                urls.append(img)
            else:
                urls.append(request.build_absolute_uri(img))
        data["carousel_images"] = urls
        return data


class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = ["id", "image", "uploaded_at"]
