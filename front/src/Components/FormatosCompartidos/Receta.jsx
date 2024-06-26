import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';

export function Receta() {
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [noExpediente, setNotExpediente] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [idNota, setIdNota] = useState(null)
    const [empleado, setEmpleado] = useState([]);
    const navegador = useNavigate()

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data.user_info)
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

    const getIdNota = async () => {
        try {
            const respuesta = await axios.get(`http://127.0.0.1:8000/api/get_nota_medica/${noExpediente}/${fechaActual}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(respuesta.data)
            setIdNota(respuesta.data.id)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }


    const registrarReceta = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/crear_receta/"
            const respuesta = await axios.post(url, {
                "medicamento": {
                    tratamiento: data.tratamiento
                },
                notMed: idNota,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
            localStorage.removeItem('noExp');
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const handlePacienteSeleccionado = (noExp) => {
        console.log("El noExp:", noExp);
        setNotExpediente(noExp)
    };

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const enviar = handleSubmit(async data => {
        const tratamientoValido = validarTexto(data.tratamiento)
        if (!tratamientoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tratamiento");
        } else {
            registrarReceta(data)
            navegador("/home_medico")
        }
    })

    useEffect(() => {
        if (noExpediente !== null) {
            getIdNota();
        }
    }, [noExpediente]);

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
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\historia_clinica_simplificada">
                                Notas médicas
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Receta</li>
                    </ol>
                </nav>
            </div>

            <div className="ml-10 container mt-2">
                {noExpediente !== null && fechaActual && (
                    <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                )}
            </div>

            <div className='m-2'>
                <h3 className="subtitulo">Receta medica</h3>
            </div>

            <div className='container'>
                {noExpediente == null && (
                    <BusquedaPaciente getIdHistorialMedico={handlePacienteSeleccionado} />
                )}
            </div>

            <form onSubmit={handleSubmit(enviar)}>


                <div className="ml-10 mb-3 col">
                    <label className="etiqueta" htmlFor="tratamiento">Tratamiento
                        <span className='etiqueta_obligatoria'>*</span>
                    </label>
                    <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="10" cols="30"
                        {...register("tratamiento", { required: true })} />
                </div>
                <div className='ml-10 mb-2 container'>
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

                <div className="mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}