from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from knox.views import LoginView
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from .serializers import RegistroSerializer
from .models import Usuario


@api_view(['POST'])
def login_api(request):
    try:
        # Crear una instancia del serializer AuthTokenSerializer con los datos de la solicitud
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Obtener el usuario autenticado a partir de los datos validados del serializer
        user = serializer.validated_data['user']

        # Crear un token para el usuario y agregarlo al diccionario que se enviará como respuesta
        _, token = AuthToken.objects.create(user)

        # Imprimir información de depuración
        print(f"Usuario autenticado: {user}")

        return Response({
            'user_info': {
                'id': user.id,
                'no_trabajador': user.no_trabajador,
                'email': user.correo
            },
            'token': token
        })
    except Exception as e:
        # Imprimir información de depuración en caso de error
        print(f"Error en la autenticación: {str(e)}")
        
        if hasattr(e, 'detail') and 'non_field_errors' in e.detail:
            print("Detalles del error:", e.detail['non_field_errors'])

        return Response({'error': f'Error en la autenticación: {str(e)}'}, status=400)


### class CustomLoginView(LoginView):
        permission_classes = (permissions.AllowAny,)
        authentication_classes = (TokenAuthentication,)

        def post(self, request, format=None):
            serializer = CustomAuthTokenSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            _, token = AuthToken.objects.create(user)
            return Response({
                'user_info': {
                    'id': user.id,
                    'no_trabajador': user.no_trabajador,
                    'correo': user.correo
                },
                'token': token
            }) ###
    
@api_view(['GET'])
def get_datos_usuario(request):
    # Obtener el usuario de la solicitud
    user = request.user

    # Verificar si el usuario esta autenticadp
    if user.is_authenticated:
        return Response({
            'user_info': {
                'id': user.id,
                'no_trabajador': user.no_trabajador,
                'correo': user.correo
            },
        })
    # Si no está autenticado, retornar error 400
    return Response({'error': 'no autenticado'}, status=400)


@api_view(['POST'])
def registrar_api(request):
    # Crea una instancia del serializer RegistroSerializer con los datos de la solicitud
    serializer = RegistroSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Guarda al usuario utilizando el serializer
    user = serializer.save()

    # Crear un nuevo token de autenticación para el usuario registrado utilizando Knox
    # Esto haria como si se  hubiera logueado por primera vez
    # _, token = AuthToken.objects.create(user)

    return Response({
        'user_info': {
            'id': user.id,
            'no_trabajador': user.no_trabajador,
            'correo': user.correo
        },
        # 'token': token
    })
