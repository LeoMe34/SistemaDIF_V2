import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from "react-router-dom";

export function MostrarUsuario() {
    const { token } = useAuth()

    const [datosUsuario, setDatosUsuario] = useState({});

    const [idUsuario, setIdUsuario] = useState(null)

    const navegador = useNavigate()

    useEffect(() => {
        const storedId = localStorage.getItem('idUsuario');
        if (storedId) {
            setIdUsuario(parseInt(storedId, 10));
        }
    }, [token]);

    useEffect(() => {
        if (idUsuario !== null) {
            getDatosUsuario()
                .then(usuario => setDatosUsuario(usuario))
                .catch(error => setError(error));
        }
    }, [idUsuario]);

    const getDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_usuarios/${idUsuario}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return response.data.user_info;
        } catch (error) {
            console.error('Error al obtener datos de usuario:', error);
            throw error;
        }
    };

    const eliminarUsuario = async () => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/eliminar_usuario/${idUsuario}`, null, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            navegador('/home_administrador/')
        } catch (error) {
            console.error('Error al obtener datos de usuario:', error);
            throw error;
        }
    };

    return (
        <div className='container'>
            <div className="card-user">
                <div className="img">
                    <img src="../Logos/LOGO DIF.jpeg" alt="Logo del DIF" className="img-logos mx-2" />

                </div>
                <div className="content">
                    <h2>Perfil de empleado</h2>
                    <p>Datos del empleado en el DIF</p>
                    <div className="center container">
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="cedula">Cédula profesional:</label>
                            <input className="entrada" id='cedula' name='cedula' type="text" value={datosUsuario.cedula} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="nombre">Nombre:</label>
                            <input className="entrada" id='nombre' name='nombre' type="text" value={datosUsuario.nombre_empleado} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="num_emp">Número empleado:</label>
                            <input className="entrada" id='num_emp' name='num_emp' type="text" value={datosUsuario.no_trabajador} readOnly />
                        </div>

                        <div className="col">
                            <label className='etiqueta-user' htmlFor="rol">Rol:</label>
                            <input className="entrada" id='rol' name='rol' type="text" value={datosUsuario.ocupacion} readOnly />
                        </div>
                    </div>

                    <div className="center container">
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="correo">Correo electronico:</label>

                            <input className="entrada" id='correo' name='correo' type="text" value={datosUsuario.email} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="telefono">Número telefónico:</label>
                            <input className="entrada" id='telefono' name='telefono' type="text" value={datosUsuario.telefono} readOnly />
                        </div>
                    </div>

                    <div className="center container mt-5 pt-1 mb-3 ml-10">
                        <div className="col">
                            <div>
                                <button className="btn ml-10 btn-eliminar btn-lg btn-block" onClick={eliminarUsuario}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}