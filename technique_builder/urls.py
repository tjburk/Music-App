from django.urls import path, include
from django.views.generic import TemplateView
from .views import display_exercises


urlpatterns = [
    path('', display_exercises, name="technique_builder"),
    path('createexercise/', TemplateView.as_view(template_name="technique_builder/create_exercise.html"),
         name="create_exercise"),
]