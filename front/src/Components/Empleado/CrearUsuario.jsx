{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';

export function CrearUsuario() {
    const [errors] = useState({});
    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [correo, setCorreo] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidoPaterno, setapellidoPaterno] = useState('')
    const [apellidoMaterno, setapellidoMaterno] = useState('')
    const [no_trabajador, setNoTrabajador] = useState('')
    const [cedula_profesional, setCedula] = useState('')
    const [ocupacion, setOcupacion] = useState('')
    const [telefono, setTelefono] = useState('')
    const navegador = useNavigate();
    const { token } = useAuth()

    const registrarUsuario = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar/"
            const respuesta = await axios.post(url, {
                username: usuario,
                password: contrasenia,
                email: correo,
                nombre: nombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                no_trabajador: no_trabajador,
                cedula_profesional: cedula_profesional,
                ocupacion: ocupacion,
                telefono: telefono,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            const datosUsuario = respuesta.data.user_info;
            if ('username' in datosUsuario) {
                console.log("Usuario registrado correctamente");
                navegador("/crear_paciente");
            } else {
                console.log("Usuario duplicado");
            }
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registrarUsuario()
    }

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
                <form onSubmit={handleSubmit}>
                    <h3 className="titulo">Registrar usuario</h3>                    
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
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            {/*Realmente lo que agarra es el id del usuario, no el nombre del usuario/número de trabajador */}
                            <label className="etiqueta" htmlFor="usuario">No. de trabajador</label>
                            <input id="no_trabajador" type="text" placeholder="Número de trabajador" className="entrada"
                                onChange={(e) => setNoTrabajador(e.target.value)} />
                        </div>
                        <div className='mt-2 mb-2 col'>

                            <label className="etiqueta" htmlFor="ocupacion">Ocupación</label>
                            {/*Aun tengo que checar que se despliegue el ultimo input dependiendo de la opcion*/}
                            <select name="ocupacion" id="ocupacion" className="opciones"
                                onChange={(e) => setOcupacion(e.target.value)} >

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
                                onChange={(e) => setNombre(e.target.value)} />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                            <input id="numeroTelefonico" type="text" placeholder="Teléfono" className="entrada"
                                onChange={(e) => setTelefono(e.target.value)} />
                            {errors.telefono && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                onChange={(e) => setapellidoPaterno(e.target.value)} />
                            {errors.apellido_paterno && <span>Es necesario este campo</span>}

                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                onChange={(e) => setapellidoMaterno(e.target.value)} />
                            {errors.apellido_materno && <span>Es necesario este campo</span>}
                        </div>
                    </div>


                    {/*mostrarCedula && */} <div className="mb-4">
                        <label className="etiquetas" htmlFor="cedula">Cédula profesional</label>
                        <input id="cedula" type="text" placeholder="Cedula profesional" className="entrada"
                            onChange={(e) => setCedula(e.target.value)}
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