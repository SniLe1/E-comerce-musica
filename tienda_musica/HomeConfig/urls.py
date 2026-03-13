from django.urls import path
from .views import HomePageView, CarouselImagesView, CarouselImageDeleteView, HeroUpdateView, FeaturesView, FeatureDetailView

urlpatterns = [

    path("", HomePageView.as_view()),
    path("carousel/", CarouselImagesView.as_view()),
    path("carousel/delete/<int:pk>/", CarouselImageDeleteView.as_view()),
    path("hero/", HeroUpdateView.as_view()),
    path("features/", FeaturesView.as_view())
]