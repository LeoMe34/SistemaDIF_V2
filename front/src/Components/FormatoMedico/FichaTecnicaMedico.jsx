import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { toast } from 'react-hot-toast'
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
import generarPDF from "./FichaTecnicaPDF";
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function FichaTecnicaMedico() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombreE, setNombreE] = useState(null);
    const [cedula, setCedula] = useState(null);
    const [userGroup, setUserGroup] = useState(null);
    const [detalleEnfermeria, setDetalleEnfermeria] = useState([]);
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [fechaActual, setFechaActual] = useState('')

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            const nombre = response.data.user_info.nombre_empleado
            const cedula = response.data.user_info.cedula
            setNoEmpleado(no_Empleado)
            setNombreE(nombre)
            setCedula(cedula)
            const group_usuario = response.data.user_info.name
            setUserGroup(group_usuario)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getNoEmpleado();
            await getDetallesEnfermeria();
            await getDetallesPaciente();
        };
        fetchData();
    }, [token, noExpediente, fechaActual]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const getDetallesEnfermeria = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExpediente}/${fechaActual}/`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetalleEnfermeria(respuesta.data)

        } catch (error) {
            console.error("Ocurrió un error", error);            
            setDetalleEnfermeria(null)
        }
    }

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

    const registrarFicha = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_ficha_medica/"
            const respuesta = await axios.post(url, {
                fecha: data.fecha,
                diagnostico: data.diagnostico,
                motivo_consulta: data.motivo_consulta,
                observacion: data.observacion,
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

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const enviar = handleSubmit(async data => {
        const diagnosticoValido = validarTexto(data.diagnostico);
        const motivoValido = validarTexto(data.motivo_consulta);
        const observacionValido = validarTexto(data.observacion);

        if (!diagnosticoValido) {
            toast.error("En el campo de diagnóstico solo se puede ingresar caracteres alfanumericos y signos de puntuación como: .-:,;()/");
        } else if (!motivoValido) {
            toast.error("En el campo de motivo solo se puede ingresar caracteres alfanumericos y signos de puntuación como: .-:,;()/");
        } else if (!observacionValido) {
            toast.error("En el campo de observación solo se puede ingresar caracteres alfanumericos y signos de puntuación como: .-:,;()/");
        } else {
            if(detalleEnfermeria !== null){
                mensajeConfirmacionGuardar(' la ficha tecnica', userGroup, navegador, () => {
                    generarPDF(detallePaciente, detalleEnfermeria, noExpediente, data, nombreE, cedula)
                    registrarFicha(data);
                    localStorage.setItem('noExp', JSON.stringify(noExpediente));
                })
            } else{
                toast.error("Necesita haber una ficha de enfermeria")
            }
            
        }
    });


    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">                            
                            <a href="\home_medico">
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
                    {noExpediente && fechaActual && (
                        <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                    )}
                </div>

                <form onSubmit={enviar}>
                    <label className='etiqueta' htmlFor="fecha">Fecha: </label>
                    <input className="entrada" id='fecha' name='fecha' type="date"
                        value={fechaActual} readOnly
                        {...register("fecha", { required: false })} />

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30"
                                {...register("motivo_consulta", { required: true })} />
                            {errors.motivo_consulta && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="diagMedi">Diagnostico medico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30"
                                {...register("diagnostico", { required: true })} />
                            {errors.diagnostico && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="observacion">Observación
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="observacion" placeholder="Observaciones" className="text-amplio" rows="10" cols="30"
                                {...register("observacion", { required: true })} />
                            {errors.observacion && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                    <div className="ficha-medico">
                        <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text"
                            value={nombreE} readOnly />
                    </div>

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
