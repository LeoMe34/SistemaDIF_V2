import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function Usuario() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null)
    const [cedula, setCedula] = useState(null)
    const [email, setEmail] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [id, setId] = useState(null)
    const [detalleEmpleado, setDetalleEmpleado] = useState({});
    const [editando, setEditando] = useState(false);


    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            const nombre = response.data.user_info.nombre_empleado
            const cedula = response.data.user_info.cedula_profesional
            const correo = response.data.user_info.email
            setNoEmpleado(no_Empleado)
            setNombre(nombre)
            setCedula(cedula)
            setEmail(correo)
            setId(response.data.user_info.id)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    const getDatosEmpleado = async () => {
        try {

            const response = await axios.get("http://127.0.0.1:8000/api/get_empleado/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetalleEmpleado(response.data)
            setTelefono(response.data.telefono)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener los datos del empleado:', error);
        }
    };

    useEffect(() => {
        getNoEmpleado();
        getDatosEmpleado();
    }, [token, noEmpleado]);

    const handleEditarPerfil = () => {
        setEditando(true);
    };

    const handleGuardarCambios = async () => {
        console.log(detalleEmpleado.id)
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/editar_empleado/${id}`, {
                email: email,
                telefono: telefono
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Datos actualizados:', response.data);
            setEditando(false);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    }
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    return (
        <div className='container'>
            <h2 className="subtitulo">Perfil de usuario</h2>
            <div className="card-user">
                <div className="img">
                    <img src="../Logos/LOGO DIF.jpeg" alt="Logo del DIF" className="img-logos mx-2" />

                </div>
                <div className="content">
                    <h2>Nombre del empleado</h2>
                    <p>posición en el DIF</p>
                    <div className="center container">
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="cedula">Cédula profesional:</label>
                            <input className="entrada" id='cedula' name='cedula' type="text" value={cedula} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="nombre">Nombre:</label>
                            <input className="entrada" id='nombre' name='nombre' type="text" value={nombre} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="num_emp">Número empleado:</label>
                            <input className="entrada" id='num_emp' name='num_emp' type="text" value={noEmpleado} readOnly />
                        </div>
                        {/*
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="area">Área:</label>
                            <input className="entrada" id='area' name='area' type="text" value={detalleEmpleado.area} readOnly />
                        </div>
                         */}
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="rol">Rol:</label>
                            <input className="entrada" id='rol' name='rol' type="text" value={detalleEmpleado.ocupacion} readOnly />
                        </div>
                    </div>

                    <div className="center container">
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="correo">Correo electronico:</label>
                            {editando ? (
                                <input className="entrada" id='correo' name='correo' type="text" value={email} onChange={handleEmailChange} />
                            ) : (
                                <input className="entrada" id='correo' name='correo' type="text" value={email} readOnly />
                            )}
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="telefono">Número telefónico:</label>
                            {editando ? (
                                <input className="entrada" id='telefono' name='telefono' type="text" value={telefono} onChange={handleTelefonoChange} />
                            ) : (
                                <input className="entrada" id='telefono' name='telefono' type="text" value={telefono} readOnly />
                            )}
                        </div>
                    </div>

                    <div className="center container pt-1 mb-3 ml-10">
                        <div className="col">
                            {editando ? (
                                <div>
                                    <button className="btn btn-guardar btn-lg btn-block" onClick={handleGuardarCambios}>
                                        Guardar cambios
                                    </button>

                                    <button className="btn ml-10 btn-cancelar btn-lg btn-block" onClick={handleGuardarCambios}>
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-guardar btn-lg btn-block" onClick={handleEditarPerfil}>
                                        Editar perfil
                                    </button>
                                    <button className="btn ml-10 btn-guardar btn-lg btn-block">
                                        Cambiar contraseña
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}