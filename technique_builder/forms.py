from django import forms
from .models import Exercise


class ExerciseForm(forms.ModelForm):
    class Meta:
        model = Exercise
        fields = ['name', 'sets', 'starting_bpm']
        labels = {'starting_bpm': 'Bpm'}
        help_texts = {}
