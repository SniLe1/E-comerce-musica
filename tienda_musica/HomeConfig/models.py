from django.db import models

class HomeSection(models.Model):

    SECTION_TYPES = [
        ("hero", "Hero"),
        ("features", "Features"),
        ("latest_products", "Latest Products"),
    ]

    type = models.CharField(max_length=50, choices=SECTION_TYPES)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.type} ({self.order})"
    
    
class HeroSection(models.Model):

    section = models.OneToOneField(
        HomeSection,
        on_delete=models.CASCADE,
        related_name="hero"
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=100)    
    

class Feature(models.Model):

    section = models.ForeignKey(
        HomeSection,
        on_delete=models.CASCADE,
        related_name="features"
    )

    icon = models.CharField(max_length=10)
    title = models.CharField(max_length=100)
    text = models.TextField()
    order = models.IntegerField(default=0)
    

class CarouselImage(models.Model):
    image = models.ImageField(upload_to="carousel/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.image.name if self.image else "No image"
