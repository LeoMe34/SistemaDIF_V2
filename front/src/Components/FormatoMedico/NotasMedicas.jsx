import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"

export function NotasMedicas() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [idHistorial, setIdHistorial] = useState(null)
    //const [noEmpleado, setNoEmpleado] = useState(null);
    /*
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
                    console.log(response)
                } catch (error) {
                    console.error('Error al obtener ID de empleado:', error);
                }
            };
    
            getNoEmpleado();
        }, [token]);
    */
    const getIdHistorialM = async (noExpediente) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getHistorialM/?no_expediente=${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setIdHistorial(response.data[0].id)
            console.log(idHistorial)
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    }

    const registrarNota = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/crear_nota_medica/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                tratamiento: data.tratamiento,
                observaciones: data.observaciones,
                fecha_consulta: data.fecha,
                hora_consulta: data.hora,
                servicio: data.servicio,
                histMedic: idHistorial
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
        registrarNota(data, idHistorial);
        localStorage.setItem('idHistorial', JSON.stringify(idHistorial));

        navegador('/receta');

    }

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
                <div className="ml-10 mb-3">
                    <BusquedaPaciente getIdHistorialMedico={getIdHistorialM} />
                </div>
            </div>
            <form onSubmit={handleSubmit(enviar)}>
                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                            <input className="entrada" id='fecha' name='fecha' type="text"
                                {...register("fecha", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="hora">Hora:</label>
                            <input className="entrada" id='hora' name='hora' type="text"
                                {...register("hora", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="servicio">Servicio:</label>
                            <input className="entrada" id='servicio' name='servicio' type="text"
                                {...register("servicio", { required: true })} />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="diagnostico">Diagnóstico:</label>
                            <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("diagnostico", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tratamiento">Tratamiento:</label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("tratamiento", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="observaciones">Observaciones:</label>
                            <textarea id="observaciones" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("observaciones", { required: true })} />
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

                <div className="pt-1 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}