import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';


export function NotaSubsecuente1() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [idHistOdonto, setHistOdonto] = useState(null)
    const { noExpediente } = useNoExpediente()

    const getIdHistorialOdonto = async (noExpediente) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getNotaEvo/?no_expediente=${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setHistOdonto(response.data[0].id)
            console.log(idHistOdonto)
        } catch (error) {
            console.error('Error al obtener ID del historial:', error);
        }
    }

    const registrarNotaEvoOdonto = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_notaEvoOdont/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                tratamiento: data.tratamiento,
                plan: data.plan,
                histlOdonto: idHistOdonto
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const enviar = async (data) => {
        registrarNotaEvoOdonto(data, idHistOdonto);
        navegador('/nota_evo')
    }
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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Diagnóstico</li>
                    </ol>
                </nav>
            </div>
            <div className='mt-3 mb-4 container'>
                <BusquedaPaciente getIdHistorialMedico={getIdHistorialOdonto} />
            </div>

            <div className="mt-3 ml-10 container">
                <label htmlFor="fecha">Fecha: </label>
                <input type="date" />
            </div>

            <form onSubmit={handleSubmit(enviar)}>

                <div className="mt-3 ml-10 container">
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="diagnostico">Diagnóstico:</label>
                        <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5"
                            {...register("diagnostico", { required: true })} />
                    </div>

                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="plan">Plan a seguir:</label>
                        <textarea id="plan" type="text" placeholder="Plan" className="entrada" rows="5"
                            {...register("plan", { required: true })} />
                    </div>

                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="tratamiento">Tratamiento:</label>
                        <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="5"
                            {...register("tratamiento", { required: true })} />
                    </div>
                    
                </div>


                <div className='mt-2 mb-2 container'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}