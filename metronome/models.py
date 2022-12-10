from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class TimeSignature(models.Model):
    beats = models.IntegerField(default=4,
                                validators=[
                                    MaxValueValidator(16),
                                    MinValueValidator(1)
                                ])
    division = models.IntegerField(default=4,
                                   choices=[
                                       (1, "1"),
                                       (2, "2"),
                                       (4, "4"),
                                       (8, "8"),
                                       (16, "16"),
                                   ])

    def __str__(self):
        return "%s/%s" % (self.beats, self.division)


class Tempo(models.Model):
    bpm = models.IntegerField(default=120,
                              validators=[
                                  MaxValueValidator(500),
                                  MinValueValidator(10)
                              ])

    def __str__(self):
        return "%sbpm" % self.bpm


class Rate(models.Model):
    measures = models.IntegerField(default=1,
                                   validators=[
                                       MaxValueValidator(64),
                                       MinValueValidator(1),
                                   ])

    def __str__(self):
        if self.measures == 1:
            return "Every measure"
        return "Every %s measures" % self.measures
