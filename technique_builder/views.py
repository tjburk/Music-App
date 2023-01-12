from django.shortcuts import render
from .models import Exercise
from .forms import ExerciseForm
from django.contrib import messages


def display_exercises(request):
    # If user just filled out exercise form, save the new exercise and add it to the current ones
    if request.method == "POST":
        exercise_form = ExerciseForm(request.POST)
        if exercise_form.is_valid():
            new_exercise = exercise_form.save(commit=False)  # Don't put into the database yet
            new_exercise.current_bpm = new_exercise.starting_bpm  # Set current bpm to starting bpm
            new_exercise.user = request.user
            new_exercise.save()

            messages.success(request, 'Exercise successfully added!')
        else:
            messages.error(request, 'Error saving exercise form')

    # Send all user's exercises to template
    exercises = Exercise.objects.filter(user=request.user)

    return render(request, "technique_builder/technique_builder.html", {'exercises': exercises})


def create_exercise(request):
    exercise_form = ExerciseForm()

    return render(request, "technique_builder/create_exercise.html", {'exercise_form': exercise_form})
