from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone



# Create your models here.
class Empleado(models.Model):
    # datosPersonales = models.JSONField()  # nombre, apellidoPaterno, apellidoMaterno
    nombre = models.CharField(max_length=30, default="", unique=False)
    apellidoPaterno = models.CharField(max_length=30, default="", unique=False)
    apellidoMaterno = models.CharField(max_length=30, default="", unique=False)
    cedula_profesional = models.CharField(max_length=30, default="", unique=False)
    no_trabajador = models.CharField(
        max_length=30, default="", primary_key=True, unique=True
    )
    ocupacion = models.TextField(max_length=20, default="", unique=False)
    telefono = models.CharField(max_length=10, default="", unique=False)

    objects = models.Manager()

    usuario = models.ForeignKey(
        User,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )


class Paciente(models.Model):
    curp = models.CharField(max_length=18, default="")
    no_expediente = models.CharField(max_length=168, primary_key=True, default="")
    datosPersonalesPacient = models.JSONField()
    # nombre, apellidos, lugar y fecha nacimiento, edad, sexo, nacionalida, ocupacion, estado civil
    datosContactoPacient = models.JSONField()  # telefono, correo
    datosDireccionPacient = models.JSONField()  # direccion, colonia
    area =  models.CharField(max_length=50, default="")

    objects = models.Manager()


class FichaTecnicaEnfermeria(models.Model):
    fecha = models.DateField(auto_now=False, auto_now_add=True)
    signosVitales = models.JSONField()
    # presion, frecuencia cardiaca y respiratoria, temp, glicemia
    datosFisicos = models.JSONField()  # peso, talla, imc
    servicio_enfermeria = models.CharField(max_length=30, default="")
    trabajador = models.BooleanField(null=True, blank=True)
    datosDemograficos = models.JSONField()
    # religion, escolaridad y poblacion

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class FichaTecnicaPsicologia(models.Model):
    fecha_visita = models.DateField(auto_now=False, auto_now_add=True)
    visita = models.JSONField()
    # acompaniante, tipoVisita, tipoConsulta, motivoConsulta
    tratamiento = models.JSONField()  # tratamiento, sugerencia, valoracion
    diagnostico = models.JSONField()  # impresion diagnostica, antecedente

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class AnexoDocumentos(models.Model):
    documento = models.BinaryField(max_length=40, blank=True, null=True)
    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class HistorialOdonto(models.Model):
    fecha_elaboracion = models.DateField(auto_now=False, auto_now_add=True)
    referencia = models.JSONField()  # referencia y lugar ref, subsecuente/citado
    aparatosSistemas = models.JSONField()
    # respiratorio, digestivo, neuro, cardio, muscoes
    padecimiento_actual = models.TextField(max_length=100, blank=True, default="")
    habitos_exteriores = models.TextField(max_length=100, blank=True, default="")
    cabeza = models.JSONField()  # labios, mucosa, encias, lengua, paladar blando y duro
    cuello_odont = models.CharField(max_length=50, blank=True, default="")
    antHerediPato = models.JSONField()
    # diabetes, hipert, tuberculo, cancer, cardio, asma, epilepsia, paretescos
    antPersonPato = models.JSONField()
    # diabetes, hipert, tuberculo, cancer, transfusion, quirurgicos, anestesicos, alergicos, trauma
    personNoPato = models.JSONField()
    # vacuna, alimentacion, fauna nociva, vivienda, adicciones
    antGinecob = models.JSONField()
    # fecha ultima regla y ult doc, planificacion familiar
    odontograma = models.BinaryField(max_length=40, blank=True, null=True)

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class NotaEvolucionOdonto(models.Model):
    fecha = models.DateField(default=timezone.now)
    diagnostico = models.TextField(max_length=100, default="")
    tratamiento = models.TextField(max_length=100, default="")
    notas = models.TextField(max_length=100, default="")
    plan = models.TextField(max_length=100, default="")
    resumen_consulta = models.TextField(max_length=100, default="")

    histlOdonto = models.ForeignKey(
        HistorialOdonto,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    objects = models.Manager()


class HistorialMedico(models.Model):
    fecha_elaboracion = models.DateField(auto_now=False, auto_now_add=True)
    referenciaMed = models.JSONField()  # referencia y lugar
    interrogatorio = models.JSONField()
    # padecimiento actual, tratamiento previo, diagnostico previo, aparato/sistema
    exploracionFisica = models.JSONField()
    # cabeza, cuello, abdomen, torax, columna, genitales, extremidades, inspreecion general
    diagnostico = models.JSONField()
    # diagnostco, tratamiento, pronostico
    informante = models.CharField(max_length=15, blank=True, default="")
    datosFamiliares = models.JSONField()
    # tipo familia, rol madre, familiar respon
    antHerediPatM = models.JSONField()
    # diabetes, hipertension, cardiopatia, cancer, otros, parentesco
    antPersoPatM = models.JSONField()
    # medicoQP, tabaquismoAA, drogas, medicamentos, otro
    antPersoNoPatM = models.JSONField()
    # alimentacion, habitacion, higiene personal
    ginecobMed = models.JSONField()
    # menarca, inicio vida sexual, ult regla, num: embarazo, partos, abortos, cesareas, hijos, macrosomicos, bajo peso,
    # parejas: hetero, homo, bi, met planif familiar, fecha ult parto
    estudiosExter = models.JSONField()
    # rayosX, lab, ultrasonido, tomografia

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    empleado = models.ForeignKey(
        Empleado,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class NotaMedica(models.Model):
    diagnostico = models.TextField(max_length=100, default="")
    tratamiento = models.TextField(max_length=100, default="")
    observaciones = models.TextField(max_length=100, blank=True, default="")
    fecha_consulta = models.DateField(auto_now=False, auto_now_add=True)
    hora_consulta = models.TimeField(auto_now=False, auto_now_add=False)
    servicio = models.CharField(max_length=50, blank=True, default="")

    histMedic = models.ForeignKey(
        HistorialMedico,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()


class Receta(models.Model):
    medicamento = models.JSONField()
    # nombreMedicamento, dosis
    notMed = models.ForeignKey(
        NotaMedica,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    objects = models.Manager()
