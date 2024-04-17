{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';
import { CrearUsuario } from './CrearUsuario';
import BuscarUsuario from './BuscarUsuario';
import { useUsuarioId } from '../../Contexto/UsuarioIdContext';




export function CrearEmpleado() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    /*const [, setUser] = useState(null);*/
    const { usuarioId } = useUsuarioId();


    const registrarEmpleado = async (data) => {
        console.log(usuarioId)
        try {
            const url = "http://127.0.0.1:8000/api/registrar_empleado/"
            const respuesta = await axios.post(url, {
                nombre: data.nombre,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                no_trabajador: data.no_trabajador,
                cedula_profesional: data.cedula,
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
                navegador("/crear_empleado");
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


    const enviar = handleSubmit(async data => {
        try {
            console.log(data);
            const empleadoRegistrado = await registrarEmpleado(data); // Espera a que se registre el empleado
            console.log(usuarioId, empleadoRegistrado.ocupacionNombre);
            await unirUsuarioGrupo(usuarioId, empleadoRegistrado.ocupacionNombre); // Llama a unirUsuarioGrupo con los datos del empleado registrado
        } catch (error) {
            console.error('Error al registrar empleado:', error);
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
            <BuscarUsuario></BuscarUsuario>
            {/*<NavBarSimple />*/}

            <div className="ml-10 container mt-2">
                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            {/*Realmente lo que agarra es el id del usuario, no el nombre del usuario/número de trabajador */}
                            <label className="etiqueta" htmlFor="usuario">No. de trabajador</label>
                            <input id="no_trabajador" type="text" placeholder="Número de trabajador" className="entrada"
                                {...register("no_trabajador", { required: true })} />
                        </div>
                        <div className='mt-2 mb-2 col'>

                            <label className="etiqueta" htmlFor="ocupacion">Ocupación</label>
                            {/*Aun tengo que checar que se despliegue el ultimo input dependiendo de la opcion*/}
                            <select name="ocupacion" id="ocupacion" className="opciones"
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
                            <label className="etiqueta" htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada"
                                {...register("nombre", { required: true })} />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                            <input id="numeroTelefonico" type="text" placeholder="Teléfono" className="entrada"
                                {...register("telefono", { required: true })} />
                            {errors.telefono && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                {...register("apellidoPaterno", { required: true })} />
                            {errors.apellido_paterno && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                {...register("apellidoMaterno", { required: true })} />
                            {errors.apellido_materno && <span>Es necesario este campo</span>}
                        </div>
                    </div>


                    {/*mostrarCedula && */} <div className="mb-4">
                        <label className="etiquetas" htmlFor="cedula">Cédula profesional</label>
                        <input id="cedula" type="text" placeholder="Cedula profesional" className="entrada"
                            {...register("cedula_profesional")}
                        />
                        {errors.cedula_profesional && <span>Es necesario este campo</span>}
                    </div>{/**/}


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
