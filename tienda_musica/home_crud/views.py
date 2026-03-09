# home_crud/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import CarouselImage, HomeConfig
from .serializers import CarouselImageSerializer, HomeConfigSerializer

class PublicHomeView(APIView):
    permission_classes = []  # abierto

    def get(self, request):
        config, _ = HomeConfig.objects.get_or_create(pk=1)
        serializer = HomeConfigSerializer(config, context={"request": request})
        return Response(serializer.data)


class AdminHomeView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        config, _ = HomeConfig.objects.get_or_create(pk=1)
        serializer = HomeConfigSerializer(config, context={"request": request})
        return Response(serializer.data)

    def put(self, request):
        config, _ = HomeConfig.objects.get_or_create(pk=1)
        serializer = HomeConfigSerializer(config, data=request.data, context={"request": request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarouselImageUploadView(APIView):
    permission_classes = [permissions.IsAdminUser]  # solo admin

    def post(self, request):
        serializer = CarouselImageSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            image_url = request.build_absolute_uri(obj.image.url)
            return Response({"image_url": image_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
