# home_crud/models.py
from django.db import models

class HomeConfig(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    carousel_images = models.JSONField(default=list)  # lista de URLs
    features = models.JSONField(default=list)         # lista de objetos {icon, title, text}

    def __str__(self):
        return "Configuración del Home"

class CarouselImage(models.Model):
    image = models.ImageField(upload_to="carousel/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Imagen {self.id}"

