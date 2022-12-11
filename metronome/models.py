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
