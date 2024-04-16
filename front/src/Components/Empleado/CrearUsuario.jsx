{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';

export function CrearUsuario() {
    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [correo, setCorreo] = useState('')
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
            console.log(contrasenia)
            const datosUsuario = respuesta.data.user_info;
            if ('username' in datosUsuario) {
                console.log("Usuario registrado correctamente");
                navegador("/crear_empleado");
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

                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}