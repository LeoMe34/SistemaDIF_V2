# Generated by Django 5.0.2 on 2024-04-01 01:14

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('nombre', models.CharField(default='', max_length=30)),
                ('apellidoPaterno', models.CharField(default='', max_length=30)),
                ('apellidoMaterno', models.CharField(default='', max_length=30)),
                ('cedula_profesional', models.CharField(default='', max_length=30)),
                ('no_trabajador', models.CharField(default='', max_length=30, primary_key=True, serialize=False, unique=True)),
                ('ocupacion', models.TextField(default='', max_length=20)),
                ('telefono', models.CharField(default='', max_length=10)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('curp', models.CharField(default='', max_length=18)),
                ('no_expediente', models.CharField(default='', max_length=168, primary_key=True, serialize=False)),
                ('datosPersonalesPacient', models.JSONField()),
                ('datosContactoPacient', models.JSONField()),
                ('datosDireccionPacient', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='HistorialMedico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_elaboracion', models.DateField(auto_now_add=True)),
                ('referenciaMed', models.JSONField()),
                ('interrogatorio', models.JSONField()),
                ('exploracionFisica', models.JSONField()),
                ('diagnostico', models.JSONField()),
                ('informante', models.CharField(blank=True, default='', max_length=15)),
                ('datosFamiliares', models.JSONField()),
                ('antHerediPatM', models.JSONField()),
                ('antPersoPatM', models.JSONField()),
                ('antPersoNoPatM', models.JSONField()),
                ('ginecobMed', models.JSONField()),
                ('estudiosExter', models.JSONField()),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.empleado')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='HistorialOdonto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_elaboracion', models.DateField(auto_now_add=True)),
                ('referencia', models.JSONField()),
                ('aparatosSistemas', models.JSONField()),
                ('padecimiento_actual', models.TextField(blank=True, default='', max_length=100)),
                ('habitos_exteriores', models.TextField(blank=True, default='', max_length=100)),
                ('cabeza', models.JSONField()),
                ('cuello_odont', models.CharField(blank=True, default='', max_length=50)),
                ('antHerediPato', models.JSONField()),
                ('antPersonPato', models.JSONField()),
                ('personNoPato', models.JSONField()),
                ('antGinecob', models.JSONField()),
                ('odontograma', models.BinaryField(blank=True, max_length=40, null=True)),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.empleado')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='NotaEvolucionOdonto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diagnostico', models.TextField(default='', max_length=100)),
                ('tratamiento', models.TextField(default='', max_length=100)),
                ('notas', models.TextField(default='', max_length=100)),
                ('plan', models.TextField(default='', max_length=100)),
                ('resumen_consulta', models.TextField(default='', max_length=100)),
                ('histlOdonto', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.historialodonto')),
            ],
        ),
        migrations.CreateModel(
            name='NotaMedica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diagnostico', models.TextField(default='', max_length=100)),
                ('tratamiento', models.TextField(default='', max_length=100)),
                ('observaciones', models.TextField(blank=True, default='', max_length=100)),
                ('fecha_consulta', models.DateField(auto_now_add=True)),
                ('hora_consulta', models.TimeField()),
                ('servicio', models.CharField(blank=True, default='', max_length=50)),
                ('histMedic', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.historialmedico')),
            ],
        ),
        migrations.CreateModel(
            name='FichaTecnicaPsicologia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_visita', models.DateField(auto_now_add=True)),
                ('visita', models.JSONField()),
                ('tratamiento', models.JSONField()),
                ('diagnostico', models.JSONField()),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.empleado')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='FichaTecnicaEnfermeria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(auto_now_add=True)),
                ('signosVitales', models.JSONField()),
                ('datosFisicos', models.JSONField()),
                ('servicio_enfermeria', models.CharField(default='', max_length=30)),
                ('trabajador', models.BooleanField(blank=True, null=True)),
                ('datosDemograficos', models.JSONField()),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.empleado')),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='AnexoDocumentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documento', models.BinaryField(blank=True, max_length=40, null=True)),
                ('paciente', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='Receta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medicamento', models.JSONField()),
                ('notMed', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='sistema_dif.notamedica')),
            ],
        ),
    ]
