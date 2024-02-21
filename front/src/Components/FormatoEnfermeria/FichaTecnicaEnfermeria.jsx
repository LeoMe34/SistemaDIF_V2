import React from 'react';
import { CardPaciente } from '../Paciente/CardPaciente';
{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }


export function FichaTecnicaEnfermeria() {
    return (
        <div>
            {/*<header>
                <NavBarSimple />
    </header>*/}
            <div className='ml-40 mt-2'>
                <CardPaciente />
            </div>
            <div className='ml-10 mt-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="fecha_actual">Fecha: </label>
                        <input className="entrada" id='fecha_actual' name='fecha_actual' type="date" readOnly />
                    </div>
                    <div className="col">
                        <label className='mt-2 etiqueta' htmlFor="visita">Visita: </label>
                        <select className="opciones" id='visita' name='visita' type="">
                            <option value="" selected disabled>Elija una opción</option>
                            <option value="1">Primera vez</option>
                            <option value="2">Subsecuente</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='ml-10 mt-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="peso">Peso: </label>
                        <input className="entrada" id='peso' name='peso' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="talla">Talla: </label>
                        <input className="entrada" id='talla' name='talla' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="es_trabajador">Trabajador: </label>
                        <select className="opciones" id='es_trabajador' name='es_trabajador' type="">
                            <option value="" selected disabled>Elija una opción</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <h3 className='subtitulo'>Registro de signos vitales</h3>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_atencion">Tipo de atención</label>
                            <select className="opciones" id='tipo_atencion' name='tipo_atencion' type="">
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Consulta general</option>
                                <option value="2">Curación</option>
                                <option value="3">Retiro de puntos</option>
                                <option value="4">Aplicación de medicamentos</option>
                            </select>
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="presion">T/A: </label>
                            <input className="entrada" id='presion' name='presion' type="text" />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="frecuencia_cardiaca">Frecuencia cardiaca: </label>
                            <input className="entrada" id='frecuencia_cardiaca' name='frecuencia_cardiaca' type="text" />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="frecuencia_respiratoria">Frecuencia respiratoria: </label>
                            <input className="entrada" id='frecuencia_respiratoria' name='frecuencia_respiratoria' type="text" />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="temperatura">Temperatura: </label>
                            <input className="entrada" id='temperatura' name='temperatura' type="text" />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="glicemia">Glicemia capilar: </label>
                            <input className="entrada" id='glicemia' name='glicemia' type="text" />
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_poblacion">Tipo de población</label>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='discapacitado' name='discapacitado' />
                                <label className='form-check-label etiqueta' htmlFor="discapacitado">Discapacitado</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" id='adulto_mayor' name='adulto_mayor' type="checkbox" />
                                <label className='form-check-label etiqueta' htmlFor="adulto_mayor">Adulto mayor</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" id='embarazada' name='embarazada' type="checkbox" />
                                <label className='form-check-label etiqueta' htmlFor="embarazada">Embarazada</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" id='ninguna' name='ninguna' type="checkbox" />
                                <label className='form-check-label etiqueta' htmlFor="ninguna">Ninguna</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="enfermero">Enfermero</label>
                            <input className="datos_lectura" id='enfermero' name='enfermero' type="text" readOnly />
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