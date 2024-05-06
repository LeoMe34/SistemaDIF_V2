# Importación del modelo de usuario proporcionado por Django
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from sistema_dif.models import (
    Empleado,
    FichaTecnicaEnfermeria,
    FichaTecnicaPsicologia,
    HistorialMedico,
    HistorialOdonto,
    NotaEvolucionOdonto,
    NotaMedica,
    Paciente,
    Receta,
    FichaTecnicaMedica,
    FichaTecnicaMedOdonto,
)
from django.contrib.auth.models import Group


class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {
            "email": {
                "required": True,
                "allow_blank": False,
                # Validador para asegurar que no haya duplicados en el campo de correo electrónico
                "validators": [
                    validators.UniqueValidator(
                        User.objects.all(), "Ya existe un usuario con ese correo"
                    )
                ],
            },
        }

    def create(self, validated_data):

        username = validated_data.get("username")
        password = validated_data.get("password")
        email = validated_data.get("email")

        user = User.objects.create_user(
            username=username, password=password, email=email
        )

        return user


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = "__all__"


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


class FichaTecnicaMedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaTecnicaMedica
        fields = "__all__"


class HistorialMedicoSerializer(serializers.ModelSerializer):
    archivo = serializers.FileField()

    class Meta:
        model = HistorialMedico
        fields = "__all__"

    def create(self, validated_data):
        archivo = validated_data.pop("archivo", None)
        historial = HistorialMedico.objects.create(**validated_data)

        if archivo:
            historial.archivo = archivo
            historial.save()

        return historial


class HistorialOdontoSerializer(serializers.ModelSerializer):
    archivo = serializers.FileField()

    class Meta:
        model = HistorialOdonto
        fields = "__all__"

    def create(self, validated_data):
        archivo = validated_data.pop("archivo", None)
        historial = HistorialOdonto.objects.create(**validated_data)

        if archivo:
            historial.archivo = archivo
            historial.save()

        return historial


class NotaEvolucionOdontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaEvolucionOdonto
        fields = "__all__"


class FichaTecnicaMedOdontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichaTecnicaMedOdonto
        fields = "__all__"


class NotaMedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaMedica
        fields = "__all__"


class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = "__all__"
