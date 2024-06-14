import React from 'react';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types'
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useState } from 'react';

export function CardFichaEnfermeria({ noExp }) {
    const { register, setValue } = useForm()
    const { token } = useAuth()
    const [fechaActual, setFechaActual] = useState('')

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const getFichaEnfermeria = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExp}/${fechaActual}`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            const ficha = respuesta.data
            setValue('estatura', ficha.datosFisicos.talla);
            setValue('peso', ficha.datosFisicos.peso);
            setValue('imc', ficha.datosFisicos.imc);
            setValue('temperatura', ficha.signosVitales.temperatura);
            setValue('presion', ficha.signosVitales.presion);
            setValue('fre_cardiaca', ficha.signosVitales.frecuenciaC);
            setValue('fre_respiratoria', ficha.signosVitales.frecuenciaR);
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        async function cargarPaciente() {
            const url = `http://127.0.0.1:8000/api/detalle_paciente/${noExp}`;
            try {
                const respuesta = await axios.get(url,
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    })
                const paciente = respuesta.data; // Suponiendo que la respuesta es un objeto con los detalles del paciente

                setValue('nombre', `${paciente.datosPersonalesPacient.nombre} ${paciente.datosPersonalesPacient.apellidoP} ${paciente.datosPersonalesPacient.apellidoM}`);
                setValue('num_expediente', paciente.no_expediente);
                setValue('edad', paciente.datosPersonalesPacient.edad);
            } catch (error) {
                console.error('Error al cargar el paciente:', error);
            }
        }
        cargarPaciente();        
    }, [noExp, setValue]);

    useEffect(() => {        
        getFichaEnfermeria();        
    }, [fechaActual,noExp, setValue]);

    return (
        <div className='datos-busqueda'>
            <div className='mb-2 mt-3'>
                <div className='form-campos'>
                    <label htmlFor="num_expediente">N° Expediente: </label>
                    <input className="datos_lectura" id='num_expediente' name='num_expediente' type="text"
                        {...register('num_expediente')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nombre">Nombre: </label>
                    <input className="datos_lectura" id='nombre' name='nombre' type="text"
                        {...register('nombre')} readOnly />
                </div>
                <div className='form-campos'>
                    <label htmlFor="edad">Edad: </label>
                    <input className="datos_lectura" id='edad' name='edad' type="text"
                        {...register('edad')} readOnly />
                </div>
                <div className='form-campos'>
                    <label htmlFor="estatutra">Estatura:</label>
                    <input className="datos_lectura" id='estatutra' name='estatutra' type="text"
                        {...register('estatura')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="peso">Peso: </label>
                    <input className="datos_lectura" id='peso' name='peso' type="text"
                        {...register('peso')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="imc">I.M.C</label>
                    <input className="datos_lectura" id='imc' name='imc' type="text"
                        {...register('imc')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="temperatura">Temperatura: </label>
                    <input className="datos_lectura" id='temperatura' name='temperatura' type="text"
                        {...register('temperatura')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="presion">Presión arterial: </label>
                    <input className="datos_lectura" id='presion' name='presion' type="text"
                        {...register('presion')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fre_cardiaca">Frecuencia cardiaca: </label>
                    <input className="datos_lectura" id='fre_cardiaca' name='fre_cardiaca' type="text"
                        {...register('fre_cardiaca')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fre_respiratoria">Frecuencia respiratoria: </label>
                    <input className="datos_lectura" id='fre_respiratoria' name='fre_respiratoria' type="text"
                        {...register('fre_respiratoria')} readOnly />
                </div>
            </div>
        </div>
    )
}

CardFichaEnfermeria.propTypes = {
    noExp: PropTypes.string.isRequired
}