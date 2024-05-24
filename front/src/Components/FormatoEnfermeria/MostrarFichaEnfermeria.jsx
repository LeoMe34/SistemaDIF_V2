import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useParams } from 'react-router-dom';


export function MostrarFichaEnfermeria() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { noExpediente } = useNoExpediente();
    const { fecha } = useParams();
    const [detalles, setDetalles] = useState([])
    const [empleado, setEmpleado] = useState([])
    const [tipoPoblacion, setTipoPoblacion] = useState('');


    const convertirTrabajador = (esTrabajador) => {
        return esTrabajador ? 'Sí' : 'No';
    }

    const getFichas = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExpediente}/${fecha}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response)
            setDetalles(response.data)
        } catch (error) {
            console.error('Error al obtener la ficha', error);
        }
    };

    const getEmpleadoFicha = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_empleado/${detalles.empleado}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });            
            setEmpleado(response.data)
        } catch (error) {
            console.error('Error al obtener al empleado', error);
        }
    };

    useEffect(() => {
        getFichas();
    }, [fecha, token]);

    useEffect(() => {
        if (detalles.empleado) {
            getEmpleadoFicha();
        }
    }, [detalles]);

    useEffect(() => {
        // Calculamos el tipo de población dinámicamente
        const poblacion = [];

        if (detalles.datosDemograficos?.discapacitado) {
            poblacion.push('Discapacitado');
        }
        else if (detalles.datosDemograficos?.adulto_mayor) {
            poblacion.push('Adulto mayor');
        }
        else if (detalles.datosDemograficos?.embarazada) {
            poblacion.push('Embarazada');
        }
        else {
            poblacion.push('Ninguna');
        }

        // Establecemos el estado del tipo de población
        setTipoPoblacion(poblacion.join(', '));
    }, [detalles]);

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

            <div className='ml-10 mt-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="fecha">Fecha: </label>
                        <input className="entrada" id='fecha' name='fecha' type="date"
                            value={detalles.fecha} />
                    </div>

                    <div className='col'>
                        <label className='etiqueta' htmlFor="es_trabajador">Trabajador: </label>
                        <input className="opciones" id='es_trabajador' name='es_trabajador' type="text"
                            value={convertirTrabajador(detalles.trabajador)} />
                    </div>

                </div>
            </div>

            <div className='ml-10 mt-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="peso">Peso: </label>
                        <input className="entrada" id='peso' name='peso' type="text"
                            value={detalles.datosFisicos?.peso} />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="talla">Talla: </label>
                        <input className="entrada" id='talla' name='talla' type="text"
                            value={detalles.datosFisicos?.talla} />
                    </div>

                    <div className='col'>
                        <label className='etiqueta' htmlFor="imc">IMC: </label>
                        <input className="entrada" id='imc' name='imc' type="text"
                            value={detalles.datosFisicos?.imc} />
                    </div>
                </div>
            </div>

            <div>
                <h3 className='subtitulo'>Registro de signos vitales</h3>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_atencion">Tipo de atención</label>
                            <input className="entrada" id='tipo_atencion' name='tipo_atencion' type="text"
                                value={detalles.servicio_enfermeria} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="presion">T/A: </label>
                            <input className="entrada" id='presion' name='presion' type="text"
                                value={detalles.signosVitales?.presion} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="frecuencia_cardiaca">Frecuencia cardiaca: </label>
                            <input className="entrada" id='frecuencia_cardiaca' name='frecuencia_cardiaca' type="text"
                                value={detalles.signosVitales?.frecuenciaC} />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="frecuencia_respiratoria">Frecuencia respiratoria: </label>
                            <input className="entrada" id='frecuencia_respiratoria' name='frecuencia_respiratoria' type="text"
                                value={detalles.signosVitales?.frecuenciaR} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="temperatura">Temperatura: </label>
                            <input className="entrada" id='temperatura' name='temperatura' type="text"
                                value={detalles.signosVitales?.temperatura} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="glicemia">Glicemia capilar: </label>
                            <input className="entrada" id='glicemia' name='glicemia' type="text"
                                value={detalles.signosVitales?.glicemia} />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="religion">Religión: </label>
                            <input className="entrada" id='religion' name='religion' type="text"
                                value={detalles.datosDemograficos?.religion} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="escolaridad">Escolaridad: </label>
                            <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                                value={detalles.datosDemograficos?.escolaridad} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_poblacion">Tipo de población</label>
                            <input className='entrada' value={tipoPoblacion} />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="enfermero">Enfermero</label>
                            <input className="datos_lectura" id='enfermero' name='enfermero' type="text" 
                            value={empleado.nombre + " " + empleado.apellidoPaterno + " " + empleado.apellidoMaterno} readOnly />
                        </div>
                    </div>
                </div>
                <div className="pt-1 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </div>
        </div>
    )
}