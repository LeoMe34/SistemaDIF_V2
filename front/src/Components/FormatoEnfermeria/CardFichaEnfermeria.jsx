import React from 'react';

export function CardFichaEnfermeria() {
    return (
        <div className='datos-busqueda'>
            <div className='mb-2 mt-3'>
                <div className='form-campos'>
                    <label htmlFor="num_expediente">N° Expediente: </label>
                    <input className="datos_lectura" id='num_expediente' name='num_expediente' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="nombre">Nombre: </label>
                    <input className="datos_lectura" id='nombre' name='nombre' type="text" readOnly />
                </div>
                <div className='form-campos'>
                    <label htmlFor="edad">Edad: </label>
                    <input className="datos_lectura" id='edad' name='edad' type="text" readOnly />
                </div>
                <div className='form-campos'>
                    <label htmlFor="estatutra">Estatura:</label>
                    <input className="datos_lectura" id='estatutra' name='estatutra' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="peso">Peso: </label>
                    <input className="datos_lectura" id='peso' name='peso' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="imc">I.M.C</label>
                    <input className="datos_lectura" id='imc' name='imc' type="date" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="temperatura">Temperatura: </label>
                    <input className="datos_lectura" id='temperatura' name='temperatura' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="presion">Presión arterial: </label>
                    <input className="datos_lectura" id='presion' name='presion' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fre_cardiaca">Frecuencia cardiaca: </label>
                    <input className="datos_lectura" id='fre_cardiaca' name='fre_cardiaca' type="text" readOnly />
                </div>

                <div className='form-campos'>
                    <label htmlFor="fre_respiratoria">Frecuencia respiratoria: </label>
                    <input className="datos_lectura" id='fre_respiratoria' name='fre_respiratoria' type="text" readOnly />
                </div>
            </div>
        </div>
    )
}