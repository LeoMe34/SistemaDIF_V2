# Generated by Django 5.0.3 on 2024-08-06 21:46

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_dif', '0012_receta_fecha'),
    ]

    operations = [
        migrations.AddField(
            model_name='fichatecnicamedodonto',
            name='fecha',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
