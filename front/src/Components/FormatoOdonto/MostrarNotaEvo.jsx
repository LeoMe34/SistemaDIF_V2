import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';


export function MostrarNotaEvo() {
    const [histOdont, setHistOdont] = useState(null);
    const [empleado, setEmpleado] = useState([])
    const [notaEvo, setNotaEvo] = useState(null);
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
            console.log('Datos de ficha médica:', response.data);
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
            console.log('Datos de ficha médica:', response.data);
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
        }
    }, [histOdont]);

    useEffect(() => {
        if (histOdont?.id) {
            getNotaEvo(histOdont.id);
        }
    }, [histOdont]);

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_odontologo">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\antecedente">
                                Antecedentes
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\hist_dent">
                                Historial clinico dental
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Nota Evolución</li>
                    </ol>
                </nav>
            </div>

            <div className="mt-3 ml-10 container">
                <label htmlFor="fecha">Fecha: </label>
                <input type="text" value={notaEvo?.fecha} />
            </div>

            <h2 className='subtitulo'>Nota Evolución/Subsecuente</h2>

            <div className="mt-3 ml-10 container">
                <div className="col">
                    <label className="etiqueta mb-2" htmlFor="notas">Notas: </label>
                    <textarea id="notas" placeholder="Notas" className="text-amplio" rows="5"
                        value={notaEvo?.notas} />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="diagnostico">Diagnóstico:</label>
                    <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5"
                        value={notaEvo?.diagnostico} />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="tratamiento">Tratamiento:</label>
                    <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="5"
                        value={notaEvo?.tratamiento} />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="plan">Plan a seguir:</label>
                    <textarea id="plan" type="text" placeholder="Plan" className="entrada" rows="5"
                        value={notaEvo?.plan} />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="tratamiento">Resumen de la consulta:</label>
                    <textarea id="resumen" type="text" placeholder="resumen" className="entrada" rows="5"
                        value={notaEvo?.resumen_consulta} />
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
    )
}