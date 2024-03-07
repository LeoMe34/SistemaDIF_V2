# Importación del modelo de usuario proporcionado por Django
from .models import Usuario
from rest_framework import serializers, validators
from knox.models import AuthToken
from django.contrib.auth import authenticate


class CustomAuthTokenSerializer(serializers.Serializer):
    no_trabajador = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def create(self, validated_data):
        no_trabajador = validated_data.get("no_trabajador")
        password = validated_data.get("password")

        usuario = Usuario.objects.create(no_trabajador=no_trabajador, password=password)

        return usuario

    def validate(self, attrs):
        no_trabajador = attrs.get("no_trabajador")
        password = attrs.get("password")

        if no_trabajador and password:
            user = authenticate(
                request=self.context.get("request"),
                no_trabajador=no_trabajador,
                password=password,
            )

            if not user:
                raise serializers.ValidationError(
                    "No se encontró un usuario con estas credenciales"
                )

            attrs["user"] = user
            return attrs

        raise serializers.ValidationError("Se requieren 'no_trabajador' y 'password'")


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            "no_trabajador",
            "nombreU",
            "apellido_paternoU",
            "apellido_maternoU",
            "cedula_profesional",
            "telefono",
            "correo",
            "password",
            "rol",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "correo": {
                "required": True,
                "allow_blank": False,
                # Validador para asegurar que no haya duplicados en el campo de correo electrónico
                "validators": [
                    validators.UniqueValidator(
                        Usuario.objects.all(), "Ya existe un usuario con ese correo"
                    )
                ],
            },
        }

    def create(self, validated_data):
        no_trabajador = validated_data.get("no_trabajador")
        password = validated_data.get("password")
        correo = validated_data.get("correo")

        usuario = Usuario.objects.create(
            no_trabajador=no_trabajador, password=password, correo=correo
        )

        return usuario
