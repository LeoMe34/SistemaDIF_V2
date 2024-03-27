from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path('login/', views.login_api),
    path('usuario/', views.get_datos_usuario),
    path('registrar/', views.registrar_api),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logoutall/', knox_views.LogoutAllView.as_view()),

    path('registrar_empleado/', views.crear_empleado)
]