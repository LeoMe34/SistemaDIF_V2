import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }


export function FichaTecnicaEnfermeria() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);

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

    const registrarFicha = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_ficha_enfermeria/"
            const respuesta = await axios.post(url, {
                fecha: data.fecha,
                "signosVitales": {
                    presion: data.presion,
                    frecuenciaC: data.frecuencia_cardiaca,
                    frecuenciaR: data.frecuencia_respiratoria,
                    temperatura: data.temperatura,
                    glicemia: data.glicemia
                },
                "datosFisicos": {
                    peso: data.peso,
                    talla: data.talla,
                    imc: data.imc
                },
                servicio_enfermeria: data.tipo_atencion,
                trabajador: data.es_trabajador,
                "datosDemograficos": {
                    religion: data.religion,
                    escolaridad: data.escolaridad,
                    discapacitado: data.discapacitado,
                    adulto_mayor: data.adulto_mayor,
                    embarazada: data.embarazada,
                    ninguna: data.ninguno
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
    })

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_enfermeria">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de enfermería</li>
                    </ol>
                </nav>
            </div>
            <h3 className='subtitulo'>Ficha técnica de enfermería</h3>

            <BusquedaPaciente></BusquedaPaciente>

            <form onSubmit={enviar}>
                <div className='ml-10 mt-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha: </label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                {...register("fecha", { required: true })} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="es_trabajador">Trabajador: </label>
                            <select className="opciones" id='es_trabajador' name='es_trabajador' type=""
                                {...register("es_trabajador", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className='ml-10 mt-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="peso">Peso: </label>
                            <input className="entrada" id='peso' name='peso' type="text"
                                {...register("peso", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="talla">Talla: </label>
                            <input className="entrada" id='talla' name='talla' type="text"
                                {...register("talla", { required: true })} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="imc">IMC: </label>
                            <input className="entrada" id='imc' name='imc' type="text"
                                {...register("imc", { required: true })} />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='subtitulo'>Registro de signos vitales</h3>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_atencion">Tipo de atención</label>
                                <select className="opciones" id='tipo_atencion' name='tipo_atencion' type=""
                                    {...register("tipo_atencion", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="1">Consulta general</option>
                                    <option value="2">Curación</option>
                                    <option value="3">Retiro de puntos</option>
                                    <option value="4">Aplicación de medicamentos</option>
                                    <option value="5">DxTx</option>
                                </select>
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="presion">T/A: </label>
                                <input className="entrada" id='presion' name='presion' type="text"
                                    {...register("presion", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="frecuencia_cardiaca">Frecuencia cardiaca: </label>
                                <input className="entrada" id='frecuencia_cardiaca' name='frecuencia_cardiaca' type="text"
                                    {...register("frecuencia_cardiaca", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="frecuencia_respiratoria">Frecuencia respiratoria: </label>
                                <input className="entrada" id='frecuencia_respiratoria' name='frecuencia_respiratoria' type="text"
                                    {...register("frecuencia_respiratoria", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="temperatura">Temperatura: </label>
                                <input className="entrada" id='temperatura' name='temperatura' type="text"
                                    {...register("temperatura", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="glicemia">Glicemia capilar: </label>
                                <input className="entrada" id='glicemia' name='glicemia' type="text"
                                    {...register("glicemia", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="religion">Religión: </label>
                                <input className="entrada" id='religion' name='religion' type="text"
                                    {...register("religion", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="escolaridad">Escolaridad: </label>
                                <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                                    {...register("escolaridad", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_poblacion">Tipo de población</label>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" type="checkbox" id='discapacitado' name='discapacitado'
                                        {...register("discapacitado")} />
                                    <label className='form-check-label etiqueta' htmlFor="discapacitado">Discapacitado</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='adulto_mayor' name='adulto_mayor' type="checkbox"
                                        {...register("adulto_mayor")} />
                                    <label className='form-check-label etiqueta' htmlFor="adulto_mayor">Adulto mayor</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='embarazada' name='embarazada' type="checkbox"
                                        {...register("embarazada")} />
                                    <label className='form-check-label etiqueta' htmlFor="embarazada">Embarazada</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='ninguna' name='ninguna' type="checkbox"
                                        {...register("ninguna")} />
                                    <label className='form-check-label etiqueta' htmlFor="ninguna">Ninguna</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="enfermero">Enfermero</label>
                                <input className="datos_lectura" id='enfermero' name='enfermero' type="text" readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}