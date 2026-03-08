from django.urls import path
from .views import AdminHomeView, CarouselImageUploadView, PublicHomeView


urlpatterns = [
    path("admin/home/", AdminHomeView.as_view(), name="admin_home"),
    path("public/home/", PublicHomeView.as_view(), name="public_home"),
    path("admin/home/upload/", CarouselImageUploadView.as_view(), name="carousel_upload"),
    
]
