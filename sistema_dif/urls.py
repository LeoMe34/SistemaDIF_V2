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
    path("crear_grupo/", views.agregar_grupo),
    path("unir_grupo/<int:usuario_id>/<str:nombre_grupo>/",
         views.unir_usuario_grupo),
    path("registrar_paciente/", views.crear_paciente),
    path("detalle_paciente/<str:pk>", views.detalle_paciente),
    path("pacientes/", views.get_pacientes),
    path("buscar_paciente/", views.buscar_paciente),
    path("buscar_paciente_psico/", views.buscar_paciente_psico),
    path("buscar_nota_medica/", views.buscar_notaMedica),
    path("registrar_ficha_enfermeria/", views.crear_FichaTecnicaE),
    path("buscar_usuario/", views.buscar_usuario),
    path("crear_historial_medico/", views.crear_historialMedico),
    path("registrar_histOdonto/", views.crear_historialO),
    path("registrar_notaEvoOdont/", views.crear_notaEvolucionO),
    path("crear_nota_medica/", views.crear_notaMedica),
    path("getHistorialM/", views.get_historialesMedicos),
    path("get_detalles_NM/<int:id_historial>", views.detalle_notaMedica),
    path("getNotaEvo/", views.get_notasEvolucionO),
    path("get_ultima_notaEvo/", views.get_ultima_nota_evolucion),

    path("notas_evo_relacionadas/<int:pk>",
         views.get_notasEvolucionO_relacionada),
    path("registrar_ficha_psicologia/", views.crear_FichaTecnicaP),

    path("fichas_home/", views.get_fichasE_relacionadas),
    path("historial_clinico_home/", views.get_historiales_relacionadas),
    path("historial_odonto_home/", views.get_historialesO_relacionadas),
    path("ficha_psicologia_home/", views.get_fichasTecnicasP),

    path("crear_receta/", views.crear_receta),
    path("registrar_ficha_medica/", views.crear_FichaTecnicaMed),
    path("getFichaMedica/", views.get_fichasTecnicasMed),
    path("registrar_ficha_medicaO/", views.crear_FichaTecnicaMedOdonto),
]
