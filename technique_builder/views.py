from django.shortcuts import render
from .models import Exercise


def display_exercises(request):
    # Send current user's exercises to the template
    exercises = Exercise.objects.filter(user=request.user)
    return render(request, "technique_builder/technique_builder.html", {'exercises': exercises})
