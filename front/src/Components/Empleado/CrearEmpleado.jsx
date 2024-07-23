import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';
import BuscarUsuario from './BuscarUsuario';
import { useUsuarioId } from '../../Contexto/UsuarioIdContext';
import { toast } from 'react-hot-toast'
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function CrearEmpleado() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    /*const [, setUser] = useState(null);*/
    const { usuarioId, setUsuarioId } = useUsuarioId();
    const [mostrarCedula, setMostrarCedula] = useState(false)
    const [empleados, setEmpleados] = useState([]);
    const [noTrabajador, setNoTrabajador] = useState(null)

    const registrarEmpleado = async (data) => {
        console.log("El usuario es" + usuarioId)
        try {
            const url = "http://127.0.0.1:8000/api/registrar_empleado/"
            const respuesta = await axios.post(url, {
                nombre: data.nombre,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                no_trabajador: data.no_trabajador,
                cedula_profesional: data.cedula_profesional,
                ocupacion: data.ocupacion,
                telefono: data.telefono,
                usuario: usuarioId
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            const noTrabajadorRegistrado = respuesta.data
            if (noTrabajadorRegistrado) {
                console.log("Usuario registrado correctamente");
                localStorage.removeItem("noTrabajador")                
                return {
                    usuarioID: noTrabajadorRegistrado.usuarioId,
                    ocupacionNombre: noTrabajadorRegistrado.ocupacion
                }
            } else {
                console.log("Usuario duplicado");
            }

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const unirUsuarioGrupo = (usuarioID, ocupacionNombre) => {
        axios.post(`http://127.0.0.1:8000/api/unir_grupo/${usuarioID}/${ocupacionNombre}/`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const getEmpleados = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get_todos_empleados/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de empleados:', error);
        }
    }

    useEffect(() => {
        getEmpleados()
    }, [token]);

    useEffect(() => {
        getNoTrabajador();
    }, []);

    useEffect(() => {
        if (noTrabajador) {
            getUsuarioId()
        }
        else {
            handlePacienteSeleccionado()
        }
    }, [noTrabajador]);



    const validarNombreCompleto = (nombreOApellido) => {
        const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ\s]{1,50}$/

        return nombreCompletoRegex.test(nombreOApellido)
    }

    const validarTelefono = (telefono) => {
        const telefonoRegex = /^[0-9]{10}$/

        return telefonoRegex.test(telefono)
    }

    const handleOcupacionCambio = (e) => {
        const ocupacionSeleccionada = e.target.value

        if (ocupacionSeleccionada !== 'Recepcion'
            && ocupacionSeleccionada !== 'recepcion_psico') {
            setMostrarCedula(true)
        } else {
            setMostrarCedula(false)
        }
    }

    const getNoTrabajador = () => {
        const storedData = localStorage.getItem('noTrabajador')
        if (storedData) {
            setNoTrabajador(JSON.parse(storedData))
        } else {
            setNoTrabajador(null)
        }
        console.log(noTrabajador)
    }

    const getUsuarioId = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_usuario_noTrabajador/${noTrabajador}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.data.length > 0) {
                const usuario = response.data[0]; // Accede al primer objeto en el array
                setUsuarioId(usuario.id);
            } else {
                console.log("No se encontró ningún usuario.");
                toast.error("No se encontró ningún usuario con ese número de trabajador.");
            }
        } catch (error) {
            console.log("Ocurrió un error: " + error);
        }
    };


    const handlePacienteSeleccionado = (noTrabajadorSeleccionado) => {
        console.log("No trabajador", noTrabajadorSeleccionado);
        setValue("no_trabajador", noTrabajadorSeleccionado)
    };

    const enviar = handleSubmit(async data => {
        console.log(usuarioId)

        const nombreValido = validarNombreCompleto(data.nombre)
        const apellidoPValido = validarNombreCompleto(data.apellidoPaterno)
        const apellidoMValido = validarNombreCompleto(data.apellidoMaterno)
        const telefonoValido = validarTelefono(data.telefono)
        let cedulaDuplicada = empleados.some((empleado) => empleado.cedula_profesional == data.cedula_profesional)

        if (!nombreValido) {
            toast.error("Ingrese sólo letras en el nombre")
        } else if (!apellidoPValido) {
            toast.error("Ingrese sólo letras en el apellido paterno")
        } else if (!apellidoMValido) {
            toast.error("Ingrese sólo letras en el apellido materno")
        } else if (!telefonoValido) {
            toast.error('Recuerde sólo ocupar números y tienen que ser diez')
        } else if (mostrarCedula) {
            if (cedulaDuplicada) {
                toast.error('La cedula ya esta registrada en el sistema')
            }
            else {
                try {
                    console.log(data);
                    mensajeConfirmacionGuardar('l empleado', null, navegador, () => {
                        const empleadoRegistrado = registrarEmpleado(data); // Espera a que se registre el empleado
                        console.log(usuarioId, empleadoRegistrado.ocupacionNombre);                        
                        unirUsuarioGrupo(usuarioId, empleadoRegistrado.ocupacionNombre); // Llama a unirUsuarioGrupo con los datos del empleado registrado                    
                    })

                } catch (error) {
                    console.error('Error al registrar empleado:', error);
                }
            }
        } else {
            setValue('cedula_profesional', 'N/A')
            try {
                console.log(data);
                mensajeConfirmacionGuardar('l empleado', navegador, () => {
                    const empleadoRegistrado = registrarEmpleado(data); // Espera a que se registre el empleado
                    console.log(usuarioId, empleadoRegistrado.ocupacionNombre);
                    unirUsuarioGrupo(usuarioId, empleadoRegistrado.ocupacionNombre); // Llama a unirUsuarioGrupo con los datos del empleado registrado
                })

            } catch (error) {
                console.error('Error al registrar empleado:', error);
            }
        }

    })

    return (
        <div className='container'>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_administrador">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Crear empleado</li>
                    </ol>
                </nav>
            </div>
            {!noTrabajador && (
                <BuscarUsuario getNoTrabajador={handlePacienteSeleccionado}></BuscarUsuario>
            )}

            {/*<NavBarSimple />*/}

            <div className="ml-10 container mt-2">
                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            {/*Realmente lo que agarra es el id del usuario, no el nombre del usuario/número de trabajador */}
                            <label className="etiqueta" htmlFor="usuario">No. de trabajador
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="no_trabajador" type="text" placeholder="Número de trabajador" className="entrada"
                                value={noTrabajador} readOnly
                                {...register("no_trabajador", { required: true })} />
                        </div>
                        <div className='mt-2 mb-2 col'>

                            <label className="etiqueta" htmlFor="ocupacion">Ocupación
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            {/*Aun tengo que checar que se despliegue el ultimo input dependiendo de la opcion*/}
                            <select name="ocupacion" id="ocupacion" className="opciones"
                                onClick={handleOcupacionCambio}
                                {...register("ocupacion", { required: true })}>

                                <option value="" disabled selected>Elija la opción</option>
                                <option value="Medico">Médico general</option>
                                <option value="Enfermero">Enfermero</option>
                                <option value="Odontologo">Odontólogo</option>
                                <option value="Nutriologo">Nutriólogo</option>
                                <option value="Psicologo">Psicólogo</option>
                                <option value="audiologo">Audiólogo</option>
                                <option value="oftalmologo">Oftalmólogo</option>
                                <option value="Recepcion">Recepcionista de medicina general</option>
                                <option value="Recepcion">Recepcionista de odontología</option>
                                <option value="recepcion_psico">Recepcionista de psicología</option>
                            </select>
                            {errors.ocupacion && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="nombre">Nombre
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada"
                                {...register("nombre", { required: true })} />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="numeroTelefonico">Número telefónico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="numeroTelefonico" type="text" placeholder="Teléfono" className="entrada"
                                {...register("telefono", { required: true })} />
                            {errors.telefono && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoP">Apellido paterno
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                {...register("apellidoPaterno", { required: true })} />
                            {errors.apellido_paterno && <span>Es necesario este campo</span>}

                        </div>
                        {mostrarCedula &&
                            <div className="mt-2 mb-2 col">
                                <label className="etiqueta" htmlFor="cedula">Cédula profesional
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input id="cedula" type="text" placeholder="Cedula profesional" className="entrada"
                                    {...register("cedula_profesional")}
                                />
                                {errors.cedula_profesional && <span>Es necesario este campo</span>}
                            </div>
                        }
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoM">Apellido materno
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                {...register("apellidoMaterno", { required: true })} />
                            {errors.apellido_materno && <span>Es necesario este campo</span>}
                        </div>
                    </div>


                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">
                            Guardar
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
