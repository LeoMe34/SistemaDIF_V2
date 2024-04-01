# Importación del modelo de usuario proporcionado por Django
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from django.contrib.auth import get_user_model
from sistema_dif.models import (
    Empleado,
    FichaTecnicaEnfermeria,
    FichaTecnicaPsicologia,
    AnexoDocumentos,
    HistorialMedico,
    HistorialOdonto,
    NotaEvolucionOdonto,
    NotaMedica,
    Paciente,
    Receta,
)


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = ("username", "password", "email", "nombre", "apellidoPaterno",
                  "apellidoMaterno", "cedula_profesional", "no_trabajador", "ocupacion", "telefono")
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "allow_blank": False,
                # Validador para asegurar que no haya duplicados en el campo de correo electrónico
                "validators": [
                    validators.UniqueValidator(
                        Empleado.objects.all(), "Ya existe un usuario con ese correo"
                    )
                ],
            },
        }

    def create(self, validated_data):
        return Empleado.objects.create(**validated_data)


"""
        username = validated_data.get("username")
        password = validated_data.get("password")
        email = validated_data.get("email")
        nombre = validated_data.get("nombre")
        apellidoPaterno = validated_data.get("apellidoPaterno")
        apellidoMaterno = validated_data.get("apellidoMaterno")
        cedula_profesional = validated_data.get("cedula_profesional")
        no_trabajador = validated_data.get("no_trabajador")
        ocupacion = validated_data.get("ocupacion")
        telefono = validated_data.get("telefono")

        user = Empleado.objects.create(
            username=username,
            password=password,
            email=email,
            nombre=nombre,
            apellidoPaterno=apellidoPaterno,
            apellidoMaterno=apellidoMaterno,
            cedula_profesional=cedula_profesional,
            no_trabajador=no_trabajador,
            ocupacion=ocupacion,
            telefono=telefono,
        )

        return user

"""
"""
 datosPersonales = models.JSONField()  # nombre, apellidoPaterno, apellidoMaterno
    cedula_profesional = models.CharField(max_length=30, default="", unique=False)
    no_trabajador = models.CharField(
        max_length=30, default="", primary_key=True, unique=True
    )
    ocupacion = models.TextField(max_length=20, default="", unique=False)
    telefono = models.CharField(max_length=10, default="", unique=False)

"""


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class FichaTecnicaESerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaTecnicaEnfermeria
        fields = "__all__"


class FihaTecnicaPSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaTecnicaPsicologia
        fields = "__all__"


class AnexoDocumentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnexoDocumentos
        fields = "__all__"


class HistorialMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialMedico
        fields = "__all__"


class HistorialOdontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialOdonto
        fields = "__all__"


class NotaEvolucionOdontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaEvolucionOdonto
        fields = "__all__"


class NotaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaMedica
        fields = "__all__"


class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = "__all__"
