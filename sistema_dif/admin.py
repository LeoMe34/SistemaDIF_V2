from django.contrib import admin
from .models import *
from django.contrib.auth.models import User

baseDatos = (
    Empleado,
    Paciente,
    AnexoDocumentos,
    FichaTecnicaEnfermeria,
    FichaTecnicaPsicologia,
    HistorialMedico,
    HistorialOdonto,
    NotaEvolucionOdonto,
    NotaMedica,
    Receta,
    FichaTecnicaMedica,
)

admin.site.register(baseDatos)

# Register your models here.
