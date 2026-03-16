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

        print("FILES:", request.FILES)

        if "image" not in request.FILES:
            return Response(
                {"error": "No image uploaded"},
                status=400
            )

        serializer = CarouselImageSerializer(
            data=request.data,
            context={"request": request}   # 👈 IMPORTANTE
        )

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

        # buscar sección hero
        section = HomeSection.objects.filter(type="hero").first()

        # si no existe la creamos
        if not section:
            section = HomeSection.objects.create(
                type="hero",
                order=1,
                is_active=True
            )

        # buscar hero asociado
        hero = HeroSection.objects.filter(section=section).first()

        # si no existe lo creamos
        if not hero:
            hero = HeroSection.objects.create(
                section=section,
                title="",
                description="",
                button_text=""
            )
            
        serializer = HeroSerializer(
            hero,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class FeaturesView(APIView):

    # LISTAR FEATURES
    def get(self, request):

        section, _ = HomeSection.objects.get_or_create(type="features")
        features = Feature.objects.filter(section=section).order_by("order")
        serializer = FeatureSerializer(features, many=True)
        return Response(serializer.data)


    # CREAR FEATURE
    def post(self, request):

        section, _ = HomeSection.objects.get_or_create(type="features")
        serializer = FeatureSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(section=section)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class FeatureDetailView(APIView):
    
    # EDITAR
    def put(self, request, pk):
        feature = Feature.objects.get(id=pk)
        serializer = FeatureSerializer(feature, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


    # BORRAR
    def delete(self, request, pk):
        feature = Feature.objects.get(id=pk)
        feature.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    