import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"

export function MostrarNotaMedica() {
    const [fichaMedica, setFichaMedica] = useState(null);
    const [historiaClinica, setHistoriaClinica] = useState(null);
    const [notaMedica, setNotaMedica] = useState(null);
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

    useEffect(() => {
        if (noExpediente && fecha) {
            getFichasMedicas();
        }
    }, [noExpediente, fecha, token]);

    useEffect(() => {
        if (fichaMedica?.id) {
            getHistoriaClinica(fichaMedica.id);
        }
    }, [fichaMedica]);

    useEffect(() => {
        if (historiaClinica?.id) {
            getNotaMedica(historiaClinica.id);
        }
    }, [historiaClinica]);

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Notas médicas</li>
                    </ol>
                </nav>
            </div>

            <h3 className='subtitulo'>Notas médicas</h3>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                        <input className="entrada" id='fecha' name='fecha' type="text"
                            value={notaMedica?.fecha_consulta} />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="hora">Hora:</label>
                        <input className="entrada" id='hora' name='hora' type="text"
                            value={notaMedica?.hora_consulta} />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="servicio">Servicio:</label>
                        <input className="entrada" id='servicio' name='servicio' type="text"
                            value={notaMedica?.servicio} />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="diagnostico">Diagnóstico:</label>
                        <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="5" cols="10"
                            value={notaMedica?.diagnostico} />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="tratamiento">Tratamiento:</label>
                        <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="5" cols="10"
                            value={notaMedica?.tratamiento} />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="observaciones">Observaciones:</label>
                        <textarea id="observaciones" placeholder="..." className="text-amplio" rows="5" cols="10"
                            value={notaMedica?.observaciones} />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta' htmlFor="firma">Firma:</label>
                    </div>
                </div>
            </div>

        </div>
    )
}