from django.db import models
from django.utils.text import slugify

class Producto(models.Model):

    FORMATO_CHOICES = [
        ('vinilo', 'Vinilo'),
        ('cd', 'CD'),
        ('digital', 'Digital'),
    ]

    titulo = models.CharField(max_length=100)
    artista = models.CharField(max_length=100)
    descripcion = models.TextField()
    formato = models.CharField(
        max_length=10,
        choices=FORMATO_CHOICES
    )
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/')
    stock = models.IntegerField(default=0)
    slug = models.SlugField(unique=True, blank=True, null=True)
    

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.titulo)
            slug = base_slug
            counter = 1
            while Producto.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)



    def __str__(self):
        return self.titulo
