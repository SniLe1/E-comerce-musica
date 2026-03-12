from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import HomeConfig, CarouselImage
from .serializers import HomeConfigSerializer, CarouselImageSerializer

class HomeConfigView(APIView):
    def get(self, request):
        config, created = HomeConfig.objects.get_or_create(id=1)
        serializer = HomeConfigSerializer(config)
        
        return Response(serializer.data)
    
    def put(self, request):
        config = HomeConfig.objects.get(id=1)
        serializer = HomeConfigSerializer(config, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    
class CarouselImageView(APIView):
    def get(self, request):
        images = CarouselImage.objects.all()
        serializer = CarouselImageSerializer(images, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CarouselImageSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    
class CarouselImageDeleteView(APIView):
    def delete(self, request, pk):
        image = CarouselImage.objects.get(id=pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

    
    