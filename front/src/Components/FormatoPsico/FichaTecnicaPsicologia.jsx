import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BuscarPacientePsico from '../Paciente/BuscarPacientePsico'
import { toast } from 'react-hot-toast'

export function FichaTecnicaPsicologia() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [empleado, setEmpleado] = useState([]);
    const [fechaActual, setFechaActual] = useState('')

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
                setEmpleado(response.data.user_info)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getNoEmpleado();
    }, [token]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

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

    const validarEscolaridad = (escolar) => {
        const escolarRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-]{1,80}$/

        return escolarRegex.test(escolar)
    }

    const validarAcompanianteYParentesco = (acompanianteyParentesco) => {
        const acompanianteyParentescoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ\s]{1,80}$/

        return acompanianteyParentescoRegex.test(acompanianteyParentesco)
    }

    const validarTexto = (entrada) => {
        const entradaRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,10000}$/

        return entradaRegex.test(entrada)
    }

    const enviar = handleSubmit(async data => {
        const escolaridadValido = validarEscolaridad(data.escolaridad)
        const acompaniaValido = validarAcompanianteYParentesco(data.acompania)
        const parentescoValido = validarAcompanianteYParentesco(data.parentesco)
        const motivoValido = validarTexto(data.motivo_consulta)
        const antecedenteValido = validarTexto(data.antecedentes)
        const impresionValido = validarTexto(data.impresion_diagnostica)
        const tratamientoValido = validarTexto(data.tratamiento)
        const sugerenciaValido = validarTexto(data.sugerencias)
        const valoracionValido = validarTexto(data.valoracion)
        if (!escolaridadValido) {
            toast.error("En el campo de parentesco solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-");
        } else if (!acompaniaValido) {
            toast.error("En el campo de acompañante solo se puede ingresar caracteres alfabeticos");
        } else if (!parentescoValido) {
            toast.error("En el campo de parentesco solo se puede ingresar caracteres alfabeticos");
        } else if (!motivoValido) {
            toast.error("En el campo de motivo de consulta solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!antecedenteValido) {
            toast.error("En el campo de antecedentes solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!impresionValido) {
            toast.error("En el campo de impresión diagnóstica solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!tratamientoValido) {
            toast.error("En el campo de tratamiento solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!sugerenciaValido) {
            toast.error("En el campo de sugerencias y recomendaciones solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!valoracionValido) {
            toast.error("En el campo de valoración PE solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (noExpediente === null) {
            toast.error("Debe seleccionar un paciente");
        }
        else {
            registrarFicha(data)
            navegador("/home_psicologia")
        }

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
                            <label className=' etiqueta' htmlFor="fecha">Fecha </label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                value={fechaActual} readOnly
                                {...register("fecha", { required: true })} />
                        </div>

                        <div className="mt-2 col">
                            <label className=' etiqueta' htmlFor="tipo_cons">Tipo de consulta
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
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
                            {errors.tipo_cons && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className='mt-2 etiqueta' htmlFor="visita">Visita
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select className="opciones" id='visita' name='visita' type=""
                                {...register("visita", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Primera vez</option>
                                <option value="2">Subsecuente</option>
                            </select>
                            {errors.visita && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="escolaridad">Escolaridad
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                                {...register("escolaridad", { required: true })} />
                            {errors.escolaridad && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="acompania">Acompañante
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='acompania' name='acompania' type="text"
                                {...register("acompania", { required: true })} />
                            {errors.acompania && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="parentesco">Parentesco
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='parentesco' name='parentesco' type="text"
                                {...register("parentesco", { required: true })} />
                            {errors.parentesco && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Datos del paciente</h3>
                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivo_consulta">Motivo de consulta
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="motivo_consulta" placeholder="..." className="text-amplio"
                                {...register("motivo_consulta", { required: true })} />
                            {errors.motivo_consulta && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="antecedentes">Antecedentes
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="antecedentes" placeholder="..." className="text-amplio"
                                {...register("antecedentes", { required: true })} />
                            {errors.antecedentes && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="impresion_diagnostica">Impresión diagnóstica
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="impresion_diagnostica" placeholder="..." className="text-amplio"
                                {...register("impresion_diagnostica", { required: true })} />
                            {errors.impresion_diagnostica && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamiento">Tratamiento
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio"
                                {...register("tratamiento", { required: true })} />
                            {errors.tratamiento && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="sugerencias">Sugerencias y recomendaciones
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="sugerencias" placeholder="..." className="text-amplio"
                                {...register("sugerencias", { required: true })} />
                            {errors.sugerencias && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="valoracion">Valoración PE
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="valoracion" placeholder="..." className="text-amplio"
                                {...register("valoracion", { required: true })} />
                            {errors.valoracion && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="mt-5 mb-4 text-center">
                        <label className="etiqueta" htmlFor="psicologo">Psicólogo(A)</label>
                        <input className="datos_lectura" id='psicologo' name='psicologo' type="text"
                            value={empleado.nombre_empleado} readOnly />

                        <label className="etiqueta" htmlFor="cedula_psi">Cédula</label>
                        <input className="datos_lectura" id='cedula_psi' name='cedula_psi' type="text"
                            value={empleado.cedula} readOnly />
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

