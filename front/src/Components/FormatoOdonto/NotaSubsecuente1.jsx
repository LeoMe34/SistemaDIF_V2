import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { toast } from 'react-hot-toast'

export function NotaSubsecuente1() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [idHistOdonto, setHistOdonto] = useState(null)
    const [noExpediente, setNotExpediente] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [nombreE, setNombreE] = useState(null);
    const [cedula, setCedula] = useState(null);

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
        setIdNota(noExpediente)

        // Aquí podrías hacer algo con el ID de la nota médica seleccionada, como guardarlo en el estado del componente Receta
    };

    const getIdHistorialOdonto = async (noExpediente) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getNotaEvo/?no_expediente=${noExpediente}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return response.data[0].id; // Devolvemos el ID del historial
        } catch (error) {
            console.error('Error al obtener ID del historial:', error);
            return null; // En caso de error, devolvemos null
        }
    };

    const registrarNotaEvoOdonto = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_notaEvoOdont/"
            const respuesta = await axios.post(url, {
                diagnostico: data.diagnostico,
                tratamiento: data.tratamiento,
                plan: data.plan,
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

    useEffect(() => {
        getExp();
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('noExp');
        if (storedData) {
            const noExpediente = JSON.parse(storedData);
            getIdHistorialOdonto(noExpediente).then((id) => {
                setHistOdonto(id);
                console.log(id);
            });
        }
    }, []);

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }


    const enviar = async (data) => {
        const diagnosticoValido = validarTexto(data.diagnostico)
        const planValido = validarTexto(data.plan)
        const tratamientoValido = validarTexto(data.tratamiento)
        if (!diagnosticoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de diagnóstico");
        } else if (!planValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de plan a seguir");
        } else if (!tratamientoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos y caracteres especiales como:.-:,;()/ en el campo de tratamiento");
        }
        else {
            registrarNotaEvoOdonto(data, idHistOdonto);
            navegador('/ficha_medica')
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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Diagnóstico</li>
                    </ol>
                </nav>
            </div>
            <div className='mt-3 mb-4 container'>
                {!noExpediente && (
                    <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
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
                    <div className="mt-2 col">
                        <label className="etiqueta mb-2" htmlFor="diagnostico">Diagnóstico
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5"
                            {...register("diagnostico", { required: true })} />
                        {errors.diagnostico && <span>Es necesario este campo</span>}
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
                        <label className="etiqueta mb-2" htmlFor="tratamiento">Tratamiento
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="5"
                            {...register("tratamiento", { required: true })} />
                        {errors.tratamiento && <span>Es necesario este campo</span>}
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