import time

from django.shortcuts import render
from .models import TimeSignature, Tempo, Rate
from .forms import ClickForm
from playsound import playsound


def metronome(request, time_signature, tempo, rate):
    click_path = "C:/Users/ty_bu/Documents/Programming/Django/Personal Projects/internal_tempo/internal_tempo/static/sounds/click.wav"
    playsound(click_path)
    time.sleep(2)
    playsound(click_path)


def set_up_home_form(request):
    if request.method == 'POST':
        # Create a form instance and populate it with data from the request
        click_form = ClickForm(request.POST)

        if click_form.is_valid():
            # Use data from the request to create or get new instances of click variables
            #############################################################################
            # Time Signature
            time_signature_beats = click_form.cleaned_data.get("beats")
            time_signature_division = click_form.cleaned_data.get("division")
            time_signature = TimeSignature.objects.get_or_create(beats=time_signature_beats,
                                                                 division=time_signature_division)

            # Tempo
            tempo_bpm = click_form.cleaned_data.get("bpm")
            tempo = Tempo.objects.get_or_create(bpm=tempo_bpm)

            # Rate
            rate_measures = click_form.cleaned_data.get("measures")
            rate = Rate.objects.get_or_create(measures=rate_measures)
            #############################################################################
            metronome(request, time_signature, tempo, rate)

            return render(request, 'internal_tempo/home.html', {'click_form': click_form})

    else:
        click_form = ClickForm()

    return render(request, 'internal_tempo/home.html', {'click_form': click_form})
