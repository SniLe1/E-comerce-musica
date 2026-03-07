from django.urls import path
from .views import AdminHomeView, CarouselImageUploadView


urlpatterns = [
    path("admin/home/", AdminHomeView.as_view(), name="admin_home"),
    path("admin/home/upload/", CarouselImageUploadView.as_view(), name="carousel_upload"),
    
]
