import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';
import { CrearEmpleado } from './CrearEmpleado';

export function UserEmp() {
    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [correo, setCorreo] = useState('')
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navegador = useNavigate()
    const { token } = useAuth()


    const registrarUsuario = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar/"
            const respuesta = await axios.post(url, {
                username: usuario,
                password: contrasenia,
                email: correo
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            const url2 = "http://127.0.0.1:8000/api/registrar_empleado/"
            const respuesta2 = await axios.post(url, {
                "datos_personales": {
                    nombre: data.nombre,
                    apellido_paterno: data.apellido_paterno,
                    apellido_materno: data.apellido_materno
                },
                no_trabajador: data.no_trabajador,
                cedula_profesional: data.cedula,
                ocupacion: data.ocupacion,
                telefono: data.telefono
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            const datosUsuario = respuesta.data.user_info;
            if ('username' in datosUsuario) {
                console.log("Usuario registrado correctamente");
                navegador("/crear_empleado");
            } else {
                console.log("Usuario duplicado");
            }
            const datosEmpleado = respuesta.data.no_trabajador;
            if ('no_trabajador' in datosEmpleado) {
                console.log("Usuario registrado correctamente");
                navegador("/crear_empleado");
            } else {
                console.log("Usuario duplicado");
            }
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }


    const enviar = handleSubmit(async data => {
        e.preventDefault()
        registrarUsuario(data)

    })

    {/* const handleSubmit = (e) => {
        e.preventDefault()
        registrarUsuario()
    }*/}

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
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\crear_empleado">
                                Crear empleado
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Registrar usuario</li>
                    </ol>
                </nav>
            </div>

            {/*<NavBarSimple />*/}
            <div className="ml-10 container mt-3">
                <form onSubmit={enviar}>
                    <h3 className="titulo">Registrar usuario</h3>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="noTrabajador">Número de trabajador</label>
                            <input id="noTrabajador" type="text" placeholder="No. de trabajador" className="entrada" readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="usuario">Usuario</label>
                            <input id="usuario" type="text" className="entrada"
                                onChange={(e) => setUsuario(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="email">Correo electrónico</label>
                            <input id="email" type="text" placeholder="Correo electrónico" className="entrada"
                                onChange={(e) => setCorreo(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="contrasenia">Contraseña</label>
                            <input id="contrasenia" type="password" placeholder="Contraseña" className="entrada"
                                onChange={(e) => setContrasenia(e.target.value)} />
                        </div>
                    </div>

                    {/*-----------------SECCION DE EMPLEADO-------------------------------------------------*/}
                    {/*-----------------SECCION DE EMPLEADO-------------------------------------------------*/}
                    {/*-----------------SECCION DE EMPLEADO-------------------------------------------------*/}


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
                                <option value="medicogral">Médico general</option>
                                <option value="odontologo">Odontólogo</option>
                                <option value="nutriologo">Nutriólogo</option>
                                <option value="psicologo">Psicólogo</option>
                                <option value="audiologo">Audiólogo</option>
                                <option value="oftalmologo">Oftalmólogo</option>
                                <option value="recepcion_medicina">Recepcionista de medicina general</option>
                                <option value="recepcion_odonto">Recepcionista de odontología</option>
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
                                {...register("apellido_paterno", { required: true })} />
                            {errors.apellido_paterno && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                {...register("apellido_materno", { required: true })} />
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
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}