# Generated by Django 5.0.2 on 2024-04-18 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_dif', '0004_notaevolucionodonto_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notaevolucionodonto',
            name='fecha',
            field=models.DateField(auto_now_add=True),
        ),
    ]
