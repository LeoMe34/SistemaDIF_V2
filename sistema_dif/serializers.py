# Importación del modelo de usuario proporcionado por Django
from django.contrib.auth.models import User
from rest_framework import serializers, validators


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
