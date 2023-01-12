from django.urls import path, include
from .views import display_exercises, create_exercise


urlpatterns = [
    path('', display_exercises, name="technique_builder"),
    path('createexercise/', create_exercise, name="create_exercise"),
]