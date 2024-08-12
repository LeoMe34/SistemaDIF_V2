import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria";
import generarPDF from "./FichaMedicaPDF";
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function FichaMedica() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [noExpediente, setNotExpediente] = useState(null)
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [detalleEnfermeria, setDetalleEnfermeria] = useState([]);
    const [nombreE, setNombreE] = useState(null);
    const [cedula, setCedula] = useState(null);
    const [userGroup, setUserGroup] = useState(null);
    const [idNota, setIdNota] = useState(null);
    const [fechaActual, setFechaActual] = useState('')
    const [fichaDuplicada, setFichaDuplicada] = useState(null);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const getExp = () => {
        const storedData = localStorage.getItem('noExp')
        if (storedData) {
            setNotExpediente(JSON.parse(storedData))
        } else {
            setNotExpediente(null)
        }
        console.log(noExpediente)
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
        }
    }

    useEffect(() => {
        if (noExpediente && fechaActual) {
            getDetallesEnfermeria();
            getDetallesPaciente();
            getIdNota();
            getFichaDuplicado()
        }
    }, [token, noExpediente, fechaActual]);

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

    const handlePacienteSeleccionado = (noExpediente) => {
        console.log("No exp", noExpediente);
        setNotExpediente(noExpediente)
    };

    const getIdNota = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_notaEvo_fecha/${noExpediente}/${fechaActual}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setIdNota(response.data.id)
            console.log(response.data.id)
        } catch (error) {
            setIdNota(null)
            console.error('Error al obtener ID del historial:', error);
        }
    }

    const getFichaDuplicado = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_fichaMed_odonto_fecha/${noExpediente}/${fechaActual}/`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaDuplicada(respuesta.data.id)
            console.log(respuesta.data)

        } catch (error) {
            console.error("Ocurrió un error", error);
            setFichaDuplicada(null)
        }
    }

    const verificarNotaOcupado = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_fichaMed_Odonto/${idNota}`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return true;
        } catch (error) {
            console.error("Error al verificar la nota de evolución:", error);
            return false; // Considerar que no está en uso en caso de error
        }
    };

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

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,1000}$/

        return textoRegex.test(texto)
    }

    const enviar = handleSubmit(async data => {
        const diagnosticoValido = validarTexto(data.diagnostico);
        const motivoValido = validarTexto(data.motivo_consulta);
        const observacionValido = validarTexto(data.observacion);

        if (!diagnosticoValido) {
            toast.error("En el campo de diagnóstico solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!motivoValido) {
            toast.error("En el campo de motivo solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!observacionValido) {
            toast.error("En el campo de observación solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else {
            const notaOcupada = await verificarNotaOcupado();
            try {
                if (idNota !== null) {
                    if (!notaOcupada) {
                        if (fichaDuplicada === null) {
                            mensajeConfirmacionGuardar(' la ficha tecnica', userGroup, navegador, () => {
                                generarPDF(detallePaciente, detalleEnfermeria, noExpediente, data, nombreE, cedula)
                                registrarFicha(data)
                                localStorage.removeItem("noExp")
                            })
                        } else {
                            toast.error("Ya existe una ficha técnica en esta fecha")
                        }
                    } else {
                        toast.error("La nota de evolución se ha ocupado previamente")
                    }
                } else {
                    toast.error("Necesita haber una nota de evolución previa")
                }

            } catch (error) {
                console.error('Error al registrar la ficha:', error);
                toast.error('Ocurrió un error al registrar la ficha. Por favor, inténtelo de nuevo.');
            }
        }

    })

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
                            <a href="\historial_odontologico_p1">
                                Historial clinico dental
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\nota_evo">
                                Nota evolución
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="subtitulo">Ficha técnica de consulta médica</h3>
            </div>

            <div className="ml-10 container">
                <div className="ml-10">
                    {!noExpediente && (
                        <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                    )}
                    {noExpediente !== null && fechaActual && (
                        <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                    )}
                </div>

                <form onSubmit={enviar}>
                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30"
                                {...register("diagnostico", { required: true })} />
                            {errors.diagnostico && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="diagMedi">Diagnóstico medico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30"
                                {...register("motivo_consulta", { required: true })} />
                            {errors.motivo_consulta && <span>Es necesario este campo</span>}
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

                    <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                    <input className="datos_lectura" id='medico' name='medico' type="text"
                        value={nombreE} readOnly />
                    <label className="mt-3 etiqueta" htmlFor="medico">Cédula</label>
                    <input className="datos_lectura" id='medico' name='medico' type="text"
                        value={cedula} readOnly />

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
