import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function Usuario() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null)
    const [cedula, setCedula] = useState(null)
    const [email, setEmail] = useState(null)
    const [detalleEmpleado, setDetalleEmpleado] = useState({});


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
            console.log(response)
        } catch (error) {
            console.error('Error al obtener los datos del empleado:', error);
        }
    };

    useEffect(() => {
        getNoEmpleado();
        getDatosEmpleado();
    }, [token, noEmpleado]);

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
                            <input className="entrada" id='correo' name='correo' type="text" value={email} readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="telefono">Número telefónico:</label>
                            <input className="entrada" id='telefono' name='telefono' type="text" value={detalleEmpleado.telefono} readOnly />
                        </div>                        
                    </div>
                </div>
            </div>

        </div>
    )
}