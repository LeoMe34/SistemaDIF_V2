from typing import Any
from django.db import models
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils.translation import gettext as _
from django.conf import settings
from django.contrib.auth.hashers import make_password


class ManejadorUsuario(BaseUserManager):
    def _create_user(self, no_trabajador, password, **kwargs):
        if not no_trabajador:
            raise ValueError("Se requiere un nombre de usuario")

        usuario = self.model(no_trabajador=no_trabajador, password=password, **kwargs)
        usuario = self.model(no_trabajador=no_trabajador, **kwargs)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_user(self, no_trabajador, password=None, **kwargs):
        return self._create_user(no_trabajador, password, **kwargs)

    def create_superuser(self, no_trabajador, password=None, **kwargs):
        kwargs.setdefault("rol", Usuario.ADMINISTRADOR)
        kwargs.setdefault("active", True)

        usuario = self.create_user(no_trabajador, password, **kwargs)

        return usuario


class Usuario(AbstractBaseUser):
    no_trabajador = models.CharField(max_length=30, default="", unique=True)
    nombreU = models.CharField(max_length=50, default="", unique=False)
    apellido_paternoU = models.CharField(max_length=50, default="", unique=False)
    apellido_maternoU = models.CharField(max_length=50, default="", unique=False)
    cedula_profesional = models.CharField(max_length=30, default="", unique=True)
    telefono = models.CharField(max_length=10, default="", unique=False)
    correo = models.EmailField(unique=True)

    active = models.BooleanField(_("Activo"), default=True)
    staff = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)

    # Definir las opciones para el campo 'rol' como enteros
    ADMINISTRADOR = 1
    RECEPCIONISTAGRAL = 2
    RECEPCIONISTAPSI = 3
    ENFERMERO = 4
    MEDICOGRAL = 5
    ODONTOLOGO = 6
    NUTRIOLOGO = 7
    PSICOLOGO = 8

    ELECCION_ROLES = (
        (ADMINISTRADOR, "Administrador"),
        (RECEPCIONISTAGRAL, "Recepcionista General"),
        (RECEPCIONISTAPSI, "Recepcionista Psicologia"),
        (ENFERMERO, "Enfermero"),
        (MEDICOGRAL, "Medico General"),
        (ODONTOLOGO, "Odontologo"),
        (PSICOLOGO, "Psicologo"),
        (NUTRIOLOGO, "Nutriologo"),
    )

    rol = models.IntegerField(choices=ELECCION_ROLES)

    objects = ManejadorUsuario()

    USERNAME_FIELD = "no_trabajador"
    REQUIRED_FIELDS = [
        "nombreU",
        "apellido_paternoU",
        "apellido_maternoU",
        "telefono",
        "correo",
    ]

    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"

    def get_full_name(self):
        return (
            self.nombreU + " " + self.apellido_paternoU + " " + self.apellido_maternoU
        )

    def get_short_name(self):
        return self.nombreU

    def has_perm(self, perm, obj=None):
        "¿El usuario cuenta con un permiso en especifico?"
        return True

    def has_module_perms(self, module):
        "El usuario cuenta con los permisos para ver una app en especifico"
        return True

    @property
    def is_staff(self):
        "¿El usuario es staff (no super usuario)?"
        return self.staff

    @property
    def is_admin(self):
        "¿El usuario es un administrador(super usuario)?"
        return self.admin

    @property
    def is_active(self):
        "¿El usuario está activo?"
        return self.active

    def __str__(self):
        return self.nombreU + " " + self.apellido_paternoU + " " + self.no_trabajador
