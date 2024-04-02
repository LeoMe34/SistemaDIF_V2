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
)
from rest_framework import status
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User

from django.contrib.admin.views.decorators import staff_member_required


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
        return Response(
            {
                "user_info": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "no_trabajador": empleado.no_trabajador if empleado else None
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
        serializer.save()
        return Response(serializer.data, status=201)
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
        | Q(curp__icontains=query)
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


# HistorialOdonto


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesO(request):
    queryset = HistorialOdonto.objects.all()
    serializer = HistorialOdontoSerializer(queryset, many=True)
    return Response(serializer.data)


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
    queryset = NotaEvolucionOdonto.objects.all()
    serializer = NotaEvolucionOdontoSerializer(queryset, many=True)
    return Response(serializer.data)


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


# HistorialMedico


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_historialesMedicos(request):
    queryset = HistorialMedico.objects.all()
    serializer = HistorialMedicoSerializer(queryset, many=True)
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
def detalle_notaMedica(request, pk):
    try:
        notaMedica = NotaMedica.objects.get(pk=pk)
    except NotaMedicaSerializer.DoesNotExist:
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
