from django.urls import path
from .views import *

urlpatterns = [

    path("config/", HomeConfigView.as_view()),

    path("images/", CarouselImagesView.as_view()),

    path("images/<int:pk>/", CarouselImageDeleteView.as_view()),

]