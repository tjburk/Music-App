from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="music_app/home.html"), name="music_app"),

    # Internal Tempo
    path('internaltempo/', TemplateView.as_view(template_name="internal_tempo/internal_tempo.html"),
         name="internal_tempo"),

    # Technique Builder
    path('techniquebuilder/', include("technique_builder.urls")),

    # Interval Recognition
    path('intervalrecognition/', TemplateView.as_view(template_name="interval_recognition/interval_recognition.html"),
         name="interval_recognition"),

    path('accounts/', include('allauth.urls'), name="accounts"),
    path('admin/', admin.site.urls),
]
