import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';

export function MostrarFichaTecnicaMedico() {
    const navegador = useNavigate()
    const { token } = useAuth()    
    const { noExpediente } = useNoExpediente()
    const { fecha } = useParams();
    const [detalles, setDetalles] = useState([])

    const getFichas = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_medica/${noExpediente}/${fecha}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response)
            setDetalles(response.data)
        } catch (error) {
            console.error('Error al obtener la ficha', error);
        }
    };

    useEffect(() => {
        getFichas();
    }, [fecha, token]);

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
                <form >
                    <label className='etiqueta' htmlFor="fecha">Fecha: </label>
                    <input className="entrada" id='fecha' name='fecha' type="date" value={fecha} readOnly/>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta</label>
                            <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30" value={detalles.motivo_consulta}/>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="diagMedi">Diagnostico medico</label>
                            <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30" value={detalles.diagnostico}/>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="observacion">Observación</label>
                            <textarea id="observacion" placeholder="Observaciones" className="text-amplio" rows="10" cols="30" value={detalles.observacion}/>
                        </div>
                    </div>

                    <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                    <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
