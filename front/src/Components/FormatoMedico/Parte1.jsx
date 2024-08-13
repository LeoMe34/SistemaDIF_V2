import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useAuth } from "../../Contexto/AuthContext";
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
import { mensajeConfirmacionSiguiente } from '../../Modales/MensajeConfirmacionSiguiente';

export function Parte1() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [noExpediente, setNotExpediente] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [showReferencia, setShowReferencia] = useState(false)
    const [userGroup, setUserGroup] = useState(null);
    const [fichaMedica, setFichaMedica] = useState(null);

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const group_usuario = response.data.user_info.name
            setUserGroup(group_usuario)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    useEffect(() => {
        getNoEmpleado();
    }, [token]);

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
        localStorage.setItem('noExp', JSON.stringify(noExpediente))
    };

    const validarNumeros = (numero) => {
        const numeroRegex = /^[0-9]{1,5}$/

        return numeroRegex.test(numero)
    }

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    useEffect(() => {
        getExp();
    }, []);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const handleReferenciaChange = (e) => {
        if (e.target.value === "true") {
            setShowReferencia(true)
        }
        else {
            setShowReferencia(false)
        }
    };

    const getFichaOcupada = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_historia_clinica/${fichaMedica}`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return true

        } catch (error) {
            return false
        }
    }

    const getHistorialDuplicado = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_historial_medico/${noExpediente}/${fechaActual}/`
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
        //Creo que seria por el expediente y por el dia, pq solo hay una ficha por dia
        const getFichaMedica = async () => {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_medica/${noExpediente}/${fechaActual}/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setFichaMedica(response.data.id)
                console.log(response)
            } catch (error) {
                setFichaMedica(null)
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        if (noExpediente !== null && fechaActual) {
            getFichaMedica();
        }
    }, [noExpediente, fechaActual]);

    const enviar = handleSubmit(async data => {
        const noConsultorioValido = validarNumeros(data.no_consultorio)
        const informanteValido = validarTexto(data.informante)
        const lugarReferenciaValido = validarTexto(data.lugar)
        if (!noConsultorioValido) {
            toast.error("Ingrese solo caracteres numéricos en el numero de consultorio");
        } else if (!informanteValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y signos de puntuación en el campo de informante");
        } else if (showReferencia) {
            if (!lugarReferenciaValido) {
                toast.error("Ingrese solo caracteres alfanuméricos y signos de puntuación en el campo de lugar de referencia")
            }
            else {

                if (fichaMedica !== null) {
                    const fichaOcupada = await getFichaOcupada()
                    const historialDuplicado = await getHistorialDuplicado();
                    //Si no es una ficha ocupada
                    if (!fichaOcupada) {
                        if (!historialDuplicado) {
                            mensajeConfirmacionSiguiente('antecedentes', userGroup, navegador, () => {
                                const datosCompletos = { ...data, noExpediente };
                                localStorage.setItem('datos', JSON.stringify(datosCompletos));
                            })
                        } else {
                            toast.error("Ya existe un historial de este paciente en esta fecha")
                        }
                    } else {
                        toast.error("La ficha medica se ha ocupado previamente")
                    }
                } else {
                    toast.error("Necesita haber una ficha medica registrada")
                }


            }
        }
        else {
            if (fichaMedica !== null) {
                const fichaOcupada = await getFichaOcupada()
                const historialDuplicado = await getHistorialDuplicado();

                if (!fichaOcupada) {
                    if (!historialDuplicado) {
                        mensajeConfirmacionSiguiente('antecedentes', userGroup, navegador, () => {
                            const datosCompletos = { ...data, noExpediente };
                            localStorage.setItem('datos', JSON.stringify(datosCompletos));
                        })
                    } else {
                        toast.error("Ya existe un historial de este paciente en esta fecha")
                    }
                } else {
                    toast.error("La ficha medica se ha ocupado previamente")
                }
            } else {
                toast.error("Necesita haber una ficha medica registrada")
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
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\ficha_tecnica_medico">
                                Ficha técnica de consulta médica
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historia Clínica Simplificada</li>
                    </ol>
                </nav>
            </div>

            <div>
                <h3 className='subtitulo'>Historia Clínica Simplificada</h3>
                {noExpediente === null && (
                    <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                )}
                {noExpediente !== null && fechaActual && (
                    <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                )}

                <form onSubmit={enviar}>
                    <div className='ml-10 container'>
                        <div className='ml-10 mb-3'>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                                <input className="entrada" id='fecha' name='fecha' type="date"
                                    value={fechaActual} readOnly
                                    {...register("fecha")} />
                            </div>
                            <div className='col'>
                                <div className='animacionLabel'>
                                    <label className='etiqueta' htmlFor="num_consultorio" for='num_consultorio'>N° consultorio:
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input className="entrada" id='num_consultorio' name='num_consultorio' type="text"
                                        {...register("no_consultorio", { required: true })} />
                                    {errors.no_consultorio && <span>Es necesario este campo</span>}

                                </div>

                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="referencia">Referencia:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='referencia' name='referencia' type=""
                                    {...register("referencia", { required: true })}
                                    onChange={handleReferenciaChange}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value={true}>Si</option>
                                    <option value={false}>No</option>
                                </select>
                                {errors.referencia && <span>Es necesario este campo</span>}
                            </div>
                            {showReferencia && (
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="lugar">Lugar de referencia:</label>
                                    <input className="entrada" id='lugar' name='lugar' type="text"
                                        {...register("lugar", { required: true })} />
                                    {errors.lugar && <span>Es necesario este campo</span>}
                                </div>
                            )}


                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h4 className='subtitulo_2'> Información familiar</h4>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_familia">Tipo de familia:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='tipo_familia' name='tipo_familia' type=""
                                    {...register("tipo_familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">Nuclear</option>
                                    <option value="1">Extensa</option>
                                    <option value="2">Compuesta</option>
                                </select>
                                {errors.tipo_familia && <span>Es necesario este campo</span>}

                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="rol_madre">Rol de madre:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='rol_madre' name='rol_madre' type=""
                                    {...register("rol_madre", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">No aplica</option>
                                    <option value="1">E-M</option>
                                    <option value="2">E-C</option>
                                    <option value="3">E-SD</option>
                                </select>
                                {errors.rol_madre && <span>Es necesario este campo</span>}
                            </div>
                        </div>

                        <h4 className='subtitulo_2'>Familiar responsable del paciente </h4>

                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="familia">Familia:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='familia' name='familia' type=""
                                    {...register("familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="1">1</option>
                                    <option value="d">D</option>
                                </select>
                                {errors.familia && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="disfuncional">Disfuncionales familiares:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='disfuncional' name='disfuncional' type=""
                                    {...register("disfuncional", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                                {errors.disfuncional && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="informante">Informante:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='informante' name='informante' type="text"
                                    {...register("informante", { required: true })} />
                                {errors.informante && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="estudios">Estudios externo:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='estudios' name='estudios' type=""
                                    {...register("estudios", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">Ninguno</option>
                                    <option value="1">Laboratorios</option>
                                    <option value="2">Ultrasonido</option>
                                    <option value="3">Tomografía</option>
                                    <option value="4">Rayos X</option>
                                </select>
                                {errors.estudios && <span>Es necesario este campo</span>}
                            </div>
                        </div>

                    </div>

                    <div className="text-center">
                        <div className="pt-1 mb-3 text-center">
                            <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}