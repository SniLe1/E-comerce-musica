from rest_framework import serializers
from .models import HomeConfig, CarouselImage


class HomeConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = HomeConfig
        fields = ["title", "description", "features"]

class CarouselImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CarouselImage
        fields = ["id", "image", "image_url", "uploaded_at"]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url