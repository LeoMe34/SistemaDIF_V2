import React from 'react';

export function CardPaciente() {
    return (
        <div className='datos-busqueda'>
            <div className='mb-2 mt-3'>
                <div className='form-campos'>
                    <label htmlFor="num_expediente">N° Expediente: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nombre">Nombre: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fecha_nacimiento">Fecha de nacimiento: </label>
                    <input className="datos_lectura" type="date" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="direccion">Direccion: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="sexo">Sexo: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="edad">Edad: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="ocupacion">Ocupación: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="telefono">Teléfono: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nacionalidad">Nacionalidad: </label>
                    <input className="datos_lectura" type="text" readOnly />
                </div>
            </div>
        </div>
    )
}