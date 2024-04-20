from django.shortcuts import get_object_or_404


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken, timezone
from django.db.models import Q
from .serializers import (
    RegistroSerializer,
    EmpleadoSerializer,
    AnexoDocumentosSerializer,
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
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from .models import (
    Empleado,
    AnexoDocumentos,
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
                    "name": group.name if group else None,
                    "is_superuser": user.is_superuser,
                },
            }
        )
    # Si no está autenticado, retornar error 400
    return Response({"error": "no autenticado"}, status=400)


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


# EMPLEADO


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_empleados(request):
    queryset = Empleado.objects.all()
    serializer = EmpleadoSerializer(queryset, many=True)
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
def detalle_empleado(request, pk):
    try:
        empleado = Empleado.objects.get(pk=pk)
    except Empleado.DoesNotExist:
        return Response(status=404)

    serializer = EmpleadoSerializer(empleado)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def modificar_empleado(request, pk):
    try:
        empleado = Empleado.objects.get(pk=pk)
    except Empleado.DoesNotExist:
        return Response(status=404)

    serializer = EmpleadoSerializer(empleado, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def eliminar_empleado(request, pk):
    try:
        empleado = Empleado.objects.get(pk=pk)
        user = empleado.usuario

    except Empleado.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Actualizar el estado del usuario a inactivo
    user.is_active = False
    user.save()

    return Response(status=status.HTTP_204_NO_CONTENT)


# Paciente


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_pacientes(request):
    queryset = Paciente.objects.all()
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
        ficha_tecnica = FichaTecnicaEnfermeria.objects.filter(empleado=empleado)
        serializer = FichaTecnicaESerializer(ficha_tecnica, many=True)
        return Response(serializer.data)
    except FichaTecnicaEnfermeria.DoesNotExist:
        return Response(status=404)


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
def detalle_fichaTecnicaE(request, pk):
    try:
        fichaTecnicaE = FichaTecnicaEnfermeria.objects.get(pk=pk)
    except FichaTecnicaEnfermeria.DoesNotExist:
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
    queryset = FichaTecnicaPsicologia.objects.all()
    serializer = FihaTecnicaPSerializer(queryset, many=True)
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
        ficha_tecnica = FichaTecnicaMedica.objects.filter(empleado=empleado)
        serializer = FichaTecnicaMedSerializer(ficha_tecnica, many=True)
        return Response(serializer.data)
    except FichaTecnicaMedica.DoesNotExist:
        return Response(status=404)


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
def detalle_fichaTecnicaMed(request, pk):
    try:
        fichaTecnicaE = FichaTecnicaMedica.objects.get(pk=pk)
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
        historial_odonto = HistorialOdonto.objects.filter(empleado=empleado)
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
def detalle_historialO(request, pk):
    try:
        historialO = HistorialOdonto.objects.get(pk=pk)
    except HistorialOdontoSerializer.DoesNotExist:
        return Response(status=404)

    serializer = HistorialOdontoSerializer(historialO)
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
def detalle_notaEvolucionO(request, pk):
    try:
        notaEvolucionO = NotaEvolucionOdonto.objects.get(pk=pk)
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
def detalle_fichaTecnicaMedOdonto(request, pk):
    try:
        fichaTecnicaMO = FichaTecnicaMedOdonto.objects.get(pk=pk)
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


from django.db.models import Count

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesMedicos(request):
    no_expediente = request.query_params.get("no_expediente")
    if no_expediente:
        historiales_paciente = HistorialMedico.objects.filter(
            fichaMed__paciente__no_expediente=no_expediente
        )
        # Obtener los historiales médicos que no tienen una nota médica relacionada
        historiales_sin_nota = historiales_paciente.annotate(num_notas=Count('notamedica')).filter(num_notas=0)
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
def get_historiales_relacionadas(request):
    try:
        usuario = request.user
        # Imprimir todos los empleados asociados al usuario
        print(usuario.empleado_set.all())
        # Obtener el primer empleado asociado al usuario
        empleado = usuario.empleado_set.first()
        historial_clinico = HistorialMedico.objects.filter(empleado=empleado)
        serializer = HistorialMedicoSerializer(historial_clinico, many=True)
        return Response(serializer.data)
    except HistorialMedico.DoesNotExist:
        return Response(status=404)


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
        histMedic__paciente__no_expediente__icontains=query
    )

    # Obtener los datos del paciente asociado a cada nota médica
    notas_medicas_data = []
    for nota_medica in notas_medicas:
        nota_medica_data = NotaMedicaSerializer(nota_medica).data
        # Incluir los datos del paciente en la respuesta
        nota_medica_data["paciente"] = {
            "no_expediente": nota_medica.histMedic.paciente.no_expediente,
            "nombre": nota_medica.histMedic.paciente.datosPersonalesPacient.get(
                "nombre", ""
            ),
            "apellido_paterno": nota_medica.histMedic.paciente.datosPersonalesPacient.get(
                "apellidoP", ""
            ),
            "apellido_materno": nota_medica.histMedic.paciente.datosPersonalesPacient.get(
                "apellidoM", ""
            ),
            # Agrega otros campos del paciente si los necesitas
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
def detalle_receta(request, pk):
    try:
        receta = Receta.objects.get(pk=pk)
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
