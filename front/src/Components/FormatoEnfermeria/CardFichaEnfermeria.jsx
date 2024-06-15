import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useState } from 'react';

export function CardFichaEnfermeria({ noExp, fecha }) {
    const { register, setValue } = useForm();
    const [showCard, setShowCard] = useState(false)
    const { token } = useAuth();

    const getFichaEnfermeria = async () => {
        if (!noExp || !fecha) {
            console.error("No se proporcionaron noExp o fecha válidos");
            return;
        }

        try {
            const url = `http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExp}/${fecha}/`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const ficha = respuesta.data;
            setValue('estatura', ficha.datosFisicos.talla);
            setValue('peso', ficha.datosFisicos.peso);
            setValue('imc', ficha.datosFisicos.imc);
            setValue('temperatura', ficha.signosVitales.temperatura);
            setValue('presion', ficha.signosVitales.presion);
            setValue('fre_cardiaca', ficha.signosVitales.frecuenciaC);
            setValue('fre_respiratoria', ficha.signosVitales.frecuenciaR);
            setShowCard(true)
        } catch (error) {
            console.error("Ocurrió un error al obtener la ficha de enfermería", error);
            console.log("No hay una ficha en esa fecha")
            setShowCard(false)
        }
    };

    useEffect(() => {
        const cargarPaciente = async () => {
            if (!noExp) {
                console.error("No se proporcionó noExp válido");
                return;
            }

            const url = `http://127.0.0.1:8000/api/detalle_paciente/${noExp}`;
            try {
                const respuesta = await axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const paciente = respuesta.data;

                setValue('nombre', `${paciente.datosPersonalesPacient.nombre} ${paciente.datosPersonalesPacient.apellidoP} ${paciente.datosPersonalesPacient.apellidoM}`);
                setValue('num_expediente', paciente.no_expediente);
                setValue('edad', paciente.datosPersonalesPacient.edad);
            } catch (error) {
                console.error('Error al cargar el paciente:', error);
            }
        };

        cargarPaciente();
    }, [noExp, setValue, token]);

    useEffect(() => {
        getFichaEnfermeria();
    }, [fecha, noExp, setValue, token]);

    return (
        <div>
            {showCard && (
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
                            <label htmlFor="estatura">Estatura:</label>
                            <input className="datos_lectura" id='estatura' name='estatura' type="text"
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
            )}
        </div>

    )
}

CardFichaEnfermeria.propTypes = {
    noExp: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
};
