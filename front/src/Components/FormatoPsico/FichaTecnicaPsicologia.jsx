import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BuscarPacientePsico from '../Paciente/BuscarPacientePsico'


export function FichaTecnicaPsicologia() {
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
            const url = "http://127.0.0.1:8000/api/registrar_ficha_psicologia/"
            const respuesta = await axios.post(url, {
                fecha_visita: data.fecha,
                "visita": {
                    tipo_consulta: data.tipo_cons,
                    tipo_visita: data.visita,
                    acompaniante: data.acompania,
                    parentesco: data.parentesco,
                    escolaridad: data.escolaridad,
                    motivo_consulta: data.motivo_consulta
                },
                "tratamiento": {
                    tratamiento: data.tratamiento,
                    sugerencia: data.sugerencias,
                    valoracion: data.valoracion
                },
                "diagnostico": {
                    impresion_diagnostica: data.impresion_diagnostica,
                    antecedentes: data.antecedentes
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
                            <a href="\home_psicologia">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de psicología</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="mt-4 mb-4 subtitulo">Ficha técnica de psicología</h3>
            </div>

            <BuscarPacientePsico></BuscarPacientePsico>

            <h3 className="subtitulo_2">Datos del paciente</h3>
            <div className="ml-10 container">
                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className=" col">
                            <label className=' etiqueta' htmlFor="fecha">Fecha: </label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                {...register("fecha", { required: true })} />
                        </div>

                        <div className="mt-2 col">
                            <label className=' etiqueta' htmlFor="tipo_cons">Tipo de consulta: </label>
                            <select className="opciones" id='tipo_cons' name='tipo_cons' type=""
                                {...register("tipo_cons", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">TDAH</option>
                                <option value="2">Duelo</option>
                                <option value="3">Problemas de pareja</option>
                                <option value="4">Ansiedad</option>
                                <option value="5">Problema conductual</option>
                                <option value="6">Transtorno depresivo</option>
                                <option value="7">Problema de aprendizaje</option>
                                <option value="8">Separación de padres</option>
                                <option value="9">Manejo de impulsos</option>
                                <option value="10">Abuso sexual</option>
                                <option value="11">Autoestima</option>
                                <option value="12">Audiencia</option>
                                <option value="13">Brigada</option>
                                <option value="14">Terapia grupal</option>
                                <option value="15">Otro</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className='mt-2 etiqueta' htmlFor="visita">Visita: </label>
                            <select className="opciones" id='visita' name='visita' type=""
                                {...register("visita", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Primera vez</option>
                                <option value="2">Subsecuente</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="escolaridad">Escolaridad:</label>
                            <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                                {...register("escolaridad", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="acompania">Acompañante:</label>
                            <input className="entrada" id='acompania' name='acompania' type="text"
                                {...register("acompania", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="parentesco">Parentesco:</label>
                            <input className="entrada" id='parentesco' name='parentesco' type="text"
                                {...register("parentesco", { required: true })} />
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Datos del paciente</h3>
                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivo_consulta">Motivo de consulta</label>
                            <textarea id="motivo_consulta" placeholder="..." className="text-amplio"
                                {...register("motivo_consulta", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="antecedentes">Antecedentes</label>
                            <textarea id="antecedentes" placeholder="..." className="text-amplio"
                                {...register("antecedentes", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="impresion_diagnostica">Impresión diagnóstica</label>
                            <textarea id="impresion_diagnostica" placeholder="..." className="text-amplio"
                                {...register("impresion_diagnostica", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamiento">Tratamiento:</label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio"
                                {...register("tratamiento", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="sugerencias">Sugerencias y recomendaciones:</label>
                            <textarea id="sugerencias" placeholder="..." className="text-amplio"
                                {...register("sugerencias", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="valoracion">Valoración PE:</label>
                            <textarea id="valoracion" placeholder="..." className="text-amplio"
                                {...register("valoracion", { required: true })} />
                        </div>
                    </div>

                    <div className="mt-5 mb-4 text-center">
                        <label className="etiqueta" htmlFor="psicologo">Psicólogo(A)</label>
                        <input className="datos_lectura" id='psicologo' name='psicologo' type="text" readOnly />

                        <label className="etiqueta" htmlFor="cedula_psi">Cédula</label>
                        <input className="datos_lectura" id='cedula_psi' name='cedula_psi' type="text" readOnly />
                    </div>

                    {/*Seccion del boton*/}
                    <div className="pt-1 mt-3 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

