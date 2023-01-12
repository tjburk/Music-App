# Generated by Django 4.1.2 on 2023-01-12 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('technique_builder', '0002_alter_exercise_current_bpm_alter_exercise_mistakes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='mistakes',
        ),
        migrations.AddField(
            model_name='exercise',
            name='completions',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='exercise',
            name='description',
            field=models.TextField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='current_bpm',
            field=models.IntegerField(),
        ),
    ]
