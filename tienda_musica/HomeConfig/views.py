from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import HomeSection, HeroSection, Feature, CarouselImage
from .serializers import HeroSerializer, FeatureSerializer, CarouselImageSerializer

class CarouselImagesView(APIView):
    def get(self, request):
        images = CarouselImage.objects.all()
        serializer = CarouselImageSerializer(
            images,
            many=True,
            context={"request": request}
        )
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CarouselImageSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)
    
class CarouselImageDeleteView(APIView):
    def delete(self, request, pk):
        image = CarouselImage.objects.get(id=pk)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class HomePageView(APIView):

    def get(self, request):

        # HERO
        hero = HeroSection.objects.first()
        hero_data = HeroSerializer(hero).data if hero else None

        # FEATURES
        features = Feature.objects.all().order_by("order")
        features_data = FeatureSerializer(features, many=True).data

        # CAROUSEL
        images = CarouselImage.objects.all()
        carousel_data = CarouselImageSerializer(
            images,
            many=True,
            context={"request": request}
        ).data

        data = {
            "hero": hero_data,
            "features": features_data,
            "carousel": carousel_data
        }

        return Response(data)
    
class HeroUpdateView(APIView):
    def put(self, request):

        hero = HeroSection.objects.first()
        serializer = HeroSerializer(
            hero,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    
    