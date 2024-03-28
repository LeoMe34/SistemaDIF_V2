import React from 'react';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types'
import axios from 'axios';

export function CardPaciente({id}) {
    const { register, setValue } = useForm()

    // mostrar los datos en los recuadros
    useEffect(() => {
        async function cargarPaciente() {
            const url = `http://127.0.0.1:8000/api/detalle_paciente/${id}`;
            try {
                const respuesta = await axios.get(url);
                const paciente = respuesta.data; // Suponiendo que la respuesta es un objeto con los detalles del paciente

                setValue('nombre', `${paciente.datosPersonalesPacient.nombre} ${paciente.datosPersonalesPacient.apellidoP} ${paciente.datosPersonalesPacient.apellidoM}`);
                setValue('num_expediente', paciente.no_expediente);
                setValue('fecha_nacimiento', paciente.fecha_nacimiento);
                setValue('sexo', paciente.datosPersonalesPacient.fechaDeNacimiento);
                setValue('edad', paciente.datosPersonalesPacient.edad);
                setValue('direccion', paciente.datosDireccionPacient.direccion);
                setValue('ocupacion', paciente.datosPersonalesPacient.ocupacion);
                setValue('telefono', paciente.datosContactoPacient.telefono);
                setValue('nacionalidad', paciente.datosPersonalesPacient.nacionalidad);
            } catch (error) {
                console.error('Error al cargar el paciente:', error);
            }
        }
        cargarPaciente();
    }, [id, setValue]);

    return (
        <div className='datos-busqueda'>
            <div className='mb-2 mt-3'>
                <div className='form-campos'>
                    <label htmlFor="num_expediente">N° Expediente: </label>
                    <input className="datos_lectura" id='num_expediente' name='num_expediente' type="text" {...register('num_expediente')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nombre">Nombre: </label>
                    <input className="datos_lectura" id='nombre' name='nombre' type="text" {...register('nombre')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fecha_nacimiento">Fecha de nacimiento: </label>
                    <input className="datos_lectura" id='fecha_nacimiento' name='fecha_nacimiento' type="date" {...register('fecha_nacimiento')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="direccion">Direccion: </label>
                    <input className="datos_lectura" id='direccion' name='direccion' type="text" {...register('direccion')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="sexo">Sexo: </label>
                    <input className="datos_lectura" id='sexo' name='sexo' type="text" {...register('sexo')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="edad">Edad: </label>
                    <input className="datos_lectura" id='edad' name='edad' type="text" {...register('edad')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="ocupacion">Ocupación: </label>
                    <input className="datos_lectura" id='ocupacion' name='ocupacion' type="text" {...register('ocupacion')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="telefono">Teléfono: </label>
                    <input className="datos_lectura" id='telefono' name='telefono' type="text" {...register('telefono')} readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nacionalidad">Nacionalidad: </label>
                    <input className="datos_lectura" id='nacionalidad' name='nacionalidad' type="text" {...register('nacionalidad')} readOnly />
                </div>
            </div>
        </div>
    )
}

CardPaciente.propTypes = {
    id:  PropTypes.string.isRequired
}