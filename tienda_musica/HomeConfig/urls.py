from django.urls import path
from .views import *

urlpatterns = [

    path("home/", HomeConfigView.as_view()),

    path("home/images/", CarouselImagesView.as_view()),

    path("home/images/<int:pk>/", CarouselImageDeleteView.as_view()),

]