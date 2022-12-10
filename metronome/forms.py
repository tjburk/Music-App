from django import forms
from django.utils.safestring import mark_safe


class ClickForm(forms.Form):
    # Time Signature
    beats = forms.IntegerField(max_value=16,
                               min_value=1,
                               label="Time Signature",
                               initial=4, )
    division = forms.ChoiceField(choices=[(1, "1"), (2, "2"), (4, "4"), (8, "8"), (16, "16"), ],
                                 label="/",
                                 label_suffix="",
                                 initial=4, )

    # Tempo
    bpm = forms.IntegerField(max_value=500,
                             min_value=10,
                             label=mark_safe("<br / >Tempo"),
                             initial=120, )

    # Rate
    measures = forms.IntegerField(max_value=64,
                                  min_value=1,
                                  label=mark_safe("<br / >Rate"),
                                  initial=1, )
