import React, { useEffect, useState } from 'react';
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom';

export function MostrarReceta() {
    const [fichaMedica, setFichaMedica] = useState(null);
    const [empleado, setEmpleado] = useState([])
    const [historiaClinica, setHistoriaClinica] = useState(null);
    const [notaMedica, setNotaMedica] = useState(null);
    const [receta, setReceta] = useState(null);
    const { noExpediente, fecha } = useParams();
    const { token } = useAuth();

    const getFichasMedicas = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_medica/${noExpediente}/${fecha}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaMedica(response.data);
            console.log('Datos de ficha médica:', response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const getEmpleadoFicha = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_empleado/${fichaMedica.empleado}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data)
        } catch (error) {
            console.error('Error al obtener al empleado', error);
        }
    };

    const getHistoriaClinica = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_historia_clinica/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setHistoriaClinica(response.data);
            console.log('Datos del historial clínico:', response.data);
        } catch (error) {
            console.error('Error al obtener el historial clínico:', error);
        }
    };

    const getNotaMedica = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_detalles_NM/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setNotaMedica(response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    const getReceta = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_receta/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setReceta(response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    useEffect(() => {
        if (noExpediente && fecha) {
            getFichasMedicas();
        }
    }, [noExpediente, fecha, token]);

    useEffect(() => {
        if (fichaMedica?.id) {
            getEmpleadoFicha()
            getHistoriaClinica(fichaMedica.id);
        }
    }, [fichaMedica]);

    useEffect(() => {
        if (historiaClinica?.id) {
            getNotaMedica(historiaClinica.id);
        }
    }, [historiaClinica]);

    useEffect(() => {
        if (notaMedica?.id) {
            getReceta(notaMedica.id);
        }
    }, [notaMedica]);

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {/*Cambiar dependiendo del si es doctor o nutri */}
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_medico">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\ficha_tecnica_medico">
                                Ficha técnica de consulta médica
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\historia_clinica_simplificada">
                                Historia Clínica Simplificada
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\historia_clinica_simplificada">
                                Notas médicas
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Receta</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="subtitulo">Receta medica</h3>
            </div>

            <div className="ml-10 mb-3 col">
                <label className="etiqueta" htmlFor="tratamiento">Tratamiento</label>
                <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="10" cols="30"
                    value={receta?.medicamento?.tratamiento} readOnly/>
            </div>
            <div className='ml-10 mb-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text"
                            value={empleado.nombre + " " + empleado.apellidoPaterno + " " + empleado.apellidoMaterno} readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text"
                            value={empleado.cedula_profesional} readOnly />
                        <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                    </div>
                </div>
            </div>

            <div className="mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div>
    )
}