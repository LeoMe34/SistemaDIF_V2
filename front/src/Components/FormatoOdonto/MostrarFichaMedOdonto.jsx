import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"

export function MostrarFichaMedOdonto() {
    const [histOdont, setHistOdont] = useState(null);
    const [empleado, setEmpleado] = useState([])
    const [notaEvo, setNotaEvo] = useState(null);
    const [fichaMedOdonto, setFichaMedOdonto] = useState(null);
    const { noExpediente, fecha } = useParams();
    const { token } = useAuth();

    const getHistOdonto = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_hist_odonto/${noExpediente}/${fecha}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setHistOdont(response.data);
            console.log('Datos de historial odonto:', response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const getEmpleadoFicha = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_empleado/${histOdont.empleado}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data);
        } catch (error) {
            console.error('Error al obtener al empleado', error);
        }
    };

    const getNotaEvo = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_notaEvo_Odonto/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setNotaEvo(response.data);
            console.log('Datos de nota evo:', response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    const getFichaMedOdonto = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_fichaMed_Odonto/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaMedOdonto(response.data);
            console.log('Datos de ficha médica odonto:', response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    useEffect(() => {
        if (noExpediente && fecha) {
            getHistOdonto();
        }
    }, [noExpediente, fecha, token]);

    useEffect(() => {
        if (histOdont?.id) {
            getEmpleadoFicha()
            getNotaEvo(histOdont.id);
        }
    }, [histOdont]);

    useEffect(() => {
        if (notaEvo?.id) {
            getFichaMedOdonto(notaEvo.id);
        }
    }, [notaEvo]);

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            {/*El home al que regrese dependera del tipo de  usuario, si es medico, odontologo o nutriologo*/}
                            <a href="\">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de consulta médica</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="subtitulo">Ficha técnica de consulta médica</h3>
                {/*Nutricion, medicina, odontologo */}

            </div>

            <div className="ml-10 container">

                <div className="mt-2 row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta</label>
                        <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30"
                            value={fichaMedOdonto?.motivo_consulta} readOnly/>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="diagMedi">Diagnostico medico</label>
                        <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30"
                            value={fichaMedOdonto?.diagnostico} readOnly/>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="observacion">Observación</label>
                        <textarea id="observacion" placeholder="Observaciones" className="text-amplio" rows="10" cols="30"
                            value={fichaMedOdonto?.observacion} readOnly/>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="medico">Odontólogo:</label>
                            <input className="datos_lectura" id='medico' name='medico' type="text"
                                value={empleado.nombre + " " + empleado.apellidoPaterno + " " + empleado.apellidoMaterno} readOnly />
                            <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                            <input className="datos_lectura" id='cedula' name='cedula' type="text"
                                value={empleado.cedula_profesional} readOnly />
                            <label className='etiqueta' htmlFor="firma">Firma:</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
