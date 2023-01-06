from django.db import models
from django.conf import settings


class Exercise(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    sets = models.IntegerField()
    starting_bpm = models.IntegerField()
    current_bpm = models.IntegerField(default=starting_bpm)
    mistakes = models.IntegerField(default=0)

    def __str__(self):
        return self.name
