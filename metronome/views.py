import time

from django.shortcuts import render
from .models import TimeSignature
from .forms import ClickForm


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
            tempo = click_form.cleaned_data.get("bpm")

            # Rate
            rate = click_form.cleaned_data.get("measures")
            #############################################################################

            return render(request, 'internal_tempo/home.html', {'click_form': click_form,
                                                                'time_signature': time_signature,
                                                                'tempo': tempo,
                                                                'rate': rate})

    else:
        click_form = ClickForm()

    return render(request, 'internal_tempo/home.html', {'click_form': click_form})
