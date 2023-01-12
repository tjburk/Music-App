from django import forms
from .models import Exercise


class ExerciseForm(forms.ModelForm):
    class Meta:
        model = Exercise
        fields = ['name', 'description', 'sets', 'starting_bpm', 'dynamic']
        labels = {'starting_bpm': 'Bpm'}
        help_texts = {'name': 'A name for the exercise',
                      'description': 'A description for the exercise',
                      'sets': 'How many repetitions of the exercise per completion',
                      'starting_bpm': 'Initial bpm of the exercise',
                      'dynamic': 'If selected, the bpm will slightly increase upon each successful completion of the exercise'}
