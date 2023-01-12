from django.db import models
from django.conf import settings


class Exercise(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    sets = models.IntegerField()
    starting_bpm = models.IntegerField()
    current_bpm = models.IntegerField()
    completions = models.IntegerField(default=0)
    dynamic = models.BooleanField(default=False)

    def __str__(self):
        return self.name
