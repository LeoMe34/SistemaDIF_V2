from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path("login/", views.login_api),
    path("usuario/", views.get_datos_usuario),
    path("registrar/", views.registrar_api),
    path("logout/", knox_views.LogoutView.as_view()),
    path("logoutall/", knox_views.LogoutAllView.as_view()),
    path("registrar_empleado/", views.crear_empleado),
    path("registrar_paciente/", views.crear_paciente),
    path("detalle_paciente/", views.detalle_paciente),
    path("pacientes/", views.get_pacientes),
    path("buscar_paciente/", views.buscar_paciente),
    path("registrar_ficha_enfermeria/", views.crear_FichaTecnicaE),
    path("buscar_usuario/", views.buscar_usuario),
    path("crear_historial_medico/", views.crear_historialMedico),
]
