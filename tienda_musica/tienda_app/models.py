from django.db import models

class Producto(models.Model):
    titulo = models.CharField(max_length=100)
    artista = models.CharField(max_length=100)
    descripcion = models.TextField()
    formato = models.CharField(max_length=20) # fisico o digital
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/') #Donde se van a guardar las imagenes
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.titulo
