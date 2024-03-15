# Importación del modelo de usuario proporcionado por Django
from django.contrib.auth.models import User
from rest_framework import serializers, validators
from sistema_dif.models import (
    Empleado, FichaTecnicaEnfermeria, FichaTecnicaPsicologia,
    AnexoDocumentos, HistorialMedico, HistorialOdonto,
    NotaEvolucionOdonto, NotaMedica, Paciente, Receta)


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {
                'required': True,
                'allow_blank': False,
                # Validador para asegurar que no haya duplicados en el campo de correo electrónico
                'validators': [
                    validators.UniqueValidator(
                        User.objects.all(), "Ya existe un usuario con ese correo"
                    )]
            }
        }

    def crear(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        email = validated_data.get('email')

        user = User.objects.create(
            username=username,
            password=password,
            email=email
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

class AnezoDocumentosSerializer(serializers.ModelSerializer):
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