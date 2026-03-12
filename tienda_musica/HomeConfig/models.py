from django.db import models

class HomeConfig(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    features = models.JSONField(default=list)
    
    def __str__(self):
        return "Home Configuration"
    
class CarouselImage(models.Model):
    image = models.ImageField(upload_to="carousel/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.image.url
