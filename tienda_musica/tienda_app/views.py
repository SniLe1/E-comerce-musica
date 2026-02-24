from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Producto
from .serializers import ProductoSerializer
from django.db.models import Q

from rest_framework import viewsets
from django.db.models import Q
from .models import Producto
from .serializers import ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = super().get_queryset()

        formato = self.request.query_params.get('formato')
        search = self.request.query_params.get('search')

        if formato:
            queryset = queryset.filter(formato=formato)

        if search:
            queryset = queryset.filter(
                Q(titulo__icontains=search) |
                Q(artista__icontains=search)
            )

        return queryset


