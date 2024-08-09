import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { MensajeReceta } from '../../Modales/MensajeReceta';
import { toast } from 'react-hot-toast'
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
import generarPDF from "./NotaMedicaPDF";
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function NotasMedicas() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [noExpediente, setNotExpediente] = useState(null)
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [idHistorial, setIdHistorial] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [horaActual, setHoraActual] = useState('');
    const [empleado, setEmpleado] = useState([]);
    const [userGroup, setUserGroup] = useState(null);

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data.user_info)
            const group_usuario = response.data.user_info.name
            setUserGroup(group_usuario)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
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
        getNoEmpleado();
        getDetallesPaciente()
    }, [token, noExpediente]);

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
        //setIdNota(noExpediente)

        // Aquí podrías hacer algo con el ID de la nota médica seleccionada, como guardarlo en el estado del componente Receta
    };

    const getIdHistorialM = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_historial_medico/${noExpediente}/${fechaActual}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setIdHistorial(response.data.id)
            console.log(response.data.id)
        } catch (error) {
            setIdHistorial(null)
            console.error('Error al obtener ID del historial médico:', error);
        }
    }

    const getNotaDuplicado = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_detalles_NM/${idHistorial}`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return true
            console.log(respuesta.data)

        } catch (error) {
            return false
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);

        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setHoraActual(formattedTime);
    }, []);


    const registrarNota = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/crear_nota_medica/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                tratamiento: data.tratamiento,
                observaciones: data.observaciones,
                fecha_consulta: fechaActual,
                hora_consulta: horaActual,
                servicio: data.servicio,
                histMedic: idHistorial
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
            //localStorage.removeItem('noExp');
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        getExp();
    }, []);

    useEffect(() => {
        if (noExpediente !== null) {
            getIdHistorialM()
        }
    }, [noExpediente]);

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const enviar = async (data) => {
        const servicioValido = validarTexto(data.servicio)
        const diagnosticoValido = validarTexto(data.diagnostico)
        const tratamientoValido = validarTexto(data.tratamiento)
        const observacionesValido = validarTexto(data.observaciones)
        if (!noExpediente) {
            toast.error("Seleccione un paciente");
        } else if (!servicioValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de servicio");
        } else if (!diagnosticoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de diagnóstico");
        } else if (!tratamientoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tratamiento");
        } else if (!observacionesValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de observaciones");
        }
        else {
            if (idHistorial !== null) {
                const notaDuplicado = await getNotaDuplicado();
                if (!notaDuplicado) {
                    mensajeConfirmacionGuardar(' la nota', userGroup, navegador, () => {
                        registrarNota(data, idHistorial);
                        localStorage.setItem('idHistorial', JSON.stringify(idHistorial));
                        generarPDF(detallePaciente, noExpediente, data, empleado, fechaActual, horaActual)
                        MensajeReceta(navegador)
                    })
                } else {
                    toast.error("Ya existe una nota del paciente con la fecha de hoy");
                }

            } else {
                toast.error("Necesita existir un historial previo")
            }

        }
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
                            <a href="\historial_clinico_p1">
                                Historia Clínica Simplificada
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Notas médicas</li>
                    </ol>
                </nav>
            </div>

            <div className="ml-10 container mt-2">
                {noExpediente !== null && fechaActual && (
                    <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                )}
            </div>

            <h3 className='subtitulo'>Notas médicas</h3>

            <div className='ml-10 mb-5 container'>
                <div className="ml-10 mb-3">
                    {noExpediente === null && (
                        <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit(enviar)}>
                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                value={fechaActual} readOnly
                                {...register("fecha", { required: false })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="hora">Hora:</label>
                            <input className="entrada" id='hora' name='hora' type="time"
                                value={horaActual} readOnly
                                {...register("hora", { required: false })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="servicio">Servicio
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='servicio' name='servicio' type="text"
                                {...register("servicio", { required: true })} />
                            {errors.servicio && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="diagnostico">Diagnóstico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("diagnostico", { required: true })} />
                            {errors.diagnostico && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tratamiento">Tratamiento
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("tratamiento", { required: true })} />
                            {errors.tratamiento && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="observaciones">Observaciones
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="observaciones" placeholder="..." className="text-amplio" rows="5" cols="10"
                                {...register("observaciones", { required: true })} />
                            {errors.observaciones && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="medico">Médico:</label>
                            <input className="datos_lectura" id='medico' name='medico' type="text"
                                value={empleado.nombre_empleado} readOnly />
                            <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                            <input className="datos_lectura" id='cedula' name='cedula' type="text"
                                value={empleado.cedula} readOnly />
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