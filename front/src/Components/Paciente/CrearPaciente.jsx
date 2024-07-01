import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'

export function CrearPaciente() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm()
    const location = useLocation();
    const [mounted, setMounted] = useState(false);
    const [mostrarOtraNacion, setMostrarOtraNacion] = useState(false)
    const [pacientes, setPacientes] = useState([])


    const validarCURP = (curp) => {
        const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{1}[0-9]$/;
        return curpRegex.test(curp)
    }

    const validarTelefono = (telefono) => {
        const telefonoRegex = /^[0-9]{10}$/

        return telefonoRegex.test(telefono)
    }

    const validarNombreCompleto = (nombreOApellido) => {
        const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ\s]{1,50}$/

        return nombreCompletoRegex.test(nombreOApellido)
    }

    const validarOcupacion = (ocupacion) => {
        const ocupacionRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ][A-Za-zÁÉÍÓÚáéíóúüñÑ\s/,.-:()]*$/

        return ocupacionRegex.test(ocupacion)
    }

    const validarOtraNacion = (nacionalidad) => {
        const nacionRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9.,\s-]{1,30}$/

        return nacionRegex.test(nacionalidad)
    }

    const validarColonia = (colonia) => {
        const coloniaRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9.,\s-]{1,50}$/

        return coloniaRegex.test(colonia)
    }

    const validarDireccion = (direccion) => {
        const direccionRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9.,#\s-]{1,50}$/

        return direccionRegex.test(direccion)
    }

    const validarCorreo = (correo) => {
        const correoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9_.+-]+@[A-Za-zÁÉÍÓÚáéíóúü0-9]+\.[A-Za-zÁÉÍÓÚáéíóúü0-9]+$/
        return correoRegex.test(correo)
    }

    const validarFechaNacimiento = () => {
        const fecha = new Date()
        const diaActual = fecha.getDate()
        const mesActual = fecha.getMonth() + 1
        const anioActual = fecha.getFullYear()

        const fechaActual = new Date(anioActual, mesActual - 1, diaActual)

        const data = getValues()
        const fechaNacimiento = new Date(data.fechaNacimiento)

        if (fechaNacimiento > fechaActual) {
            return false
        }
        else {
            return true
        }
    }

    const validarAnio = () => {
        const fecha = new Date()
        const anioActual = fecha.getFullYear()
        const anioValido = anioActual - 100 //Solo va a permitir que se registren fechas de los ultimos 100 años

        const data = getValues()
        const fechaNacimiento = data.fechaNacimiento
        const anioNacimiento = fechaNacimiento.split('-')[0]

        if (anioNacimiento < anioValido) {
            return false
        } else {
            return true
        }
    }

    const getNoExpediente = () => {
        //Los primeros digitos del número de expendiente son los 2 ultimos del año actual        
        const fecha = new Date()
        const anio = fecha.getFullYear().toString().substring(2)  // Obtener solo los dos ultimos digitos del año
        //Obtener los datos de la fecha de nacimiento, son 6 digitos
        const data = getValues()
        const fechaNacimiento = data.fechaNacimiento
        const diaNacimiento = fechaNacimiento.split('-')[2]
        const mesNacimiento = fechaNacimiento.split('-')[1]
        const anioNacimiento = fechaNacimiento.split('-')[0].substring(2)
        //Obtener el nombre completo
        const nombreCompleto = `${data.nombre} ${data.apellidoP} ${data.apellidoM}`;

        const noExpediente = anio + anioNacimiento + mesNacimiento + diaNacimiento + nombreCompleto

        //Cambia el valor cuando ya se creo el Número de expediente
        if (fechaNacimiento && nombreCompleto) {
            setValue('noExpediente', noExpediente)
        }
    }

    const getEdad = () => {
        const fecha = new Date()
        const anioActual = fecha.getFullYear().toString()
        const mesActual = fecha.getMonth() + 1
        const diaActual = fecha.getDay()

        const data = getValues()
        const fechaNacimiento = data.fechaNacimiento
        const diaNacimiento = fechaNacimiento.split('-')[2]
        const mesNacimiento = fechaNacimiento.split('-')[1]
        const anioNacimiento = fechaNacimiento.split('-')[0]

        let edad = ((parseInt(anioActual)) - parseInt(anioNacimiento))
        if (mesNacimiento > mesActual) {
            edad -= 1
        } else if (mesNacimiento === mesActual) {
            if (diaNacimiento > diaActual) {
                edad -= 1
            }
        }
        setValue('edad', edad)
    }

    const getPacientes = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/pacientes/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setPacientes(response.data)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    }

    const nombre = watch("nombre");
    const apellidoPaterno = watch("apellidoP")
    const apellidoMaterno = watch("apellidoM")
    const fechaNacimiento = watch("fechaNacimiento")

    useEffect(() => {
        getNoExpediente()
        getPacientes()
        getEdad()
    }, [nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento])

    const handleOtraNacion = (e) => {
        const nacionSeleccionada = e.target.value

        if (nacionSeleccionada === 'Extranjero') {
            setMostrarOtraNacion(true)
        } else {
            setMostrarOtraNacion(false)
        }
    }

    useEffect(() => {
        // Solo ejecutar el efecto una vez
        if (!mounted) {
            // Limpiar los parámetros de consulta de la URL al cargar la página
            const urlSinParametros = location.pathname;
            navegador(urlSinParametros);
            setMounted(true);
        }
    }, [mounted, location, navegador]);

    const registrarPaciente = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_paciente/"
            const respuesta = await axios.post(url, {
                curp: data.curp,
                no_expediente: data.noExpediente,
                "datosPersonalesPacient": {
                    nombre: data.nombre,
                    apellidoP: data.apellidoP,
                    apellidoM: data.apellidoM,
                    fechaDeNacimiento: data.fechaNacimiento,
                    edad: data.edad,
                    sexo: data.sexo,
                    nacionalidad: data.nacionalidad,
                    ocupacion: data.ocupacion,
                    estadoCivil: data.estadoCivil
                },
                "datosContactoPacient": {
                    telefono: data.numeroTelefonico,
                    correo: data.correo
                },
                "datosDireccionPacient": {
                    direccion: data.direccion,
                    colonia: data.colonia
                },
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            console.log("Paciente registrado correctamente");

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    //La CURP NO DEBE ESTAR DUPLICADA
    const enviar = handleSubmit(async data => {
        const fechaNacimientoValida = validarFechaNacimiento()
        const curpValida = validarCURP(data.curp)
        const telefonoValido = validarTelefono(data.numeroTelefonico)
        const nombreValido = validarNombreCompleto(data.nombre)
        const apellidoPValido = validarNombreCompleto(data.apellidoP)
        const apellidoMValido = validarNombreCompleto(data.apellidoM)
        const ocupacionValida = validarOcupacion(data.ocupacion)
        const nacionValida = validarOtraNacion(data.nacionalidad)
        const coloniaValida = validarColonia(data.colonia)
        const direccionValida = validarDireccion(data.direccion)
        const correoValido = data.correo ? validarCorreo(data.correo) : true
        const anioNacimientoValido = validarAnio()
        let curpDuplicada = pacientes.some((paciente) => paciente.curp === data.curp)

        if (!curpValida) {
            toast.error('La CURP ingresada es incorrecta,debe tener 16 caracteres')
        } else if (curpDuplicada) {
            toast.error('Esta CURP fue registrada anteriormente')
        } else if (!fechaNacimientoValida) {
            toast.error('La fecha de nacimiento debe ser anterior a la actual')
        } else if (!anioNacimientoValido) {
            toast.error('La fecha de nacimiento puede comprender los úlltimos 100 años')
        } else if (!nombreValido) {
            toast.error('Ingrese sólo letras en el nombre')
        } else if (!apellidoPValido) {
            toast.error('Ingrese sólo letras en el apellido paterno')
        } else if (!apellidoMValido) {
            toast.error('Ingrese sólo letras en el apellido materno')
        } else if (!nacionValida) {
            toast.error('La nacionalidad debe ser conformada por un máximo de 30 letras')
        } else if (!telefonoValido) {
            toast.error('Recuerde sólo ocupar números para el campo de telefono y que tienen que ser diez')
        } else if (!correoValido) {
            toast.error('El correo ingresado no es valido')
        } else if (!coloniaValida) {
            toast.error('El máximo de la colonia debe ser 50 caracteres alfanuméricos')
        } else if (!direccionValida) {
            toast.error('El máximo de la dirección debe ser 50 caracteres alfanuméricos')
        } else if (!ocupacionValida) {
            toast.error('Ocupación no valida, ocupe solo letras')
        } else {
            registrarPaciente(data)
            navegador("/home_recepcion_medica")
        }

    })

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_recepcion">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Paciente nuevo</li>
                    </ol>
                </nav>
            </div>

            <h3 className="mt-4 mb-4 titulo">Paciente nuevo</h3>
            <form onSubmit={enviar}>
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="curp">CURP
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="curp" type="text" placeholder="CURP" className="entrada"
                                {...register("curp", { required: true })} />
                            {errors.curp && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="fechaNacimiento">Fecha de nacimiento
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="fechaNacimiento" type="date" placeholder="dd/mm/aaaa" className="entrada"
                                {...register("fechaNacimiento", { required: true })} />
                            {errors.fechaNacimiento && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="edad">Edad
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="edad" type="text" className="entrada" readOnly
                                {...register("edad", { required: true })} />
                            {errors.edad && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nombre">Nombre(s)
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada"
                                {...register("nombre", { required: true })} />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoP">Apellido paterno
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                {...register("apellidoP", { required: true })} />
                            {errors.apellidoP && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoM">Apellido materno
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                {...register("apellidoM", { required: true })} />
                            {errors.apellidoM && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="noExpediente">Número de expediente
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="noExpediente" type="text" className="entrada" readOnly
                                {...register("noExpediente", { required: true })} />
                            {errors.noExpediente && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="sexo">Sexo
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="sexo" id="sexo" className="opciones"
                                {...register("sexo", { required: true })}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            {errors.sexo && <span>Es necesario este campo</span>}
                        </div>

                        {/*Aun falta que desglose la opción de otra */}
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nacionalidad">Nacionalidad
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="nacionalidad" id="nacionalidad" className="opciones"
                                onClick={handleOtraNacion}
                                {...register("nacionalidad", { required: true })}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="Mexicana">Mexicana</option>
                                <option value="Extranjero">Otra</option>
                            </select>
                            {errors.nacionalidad && <span>Es necesario este campo</span>}
                        </div>

                        {mostrarOtraNacion &&
                            <div className='col'>
                                <div className="mb-5">
                                    <label className="form-label etiqueta" htmlFor="otra_nacionalidad">Otra</label>
                                    <input id="otra_nacionalidad" type="text" placeholder="Nacionalidad" className="entrada" />
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="estadoCivil">Estado civil
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="estadoCivil" id="estadoCivil" className="opciones"
                                {...register("estadoCivil", { required: true })}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="union_libre">Unión libre</option>
                            </select>
                            {errors.estadoCivil && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="numeroTelefonico">Número telefónico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="numeroTelefonico" type="text" placeholder="Número telefónico" className="entrada"
                                {...register("numeroTelefonico", { required: true })} />
                            {errors.numeroTelefonico && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="correo">Correo electrónico
                            </label>
                            <input id="correo" type="text" placeholder="Correo electrónico" className="entrada"
                                {...register("correo", { required: false })} />
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="ocupacion">Ocupación
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="ocupacion" placeholder="Ocupación" className="text-amplio"
                                {...register("ocupacion", { required: true })}>
                                {errors.ocupacion && <span>Es necesario este campo</span>}
                            </textarea>
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="colonia">Colonia
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="colonia" type="text" placeholder="Colonia" className="entrada"
                                {...register("colonia", { required: true })} />
                            {errors.colonia && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="direccion">Direccción
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="direccion" placeholder="Calle, No.Externo o Interno, CP" className="entrada"
                                {...register("direccion", { required: true })} />
                            {errors.direccion && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="pt-1 mt-3 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>

            </form>

        </div>
    )
}