import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';

export function FichaTecnica() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [showReferencia, setShowReferencia] = useState(false)
    const [grupo, setGrupo] = useState('')

    const handleReferencia = (e) => {
        setShowReferencia(e.target.value === "1");
    };

    useEffect(() => {
        const getNoEmpleado = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const no_Empleado = response.data.user_info.no_trabajador
                setNoEmpleado(no_Empleado)
                setGrupo(response.data.user_info.name)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getNoEmpleado();
    }, [token]);

    const registrarFicha = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_ficha_medica/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                motivo_consulta: data.motivo_consulta,
                observacion: data.observacion,
                "extras": {
                    visita: data.visita,
                    referencia: data.referencia,
                    lugar_referencia: data.lugar_ref
                },
                paciente: noExpediente,
                empleado: noEmpleado
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

    const enviar = handleSubmit(async data => {
        registrarFicha(data)        
        
        if (grupo === 'oftalmologo') {
            navegador('/home_oftalmologo');
        } else if (grupo === 'audiologo') {
            navegador('/home_audiologo');
        } else if (grupo === 'nutriologo') {
            navegador('/home_nutricion');
        }        
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
                    <BusquedaPaciente></BusquedaPaciente>
                </div>

                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="visita">Visita: </label>
                            <select className="opciones" id='visita' name='visita' type=""
                                {...register("visita", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Primera vez</option>
                                <option value="2">Subsecuente</option>
                            </select>
                        </div>
                        <div className="mt-2 col">
                            <label className='mt-2 etiqueta' htmlFor="referencia">Referencia: </label>
                            <select className="opciones" id='referencia' name='referencia' type=""
                                {...register("referencia", { required: true })}
                                onChange={handleReferencia}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>

                            {showReferencia && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="lugar_ref">Lugar de referencia</label>
                                    <textarea name="lugar_ref" id="lugar_ref" className="text-amplio"
                                        {...register("lugar_ref", { required: false })}></textarea>
                                </div>
                            )}
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
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
