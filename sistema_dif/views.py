from django.db.models import Count, Case, When, Value as V
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken, timezone
from django.db.models import Q
from .serializers import (
    RegistroSerializer,
    EmpleadoSerializer,
    FichaTecnicaESerializer,
    FihaTecnicaPSerializer,
    HistorialMedicoSerializer,
    HistorialOdontoSerializer,
    NotaEvolucionOdontoSerializer,
    NotaMedicaSerializer,
    PacienteSerializer,
    RecetaSerializer,
    GrupoSerializer,
    FichaTecnicaMedSerializer,
    FichaTecnicaMedOdontoSerializer,
    HistOdontoArchivoSerializer,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from .models import (
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
from rest_framework import status
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.admin.views.decorators import staff_member_required
from datetime import date


@api_view(["POST"])
@permission_classes([IsAdminUser])
def agregar_grupo(request):
    serializer = GrupoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def unir_usuario_grupo(request, usuario_id, nombre_grupo):
    try:
        usuario = User.objects.get(id=usuario_id)
        grupo = Group.objects.get(name=nombre_grupo)
        usuario.groups.add(grupo)
        return Response(
            {"mensaje": "Usuario unido al grupo correctamente"},
            status=status.HTTP_200_OK,
        )
    except User.DoesNotExist:
        return Response(
            {"error": "El usuario no existe"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Group.DoesNotExist:
        return Response(
            {"error": "El grupo no existe"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def login_api(request):
    # Crear una instancia del serializer AuthTokenSerializer con los datos de la solicitud
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    # Obtener el usuario autenticado a partir de los datos validados del serializer
    user = serializer.validated_data["user"]

    # Si el usuario tiene la sesion activa, se elimina el token, para que cierre sesion y pueda iniciarla nuevamente
    AuthToken.objects.filter(user=user).delete()

    # Crear un token para el usuario y agregarlo al diccionario que se enviará como respuesta
    _, token = AuthToken.objects.create(user)
    user.last_login = timezone.now()
    user.save()

    return Response(
        {
            "user_info": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "token": token,
        }
    )


@api_view(["POST"])
def logOut(request):
    permission_classes = (IsAuthenticated,)

    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logout successful"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_datos_usuario(request):
    # Obtener el usuario de la solicitud
    user = request.user

    # Verificar si el usuario esta autenticadp
    if user.is_authenticated:
        empleado = Empleado.objects.filter(usuario=user).first()
        group = Group.objects.filter(user=user).first()
        return Response(
            {
                "user_info": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "no_trabajador": empleado.no_trabajador if empleado else None,
                    "nombre_empleado": empleado.nombre
                    + " "
                    + empleado.apellidoPaterno
                    + " "
                    + empleado.apellidoMaterno,
                    "cedula": empleado.cedula_profesional,
                    "name": group.name if group else None,
                    "is_superuser": user.is_superuser,
                },
            }
        )
    # Si no está autenticado, retornar error 400
    return Response({"error": "no autenticado"}, status=400)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_usuarios(request, user_id):
    # Obtener el usuario por su ID o devolver un error 404 si no se encuentra
    user = get_object_or_404(User, pk=user_id)

    # Obtener el empleado asociado al usuario, si existe
    empleado = Empleado.objects.filter(usuario=user).first()

    # Obtener el grupo al que pertenece el usuario, si existe
    group = user.groups.first()

    # Devolver la información del usuario
    return Response(
        {
            "user_info": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "no_trabajador": empleado.no_trabajador if empleado else None,
                "nombre_empleado": (
                    empleado.nombre
                    + " "
                    + empleado.apellidoPaterno
                    + " "
                    + empleado.apellidoMaterno
                    if empleado
                    else None
                ),
                "cedula": empleado.cedula_profesional if empleado else None,
                "ocupacion": empleado.ocupacion if empleado else None,
                "telefono": empleado.telefono if empleado else None,
                "name": group.name if group else None,
                "is_superuser": user.is_superuser,
            },
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_usuario_noTrabajador(request, noTrabajador):
    if not noTrabajador:
        return Response(
            {"error": "Debe proporcionar un nombre de usuario"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    usuarios = User.objects.filter(username__icontains=noTrabajador)

    if not usuarios.exists():
        return Response(
            {"error": "No se encontró ningún usuario con ese nombre de usuario"},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Serializar los datos manualmente
    usuarios_serializados = []
    for usuario in usuarios:
        usuario_serializado = {
            "id": usuario.id,
            "username": usuario.username,
            "email": usuario.email,
        }
        usuarios_serializados.append(usuario_serializado)

    return Response(usuarios_serializados, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_all_usuarios(request):
    usuarios = User.objects.all()
    response_data = []

    for user in usuarios:
        empleado = Empleado.objects.filter(usuario=user).first()
        group = user.groups.first()

        usuario_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "no_trabajador": empleado.no_trabajador if empleado else None,
            "nombre_empleado": (
                f"{empleado.nombre} {empleado.apellidoPaterno} {empleado.apellidoMaterno}"
                if empleado
                else None
            ),
            "cedula": empleado.cedula_profesional if empleado else None,
            "ocupacion": empleado.ocupacion if empleado else None,
            "telefono": empleado.telefono if empleado else None,
            "name": group.name if group else None,
            "is_superuser": user.is_superuser,
        }

        response_data.append(usuario_data)

    return Response(response_data)


# @staff_member_required
@api_view(["POST"])
@permission_classes([IsAdminUser])
def registrar_api(request):
    # Crea una instancia del serializer RegistroSerializer con los datos de la solicitud
    serializer = RegistroSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Guarda al usuario utilizando el serializer
    user = serializer.save()

    # Crear un nuevo token de autenticación para el usuario registrado utilizando Knox
    # Esto haria como si se  hubiera logueado por primera vez
    # _, token = AuthToken.objects.create(user)

    return Response(
        {
            "user_info": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            # 'token': token
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def buscar_usuario(request):
    query = request.GET.get("q", "")

    usuarios = User.objects.filter(
        Q(id__icontains=query)
        | Q(username__icontains=query)
        | Q(email__icontains=query)
    )

    if not usuarios.exists():
        return Response(
            {"error": "No se encontró el usuario solicitado"},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Serializar los datos manualmente
    usuarios_serializados = []
    for usuario in usuarios:
        usuario_serializado = {
            "id": usuario.id,
            "username": usuario.username,
            "email": usuario.email,
        }
        usuarios_serializados.append(usuario_serializado)

    return Response(usuarios_serializados, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def cambiar_contrasenia(request, user_id):
    # Asegúrate de que el usuario que intenta cambiar la contraseña sea el mismo que el usuario cuyo ID se proporciona.
    if request.user.id != user_id:
        return Response(
            {"error": "No tienes permiso para cambiar la contraseña de este usuario"},
            status=403,
        )

    datos = request.data

    try:
        user = User.objects.get(id=user_id)
        # Validar y establecer la contraseña utilizando el método de Django
        nueva_contrasenia = datos.get("password")
        if not nueva_contrasenia:
            return Response({"error": "La contraseña no puede estar vacía"}, status=400)

        user.set_password(nueva_contrasenia)
        user.save()
        return Response({"success": "Contraseña cambiada exitosamente"})

    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def validar_contrasenia_actual(request):
    datos = request.data
    contrasenia_actual = datos.get("password")

    if not contrasenia_actual:
        return Response(
            {"error": "Debes proporcionar la contraseña actual"}, status=400
        )

    # Verificar si la contraseña actual coincide con la contraseña almacenada
    if not request.user.check_password(contrasenia_actual):
        return Response({"error": "La contraseña actual es incorrecta"}, status=400)

    return Response({"success": "La contraseña actual es válida"})


@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def eliminar_usuario(request, pk):
    try:
        user = User.objects.get(pk=pk)

    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Actualizar el estado del usuario a inactivo
    user.is_active = False
    user.save()

    return Response(status=status.HTTP_204_NO_CONTENT)


# EMPLEADO


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_empleados(request):
    usuario_autenticado = request.user  # Obtener el usuario autenticado

    # Obtener todos los empleados excluyendo al usuario autenticado
    queryset = Empleado.objects.exclude(usuario=usuario_autenticado)

    # Filtrar los empleados cuyos usuarios asociados estén activos
    empleados_activos = [
        empleado for empleado in queryset if empleado.usuario.is_active
    ]

    serializer = EmpleadoSerializer(empleados_activos, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def crear_empleado(request):
    serializer = EmpleadoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_empleado(request):
    user = request.user

    try:
        # Obtener el empleado asociado al usuario
        empleado = Empleado.objects.get(usuario=user)
        serializer = EmpleadoSerializer(empleado)
        return Response(serializer.data)
    except Empleado.DoesNotExist:
        return Response(
            {"error": "No se encontró un empleado asociado al usuario"}, status=404
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_empleado(request, noTrabajador):
    try:
        # Obtener el empleado asociado al usuario
        empleado = Empleado.objects.get(no_trabajador=noTrabajador)
        serializer = EmpleadoSerializer(empleado)
        return Response(serializer.data)
    except Empleado.DoesNotExist:
        return Response(
            {"error": "No se encontró un empleado asociado al usuario"}, status=404
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_empleado_group(request, noTrabajador):
    try:
        # Obtener el empleado asociado al usuario
        empleado = Empleado.objects.get(no_trabajador=noTrabajador)
        user = User.objects.get(username=empleado.usuario)
        groups = user.groups.values_list("name", flat=True)

        empleado_data = EmpleadoSerializer(empleado).data
        empleado_data["groups"] = list(groups)

        return Response(empleado_data)
    except Empleado.DoesNotExist:
        return Response(
            {"error": "No se encontró un empleado asociado al usuario"}, status=404
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
# Cambia el nombre del parámetro a user_id
def modificar_empleado(request, user_id):
    # Obtener los datos proporcionados en la solicitud
    datos = request.data

    try:
        # Buscar al empleado por el id del usuario
        empleado = Empleado.objects.get(usuario_id=user_id)

        # Actualizar el número de teléfono del empleado con el valor proporcionado en la solicitud
        empleado.telefono = datos["telefono"]
        empleado.save()

        user = User.objects.get(id=user_id)
        user.email = datos["email"]
        user.save()

        # Devolver la respuesta con los datos actualizados del empleado
        serializer = EmpleadoSerializer(empleado)
        return Response(serializer.data)
    except Empleado.DoesNotExist:
        return Response({"error": "Empleado no encontrado"}, status=404)
    except User.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)


# Paciente


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_pacientes(request):
    queryset = Paciente.objects.filter(area="medicina")
    serializer = PacienteSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_pacientes_psicologia(request):
    queryset = Paciente.objects.filter(area="psicologia")
    serializer = PacienteSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_paciente(request):
    serializer = PacienteSerializer(data=request.data)

    if serializer.is_valid():
        empleado = Empleado.objects.get(usuario=request.user)

        if empleado.ocupacion in ["recepcion_psico", "psicologo"]:
            serializer.validated_data["area"] = "psicologia"
        else:
            serializer.validated_data["area"] = "medicina"

        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_paciente(request, pk):
    try:
        paciente = Paciente.objects.get(pk=pk)
    except Paciente.DoesNotExist:
        return Response(status=404)

    serializer = PacienteSerializer(paciente)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def buscar_paciente(request):
    query = request.GET.get("q", "")

    pacientes = Paciente.objects.filter(
        Q(no_expediente__icontains=query)
        | Q(datosContactoPacient__telefono__icontains=query)
        | Q(curp__icontains=query),
        area="medicina",
    )

    if not pacientes.exists():
        return Response(
            {"error": "No se encontro un paciente con esos datos"},
            status=status.HTTP_404_NOT_FOUND,
        )
    serializer = PacienteSerializer(pacientes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def buscar_paciente_psico(request):
    query = request.GET.get("q", "")

    pacientes = Paciente.objects.filter(
        Q(no_expediente__icontains=query)
        | Q(datosContactoPacient__telefono__icontains=query)
        | Q(curp__icontains=query),
        area="psicologia",
    )

    if not pacientes.exists():
        return Response(
            {"error": "No se encontro un paciente con esos datos"},
            status=status.HTTP_404_NOT_FOUND,
        )
    serializer = PacienteSerializer(pacientes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_paciente(request, pk):
    try:
        paciente = Paciente.objects.get(pk=pk)
    except Paciente.DoesNotExist:
        return Response(status=404)

    serializer = PacienteSerializer(paciente, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_paciete(request, pk):
    try:
        paciente = Paciente.objects.get(pk=pk)
    except Paciente.DoesNotExist:
        return Response(status=404)

    paciente.delete()
    return Response(status=204)


# FichaTecnicaEnfermeria


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasTecnicasE(request):
    queryset = FichaTecnicaEnfermeria.objects.all()
    serializer = FichaTecnicaESerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasE_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        hoy = date.today()
        ficha_tecnica = FichaTecnicaEnfermeria.objects.filter(
            empleado=empleado, fecha=hoy
        )
        serializer = FichaTecnicaESerializer(ficha_tecnica, many=True)
        return Response(serializer.data)
    except FichaTecnicaEnfermeria.DoesNotExist:
        return Response(status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def filtrar_fichas_por_paciente(request, noExp):
    try:
        user = request.user
        user_group = user.groups.first().name if user.groups.exists() else None

        if user_group == "Medico":
            fichas_medicas = FichaTecnicaEnfermeria.objects.filter(paciente=noExp)
            fichas_filtradas = []

            for ficha in fichas_medicas:
                if FichaTecnicaMedica.objects.filter(
                    paciente=noExp, fecha=ficha.fecha
                ).exists():
                    fichas_filtradas.append(ficha)

        elif user_group == "Odontologo":
            fichas_medicas = FichaTecnicaEnfermeria.objects.filter(paciente=noExp)
            fichas_filtradas = []

            for ficha in fichas_medicas:
                if HistorialOdonto.objects.filter(
                    paciente=noExp, fecha_elaboracion=ficha.fecha
                ).exists():
                    fichas_filtradas.append(ficha)

        else:
            return Response(
                {"error": "No tiene permiso para acceder a estas fichas."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not fichas_filtradas:
            return Response(
                {
                    "error": "No se encontraron fichas médicas para el paciente especificado."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = FichaTecnicaESerializer(fichas_filtradas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Empleado.DoesNotExist:
        return Response(
            {"error": "No se encontró el empleado relacionado con este usuario."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {"error": f"Se produjo un error: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_FichaTecnicaE(request):
    serializer = FichaTecnicaESerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_fichaTecnicaE(request, noExp, fecha):
    try:
        paciente = get_object_or_404(Paciente, no_expediente=noExp)
        fichaTecnicaE = FichaTecnicaEnfermeria.objects.get(
            paciente=paciente, fecha=fecha
        )
    except (Paciente.DoesNotExist, FichaTecnicaEnfermeria.DoesNotExist):
        return Response(status=404)

    serializer = FichaTecnicaESerializer(fichaTecnicaE)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_fichaTecnicaE(request, pk):
    try:
        fichaTecnicaE = FichaTecnicaEnfermeria.objects.get(pk=pk)
    except FichaTecnicaEnfermeria.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaESerializer(fichaTecnicaE, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_fichaTecnicaE(request, pk):
    try:
        fichaTecnicaE = FichaTecnicaEnfermeria.objects.get(pk=pk)
    except FichaTecnicaEnfermeria.DoesNotExist:
        return Response(status=404)

    fichaTecnicaE.delete()
    return Response(status=204)


# FichaTecnicaPsicologia


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasTecnicasP(request):
    hoy = date.today()
    fichaPsicologia = FichaTecnicaPsicologia.objects.filter(fecha_visita=hoy)
    serializer = FihaTecnicaPSerializer(fichaPsicologia, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasTP_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        fichasT_psico = FichaTecnicaPsicologia.objects.filter(empleado=empleado)
        serializer = FihaTecnicaPSerializer(fichasT_psico, many=True)
        return Response(serializer.data)
    except FichaTecnicaPsicologia.DoesNotExist:
        return Response(status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def filtrar_ficha_pp_psicologia(request, fk):
    try:
        fichaTecnicaP = FichaTecnicaPsicologia.objects.filter(paciente=fk)
    except FichaTecnicaPsicologia.DoesNotExist:
        return Response(status=404)

    serializer = FihaTecnicaPSerializer(fichaTecnicaP, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_FichaTecnica_indiv(request, noExp, fecha):
    try:
        paciente = get_object_or_404(Paciente, no_expediente=noExp)
        fichaTecnicaP = FichaTecnicaPsicologia.objects.get(
            paciente=paciente, fecha_visita=fecha
        )
    except (Paciente.DoesNotExist, FichaTecnicaPsicologia.DoesNotExist):
        return Response(status=404)

    serializer = FihaTecnicaPSerializer(fichaTecnicaP)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_FichaTecnicaP(request):
    serializer = FihaTecnicaPSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_fichaTecnicaP(request, pk):
    try:
        fichaTecnicaP = FichaTecnicaPsicologia.objects.get(pk=pk)
    except FichaTecnicaPsicologia.DoesNotExist:
        return Response(status=404)

    serializer = FihaTecnicaPSerializer(fichaTecnicaP)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_fichaTecnicaP(request, pk):
    try:
        fichaTecnicaP = FichaTecnicaPsicologia.objects.get(pk=pk)
    except FichaTecnicaPsicologia.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaESerializer(fichaTecnicaP, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_fichaTecnicaP(request, pk):
    try:
        fichaTecnicaP = FichaTecnicaPsicologia.objects.get(pk=pk)
    except FichaTecnicaPsicologia.DoesNotExist:
        return Response(status=404)

    fichaTecnicaP.delete()
    return Response(status=204)


# FichaTecnicaMedicina


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasTecnicasMed(request):
    queryset = FichaTecnicaMedica.objects.all()
    serializer = FichaTecnicaMedSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasMed_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        hoy = date.today()
        ficha_tecnica = FichaTecnicaMedica.objects.filter(empleado=empleado, fecha=hoy)
        serializer = FichaTecnicaMedSerializer(ficha_tecnica, many=True)
        return Response(serializer.data)
    except FichaTecnicaMedica.DoesNotExist:
        return Response(status=404)


"""
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def filtrar_fichasM_por_paciente(request, noExp):
    try:
        fichas_medicas = FichaTecnicaMedica.objects.filter(paciente=noExp)

        if not fichas_medicas.exists():
            return Response(
                {
                    "error": "No se encontraron fichas médicas para el paciente especificado."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = FichaTecnicaMedSerializer(fichas_medicas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except FichaTecnicaMedica.DoesNotExist:
        return Response(
            {
                "error": "No se encontraron fichas médicas para el paciente especificado."
            },
            status=status.HTTP_404_NOT_FOUND,
        )
"""


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_FichaTecnicaMed(request):
    serializer = FichaTecnicaMedSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_fichaTecnicaMed(request, noExp, fecha):
    try:
        fichaTecnicaE = FichaTecnicaMedica.objects.get(paciente=noExp, fecha=fecha)
    except FichaTecnicaMedica.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaMedSerializer(fichaTecnicaE)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_fichaTecnicaMed(request, pk):
    try:
        fichaTecnicaM = FichaTecnicaMedica.objects.get(pk=pk)
    except FichaTecnicaMedica.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaMedSerializer(fichaTecnicaM, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_fichaTecnicaMed(request, pk):
    try:
        fichaTecnicaM = FichaTecnicaMedica.objects.get(pk=pk)
    except FichaTecnicaMedica.DoesNotExist:
        return Response(status=404)

    fichaTecnicaM.delete()
    return Response(status=204)


# HistorialOdonto


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesO(request):
    queryset = HistorialOdonto.objects.all()
    serializer = HistorialOdontoSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesO_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        hoy = date.today()
        historial_odonto = HistorialOdonto.objects.filter(
            empleado=empleado, fecha_elaboracion=hoy
        )
        serializer = HistorialOdontoSerializer(historial_odonto, many=True)
        return Response(serializer.data)
    except HistorialOdonto.DoesNotExist:
        return Response(status=404)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_historialO(request):
    serializer = HistorialOdontoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_historialO(request, noExp, fecha):
    try:
        paciente = get_object_or_404(Paciente, no_expediente=noExp)
        historialO = HistorialOdonto.objects.get(
            paciente=paciente, fecha_elaboracion=fecha
        )
    except (Paciente.DoesNotExist, HistorialOdonto.DoesNotExist):
        return Response(status=404)

    serializer = HistorialOdontoSerializer(historialO)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def obtener_documento(request, id):
    documento = get_object_or_404(HistorialOdonto, id=id)
    serializer = HistOdontoArchivoSerializer(documento)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_historialO(request, pk):
    try:
        historialO = HistorialOdonto.objects.get(pk=pk)
    except HistorialOdonto.DoesNotExist:
        return Response(status=404)

    serializer = HistorialOdontoSerializer(historialO, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_historialO(request, pk):
    try:
        historialO = HistorialOdonto.objects.get(pk=pk)
    except HistorialOdonto.DoesNotExist:
        return Response(status=404)

    historialO.delete()
    return Response(status=204)


# NotaEvolucionOdonto


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notasEvolucionO(request):
    no_expediente = request.query_params.get("no_expediente")
    if no_expediente:
        historiales_paciente = HistorialOdonto.objects.filter(
            paciente__no_expediente=no_expediente
        )
        historiales_sin_nota = historiales_paciente.exclude(
            id__in=NotaEvolucionOdonto.objects.values_list("histlOdonto_id", flat=True)
        )
        serializer = HistorialOdontoSerializer(historiales_sin_nota, many=True)
        return Response(serializer.data)
    else:
        # Si no se proporciona un número de expediente, devolver un error
        return Response(
            {"error": "Debe proporcionar un número de expediente del paciente"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notasEvolucionO_relacionada(request, pk):
    try:
        historial = HistorialOdonto.objects.get(id=pk)
        notas_historial = NotaEvolucionOdonto.objects.filter(histlOdonto=historial)
        serializer = NotaEvolucionOdontoSerializer(notas_historial, many=True)
        return Response(serializer.data)
    except HistorialOdonto.DoesNotExist:
        return Response(
            {"error": "El historial odontológico especificado no existe"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_ultima_nota_evolucion(request):
    no_expediente = request.query_params.get("no_expediente")
    if no_expediente:
        ultima_nota = NotaEvolucionOdonto.objects.filter(
            histlOdonto__paciente__no_expediente=no_expediente
        )
        if ultima_nota.exists():  # Verificar si hay resultados
            serializer = NotaEvolucionOdontoSerializer(
                ultima_nota.last()
            )  # Obtener el primer resultado
            return Response(serializer.data)
        else:
            return Response(
                {
                    "error": "No se encontró ninguna nota de evolución para este paciente"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
    else:
        return Response(
            {"error": "Debe proporcionar un número de expediente del paciente"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_notaEvolucionO(request):
    serializer = NotaEvolucionOdontoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_notaEvolucionO(request, id_histOdonto):
    try:
        notaEvolucionO = NotaEvolucionOdonto.objects.get(histlOdonto=id_histOdonto)
    except NotaEvolucionOdontoSerializer.DoesNotExist:
        return Response(status=404)

    serializer = NotaEvolucionOdontoSerializer(notaEvolucionO)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_notaEvolucionO(request, pk):
    try:
        notaEvolucionO = NotaEvolucionOdonto.objects.get(pk=pk)
    except NotaEvolucionOdonto.DoesNotExist:
        return Response(status=404)

    serializer = NotaEvolucionOdontoSerializer(notaEvolucionO, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_notaEvolucionO(request, pk):
    try:
        notaEvolucionO = NotaEvolucionOdonto.objects.get(pk=pk)
    except NotaEvolucionOdonto.DoesNotExist:
        return Response(status=404)

    notaEvolucionO.delete()
    return Response(status=204)


# FichaTecnicaMedicinaOdonto


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasTecnicasMedOdonto(request):
    queryset = FichaTecnicaMedOdonto.objects.all()
    serializer = FichaTecnicaMedOdontoSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichasMedOdonto_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        ficha_tecnica = FichaTecnicaMedOdonto.objects.filter(empleado=empleado)
        serializer = FichaTecnicaMedOdontoSerializer(ficha_tecnica, many=True)
        return Response(serializer.data)
    except FichaTecnicaMedOdonto.DoesNotExist:
        return Response(status=404)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_FichaTecnicaMedOdonto(request):
    serializer = FichaTecnicaMedOdontoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_fichaTecnicaMedOdonto(request, id_notEvo):
    try:
        fichaTecnicaMO = FichaTecnicaMedOdonto.objects.get(notaEvo=id_notEvo)
    except FichaTecnicaMedOdonto.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaMedOdontoSerializer(fichaTecnicaMO)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_fichaTecnicaMedOdonto(request, pk):
    try:
        fichaTecnicaMO = FichaTecnicaMedOdonto.objects.get(pk=pk)
    except FichaTecnicaMedOdonto.DoesNotExist:
        return Response(status=404)

    serializer = FichaTecnicaMedOdontoSerializer(fichaTecnicaMO, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_fichaTecnicaMedOdonto(request, pk):
    try:
        fichaTecnicaMO = FichaTecnicaMedOdonto.objects.get(pk=pk)
    except FichaTecnicaMedOdonto.DoesNotExist:
        return Response(status=404)

    fichaTecnicaMO.delete()
    return Response(status=204)


# HistorialMedico


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesMedicos(request):
    no_expediente = request.query_params.get("no_expediente")
    if no_expediente:
        historiales_paciente = HistorialMedico.objects.filter(
            fichaMed__paciente__no_expediente=no_expediente
        )
        # Obtener los historiales médicos que no tienen una nota médica relacionada
        historiales_sin_nota = historiales_paciente.annotate(
            num_notas=Count("notamedica")
        ).filter(num_notas=0)
        serializer = HistorialMedicoSerializer(historiales_sin_nota, many=True)
        return Response(serializer.data)
    else:
        # Si no se proporciona un número de expediente, devolver un error
        return Response(
            {"error": "Debe proporcionar un número de expediente del paciente"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historial_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = HistorialMedico.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_elaboracion__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_elaboracion__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = HistorialMedicoSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialMedico(request, noExp, fecha):
    try:
        historialClinico = HistorialMedico.objects.get(
            fichaMed__paciente=noExp, fecha_elaboracion=fecha
        )
    except HistorialMedico.DoesNotExist:
        return Response({"error": "Historial médico no encontrado."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    serializer = HistorialMedicoSerializer(historialClinico)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historiales_relacionadas(request):
    try:
        usuario = request.user
        ficha_medica = FichaTecnicaMedica.objects.filter(empleado__usuario=usuario)
        hoy = date.today()
        historiales = HistorialMedico.objects.filter(
            fichaMed__in=ficha_medica, fecha_elaboracion=hoy
        )
        # Serializar los historiales médicos junto con la información del paciente
        serialized_data = []
        for historial in historiales:
            noExp = {"no_expediente": historial.fichaMed.paciente.no_expediente}
            historial_data = HistorialMedicoSerializer(historial).data
            historial_data["no_expediente"] = noExp
            serialized_data.append(historial_data)
        return Response(serialized_data)
    except HistorialMedico.DoesNotExist:
        return Response(status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialClinico(request, fk):
    try:
        historialMedico = HistorialMedico.objects.get(fichaMed=fk)
    except HistorialMedicoSerializer.DoesNotExist:
        return Response(status=404)

    serializer = HistorialMedicoSerializer(historialMedico)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_historialMedico(request):
    serializer = HistorialMedicoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_historialMedico(request, pk):
    try:
        historialMedico = HistorialMedico.objects.get(pk=pk)
    except HistorialMedicoSerializer.DoesNotExist:
        return Response(status=404)

    serializer = HistorialMedicoSerializer(historialMedico)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_historialMedico(request, pk):
    try:
        historialMedico = HistorialMedico.objects.get(pk=pk)
    except HistorialMedico.DoesNotExist:
        return Response(status=404)

    serializer = HistorialMedicoSerializer(historialMedico, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_historialMedico(request, pk):
    try:
        historialMedico = HistorialMedico.objects.get(pk=pk)
    except HistorialMedico.DoesNotExist:
        return Response(status=404)

    historialMedico.delete()
    return Response(status=204)


# NotaMedica


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notasMedicas(request):
    queryset = NotaMedica.objects.all()
    serializer = NotaMedicaSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notaMedica_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = NotaMedica.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_consulta__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_consulta__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = NotaMedicaSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notaMedica(request, noExp, fecha):
    try:
        notaMedica = NotaMedica.objects.get(
            histMedic__fichaMed__paciente=noExp, fecha_consulta=fecha
        )
    except NotaMedica.DoesNotExist:
        return Response({"error": "Nota médica no encontrada."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

    serializer = NotaMedicaSerializer(notaMedica)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_notaMedica(request):
    serializer = NotaMedicaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def buscar_notaMedica(request):
    query = request.GET.get("q", "")

    # Filtrar notas médicas por número de expediente del paciente
    notas_medicas = NotaMedica.objects.filter(
        histMedic__fichaMed__paciente__no_expediente__icontains=query
    )

    # Obtener los datos del paciente asociado a cada nota médica
    notas_medicas_data = []
    for nota_medica in notas_medicas:
        nota_medica_data = NotaMedicaSerializer(nota_medica).data
        # Incluir los datos del paciente en la respuesta
        nota_medica_data["paciente"] = {
            "no_expediente": nota_medica.histMedic.fichaMed.paciente.no_expediente,
            "nombre": nota_medica.histMedic.fichaMed.paciente.datosPersonalesPacient.get(
                "nombre", ""
            ),
            "apellido_paterno": nota_medica.histMedic.fichaMed.paciente.datosPersonalesPacient.get(
                "apellidoP", ""
            ),
            "apellido_materno": nota_medica.histMedic.fichaMed.paciente.datosPersonalesPacient.get(
                "apellidoM", ""
            ),
            "fecha_nacimiento": nota_medica.histMedic.fichaMed.paciente.datosPersonalesPacient.get(
                "fechaDeNacimiento", ""
            ),
        }
        notas_medicas_data.append(nota_medica_data)

    if not notas_medicas_data:
        return Response(
            {
                "error": "No se encontraron notas médicas relacionadas con ese número de expediente"
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    return Response(notas_medicas_data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_notaMedica(request, id_historial):
    try:
        notaMedica = NotaMedica.objects.get(histMedic=id_historial)
    except NotaMedica.DoesNotExist:
        return Response(status=404)

    serializer = NotaMedicaSerializer(notaMedica)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_notaMedica(request, pk):
    try:
        notaMedica = NotaMedica.objects.get(pk=pk)
    except NotaMedica.DoesNotExist:
        return Response(status=404)

    serializer = NotaMedicaSerializer(notaMedica, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_notaMedica(request, pk):
    try:
        notaMedica = NotaMedica.objects.get(pk=pk)
    except NotaMedica.DoesNotExist:
        return Response(status=404)

    notaMedica.delete()
    return Response(status=204)


# Receta


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_recetas(request):
    queryset = Receta.objects.all()
    serializer = RecetaSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_receta_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = Receta.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = RecetaSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_receta(request):
    serializer = RecetaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def detalle_receta(request, fk):
    try:
        receta = Receta.objects.get(notMed=fk)
    except RecetaSerializer.DoesNotExist:
        return Response(status=404)

    serializer = RecetaSerializer(receta)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_receta(request, pk):
    try:
        receta = Receta.objects.get(pk=pk)
    except Receta.DoesNotExist:
        return Response(status=404)

    serializer = RecetaSerializer(receta, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_receta(request, pk):
    try:
        receta = Receta.objects.get(pk=pk)
    except Receta.DoesNotExist:
        return Response(status=404)

    receta.delete()
    return Response(status=204)


# APIS para los graficos---------------
@api_view(["GET"])
def get_graficosDatos_enfermeria(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = FichaTecnicaEnfermeria.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = FichaTecnicaESerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichaMed_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = FichaTecnicaMedica.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = FichaTecnicaMedSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_fichaPsico_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = FichaTecnicaPsicologia.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_visita__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_visita__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = FihaTecnicaPSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def grafico_poblacion(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
    except ValueError:
        return Response({"error": "Invalid month"}, status=400)

    try:
        year = int(year) if year else None
    except:
        return Response({"error": "Invalid year"}, status=400)

    queryset = FichaTecnicaEnfermeria.objects.all()

    if year:
        queryset = queryset.filter(fecha__year=year)

    if month:
        queryset = queryset.filter(fecha__month=month)

    data = queryset.aggregate(
        embarazada_true=Count(Case(When(datosDemograficos__embarazada=True, then=1))),
        adultoM_true=Count(Case(When(datosDemograficos__adulto_mayor=True, then=1))),
        discapacitado_true=Count(
            Case(When(datosDemograficos__discapacitado=True, then=1))
        ),
    )

    return Response(data)


@api_view(["GET"])
def grafico_odontAntH(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
    except ValueError:
        return Response({"error": "Invalid month"}, status=400)

    try:
        year = int(year) if year else None
    except:
        return Response({"error": "Invalid year"}, status=400)

    queryset = HistorialOdonto.objects.all()

    if year:
        queryset = queryset.filter(fecha_elaboracion__year=year)

    if month:
        queryset = queryset.filter(fecha_elaboracion__month=month)

    data = queryset.aggregate(
        diabetes_true=Count(Case(When(antHerediPato__diabetesH=True, then=1))),
        hipert_true=Count(Case(When(antHerediPato__hipertH=True, then=1))),
        tuber_true=Count(Case(When(antHerediPato__tuberculoH=True, then=1))),
        cancer_true=Count(Case(When(antHerediPato__cancerH=True, then=1))),
        cardio_true=Count(Case(When(antHerediPato__cardioH=True, then=1))),
        asma_true=Count(Case(When(antHerediPato__asmaH=True, then=1))),
        epilepsia_true=Count(Case(When(antHerediPato__epilepsiaH=True, then=1))),
    )

    return Response(data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_histOdonto_fecha(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = HistorialOdonto.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_elaboracion__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_elaboracion__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = HistorialOdontoSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def grafico_odontAntP(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
    except ValueError:
        return Response({"error": "Invalid month"}, status=400)

    try:
        year = int(year) if year else None
    except:
        return Response({"error": "Invalid year"}, status=400)

    queryset = HistorialOdonto.objects.all()

    if year:
        queryset = queryset.filter(fecha_elaboracion__year=year)

    if month:
        queryset = queryset.filter(fecha_elaboracion__month=month)

    data = queryset.aggregate(
        diabetes_true=Count(Case(When(antPersonPato__diabetes=True, then=1))),
        hipert_true=Count(Case(When(antPersonPato__hipert=True, then=1))),
        tuber_true=Count(Case(When(antPersonPato__tuberculo=True, then=1))),
        cancer_true=Count(Case(When(antPersonPato__cancer=True, then=1))),
        trans_true=Count(Case(When(antPersonPato__transfusion=True, then=1))),
        quirurgicos_true=Count(Case(When(antPersonPato__quirurgicos=True, then=1))),
        anestesicos_true=Count(Case(When(antPersonPato__anestesicos=True, then=1))),
        alergicos_true=Count(Case(When(antPersonPato__alergicos=True, then=1))),
        trauma_true=Count(Case(When(antPersonPato__trauma=True, then=1))),
    )

    return Response(data)


@api_view(["GET"])
def get_graficosDatos_medico(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = HistorialMedico.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_elaboracion__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_elaboracion__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = HistorialMedicoSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_graficosDatos_medHer(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
    except ValueError:
        return Response({"error": "Invalid month"}, status=400)

    try:
        year = int(year) if year else None
    except:
        return Response({"error": "Invalid year"}, status=400)

    queryset = HistorialMedico.objects.all()

    if year:
        queryset = queryset.filter(fecha_elaboracion__year=year)

    if month:
        queryset = queryset.filter(fecha_elaboracion__month=month)

    data = queryset.aggregate(
        diabetes_true=Count(Case(When(antHerediPatM__diabetes="True", then=1))),
        hipert_true=Count(Case(When(antHerediPatM__hipertension="True", then=1))),
        cardio_true=Count(Case(When(antHerediPatM__cardiopatia="True", then=1))),
        cancer_true=Count(Case(When(antHerediPatM__cancer="True", then=1))),
    )

    return Response(data)


@api_view(["GET"])
def get_graficoPsico(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        queryset = FichaTecnicaPsicologia.objects.all()

        if year:
            try:
                year = int(year)
                queryset = queryset.filter(fecha_visita__year=year)
            except ValueError:
                return Response(
                    {"error": "Invalid year"}, status=status.HTTP_400_BAD_REQUEST
                )

        if month:
            try:
                month = int(month)
                queryset = queryset.filter(fecha_visita__month=month)
            except ValueError:
                return Response(
                    {"error": "Invalid month"}, status=status.HTTP_400_BAD_REQUEST
                )

        serializer = FihaTecnicaPSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_graficosNutriologo(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="Nutriologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    age_counts = queryset.values("paciente__datosPersonalesPacient__edad").annotate(
        count=Count("paciente__datosPersonalesPacient__edad")
    )

    data = [
        {"age": item["paciente__datosPersonalesPacient__edad"], "count": item["count"]}
        for item in age_counts
    ]

    return Response(data)


@api_view(["GET"])
def get_sexo_graficosNutriologo(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    # Filtrar los datos por ocupación del empleado 'nutriologo'
    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="Nutriologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    # Contar la cantidad de hombres y mujeres
    sexo_counts = queryset.values("paciente__datosPersonalesPacient__sexo").annotate(
        count=Count("paciente__datosPersonalesPacient__sexo")
    )

    # Formatear los datos para la respuesta
    data = [
        {"sexo": item["paciente__datosPersonalesPacient__sexo"], "count": item["count"]}
        for item in sexo_counts
        if item["paciente__datosPersonalesPacient__sexo"] is not None
    ]

    return Response(data)


@api_view(["GET"])
def get_graficosOftEdad(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="oftalmologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    age_counts = queryset.values("paciente__datosPersonalesPacient__edad").annotate(
        count=Count("paciente__datosPersonalesPacient__edad")
    )

    data = [
        {"age": item["paciente__datosPersonalesPacient__edad"], "count": item["count"]}
        for item in age_counts
    ]

    return Response(data)


@api_view(["GET"])
def get_GraficoOftSex(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="oftalmologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    sexo_counts = queryset.values("paciente__datosPersonalesPacient__sexo").annotate(
        count=Count("paciente__datosPersonalesPacient__sexo")
    )

    data = [
        {"sexo": item["paciente__datosPersonalesPacient__sexo"], "count": item["count"]}
        for item in sexo_counts
        if item["paciente__datosPersonalesPacient__sexo"] is not None
    ]

    return Response(data)


@api_view(["GET"])
def get_graficosAudioEdad(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="audiologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    age_counts = queryset.values("paciente__datosPersonalesPacient__edad").annotate(
        count=Count("paciente__datosPersonalesPacient__edad")
    )

    data = [
        {"age": item["paciente__datosPersonalesPacient__edad"], "count": item["count"]}
        for item in age_counts
    ]

    return Response(data)


@api_view(["GET"])
def get_GraficoAudioSex(request):
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else None
        year = int(year) if year else None
    except ValueError:
        return Response({"error": "Invalid month or year"}, status=400)

    queryset = FichaTecnicaMedica.objects.filter(empleado__ocupacion="audiologo")

    if year:
        queryset = queryset.filter(fecha__year=year)
    if month:
        queryset = queryset.filter(fecha__month=month)

    sexo_counts = queryset.values("paciente__datosPersonalesPacient__sexo").annotate(
        count=Count("paciente__datosPersonalesPacient__sexo")
    )

    data = [
        {"sexo": item["paciente__datosPersonalesPacient__sexo"], "count": item["count"]}
        for item in sexo_counts
        if item["paciente__datosPersonalesPacient__sexo"] is not None
    ]

    return Response(data)
