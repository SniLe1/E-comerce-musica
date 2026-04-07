from django.db import models

# Create your models here.
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()

    leido = models.BooleanField(default=False)
    respondido = models.BooleanField(default=False)

    creado_en = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nombre} - {self.email}"