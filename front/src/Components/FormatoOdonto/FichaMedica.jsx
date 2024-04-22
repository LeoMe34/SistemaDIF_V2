import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"

export function FichaMedica() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [noExpediente, setNotExpediente] = useState(null)
    const [idNota, setIdNota] = useState(null);

    const getExp = () => {
        const storedData = localStorage.getItem('noExp')
        if (storedData) {
            setNotExpediente(JSON.parse(storedData))
        } else {
            setNotExpediente(null)
        }
        console.log(noExpediente)
    }

    const handlePacienteSeleccionado = (noExpediente) => {
        console.log("No exp", noExpediente);
        setNotExpediente(noExpediente)
    };

    const getIdNota = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_ultima_notaEvo/?no_expediente=${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setIdNota(response.data.id)
            console.log(idNota)
        } catch (error) {
            console.error('Error al obtener ID del historial:', error);
        }
    }

    const registrarFicha = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_ficha_medicaO/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                motivo_consulta: data.motivo_consulta,
                observacion: data.observacion,
                notaEvo: idNota,
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

    useEffect(() => {
        getExp();
    }, []);

    useEffect(() => {
        if (noExpediente) {
            getIdNota();
        }
    }, [noExpediente]);

    const enviar = handleSubmit(async data => {
        registrarFicha(data)
        navegador('/nota_evo')
    })

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
                <div className="ml-10">
                    {!noExpediente && (
                        <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                    )}
                </div>

                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="peso">Peso: </label>
                            <input className="entrada" id='peso' name='peso' type="text" />

                            <label className='mt-2 etiqueta' htmlFor="correo">Correo electrónico: </label>
                            <input className="entrada" id='correo' name='correo' type="text" />
                        </div>

                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="talla">Talla: </label>
                            <input className="entrada" id='talla' name='talla' type="text" />

                            <label className='mt-2 etiqueta' htmlFor="profesion">Profesión: </label>
                            <input className="entrada" id='profesion' name='profesion' type="text" />
                        </div>

                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="lugar_nacimiento">Lugar de nacimiento: </label>
                            <input className="entrada" id='lugar_nacimiento' name='lugar_nacimiento' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta</label>
                            <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30"
                                {...register("diagnostico", { required: true })} />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="diagMedi">Diagnostico medico</label>
                            <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30"
                                {...register("motivo_consulta", { required: true })} />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="observacion">Observación</label>
                            <textarea id="observacion" placeholder="Observaciones" className="text-amplio" rows="10" cols="30"
                                {...register("observacion", { required: true })} />
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
