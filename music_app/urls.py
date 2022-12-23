"""music_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.music_app, name='music_app')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='music_app')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('/', TemplateView.as_view(template_name="music_app/home.html"), name="music_app"),
    path('internaltempo/', TemplateView.as_view(template_name="internal_tempo/internal_tempo.html"), name="internal_tempo"),
    path('accounts/', include('allauth.urls'), name="accounts"),
    path('admin/', admin.site.urls),
]
