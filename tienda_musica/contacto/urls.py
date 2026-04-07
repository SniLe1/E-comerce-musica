from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet

router = DefaultRouter()
router.register(r'contacto', ContactoViewSet)

urlpatterns = router.urls