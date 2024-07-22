import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { toast } from 'react-hot-toast'
import generarPDF from "./ConsentimientoPDF";
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function NotaEvolucion() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [idHistOdonto, setHistOdonto] = useState(null)
    const [noExpediente, setNoExpediente] = useState(null)
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [fechaActual, setFechaActual] = useState('')
    const [nombreE, setNombreE] = useState(null);
    const [cedula, setCedula] = useState(null);
    const [userGroup, setUserGroup] = useState(null);

    const getNoExp = () => {
        const storedData = localStorage.getItem('noExp');
        setNoExpediente(JSON.parse(storedData));
    };

    const getDetallesPaciente = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/detalle_paciente/${noExpediente}`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetallePaciente(respuesta.data)

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        if (token) {
            getNoExp();
        }
    }, [token]);

    useEffect(() => {
        getDetallesPaciente()
    }, [token, noExpediente]);

    useEffect(() => {
        const getNoEmpleado = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const nombre = response.data.user_info.nombre_empleado
                const cedula = response.data.user_info.cedula
                setNombreE(nombre)
                setCedula(cedula)
                const group_usuario = response.data.user_info.name
                setUserGroup(group_usuario)
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


    const getIdHistorialOdonto = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_hist_odonto/${noExpediente}/${fechaActual}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setHistOdonto(response.data.id)
            console.log(idHistOdonto)
        } catch (error) {
            console.error('Error al obtener ID del historial:', error);
        }
    }

    useEffect(() => {
        if (noExpediente !== null) {
            getIdHistorialOdonto()
        }
    }, [noExpediente]);

    const handlePacienteSeleccionado = (noExpediente) => {
        console.log("No exp", noExpediente);
        setNoExpediente(noExpediente)
        localStorage.setItem('noExp', JSON.stringify(noExpediente))
    };


    const registrarNotaEvoOdonto = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_notaEvoOdont/"
            const respuesta = await axios.post(url, {
                fecha: data.fecha,
                diagnostico: data.diagnostico,
                tratamiento: data.tratamiento,
                notas: data.notas,
                plan: data.plan,
                resumen_consulta: data.resumen,
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

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const enviar = async (data) => {
        const notasValido = validarTexto(data.notas)
        const diagnosticoValido = validarTexto(data.diagnostico)
        const tratamientoValido = validarTexto(data.tratamiento)
        const planValido = validarTexto(data.plan)
        const resumenValido = validarTexto(data.resumen)

        if (!notasValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de notas");
        } else if (!diagnosticoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de diagnóstico");
        } else if (!tratamientoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de tratamiento");
        } else if (!planValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de plan a seguir");
        } else if (!resumenValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de resumen de la consulta");
        }
        else {
            mensajeConfirmacionGuardar(' la nota', userGroup, navegador, () => {
                registrarNotaEvoOdonto(data);
                generarPDF(detallePaciente, noExpediente, data, nombreE, cedula, fechaActual)
            })
        }

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Nota Evolución</li>
                    </ol>
                </nav>
            </div>
            <h2 className='subtitulo'>Nota Evolución</h2>
            <div className='mt-3 mb-5 container'>
                {noExpediente === null && (
                    <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                )}

                {noExpediente !== null && fechaActual && (
                    <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                )}

            </div>

            <div className="mt-3 ml-10 container">
                <label htmlFor="fecha" className="etiqueta">Fecha </label>
                <input id="fecha" type="date" className="entrada"
                    value={fechaActual} readOnly
                    {...register("fecha", { required: true })} />
            </div>

            <form onSubmit={handleSubmit(enviar)}>

                <div className="mt-3 ml-10 container">
                    <div className="col">
                        <label className="etiqueta mb-2" htmlFor="notas">Notas
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="notas" placeholder="Notas" className="text-amplio" rows="5"
                            {...register("notas", { required: true })} />
                        {errors.notas && <span>Es necesario este campo</span>}
                    </div>
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="diagnostico">Diagnóstico
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5"
                            {...register("diagnostico", { required: true })} />
                        {errors.diagnostico && <span>Es necesario este campo</span>}
                    </div>
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="tratamiento">Tratamiento
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="5"
                            {...register("tratamiento", { required: true })} />
                        {errors.tratamiento && <span>Es necesario este campo</span>}
                    </div>
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="plan">Plan a seguir
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="plan" type="text" placeholder="Plan" className="entrada" rows="5"
                            {...register("plan", { required: true })} />
                        {errors.plan && <span>Es necesario este campo</span>}
                    </div>
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="tratamiento">Resumen de la consulta
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="resumen" type="text" placeholder="resumen" className="entrada" rows="5"
                            {...register("resumen", { required: true })} />
                        {errors.resumen && <span>Es necesario este campo</span>}
                    </div>
                </div>


                <div className='mt-2 mb-2 container'>
                    <div className='col'>
                        <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text"
                            value={nombreE} readOnly />
                        <label className="mt-3 etiqueta" htmlFor="medico">Cédula</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text"
                            value={cedula} readOnly />
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}