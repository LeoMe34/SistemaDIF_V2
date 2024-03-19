{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';

export function CrearEmpleado() {
    const navegador = useNavigate()
    const { token } = useAuth()    
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_administrador">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Crear empleado</li>
                    </ol>
                </nav>
            </div>

            {/*<NavBarSimple />*/}

            <div className="ml-10 container mt-2">
                <form>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            {/*Realmente lo que agarra es el id del usuario, no el nombre del usuario/número de trabajador */}
                            <label className="etiqueta" htmlFor="usuario">Usuario</label>
                            <input id="usuario" type="text" placeholder="Número de trabajador" className="entrada" />
                        </div>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="ocupacion">Ocupación</label>
                            {/*Aun tengo que checar que se despliegue el ultimo input dependiendo de la opcion*/}
                            <select name="ocupacion" id="ocupacion" className="opciones">
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="medicogral">Médico general</option>
                                <option value="odontologo">Odontólogo</option>
                                <option value="nutriologo">Nutriólogo</option>
                                <option value="psicologo">Psicólogo</option>
                                <option value="audiologo">Audiólogo</option>
                                <option value="oftalmologo">Oftalmólogo</option>
                                <option value="recepcion_medicina">Recepcionista de medicina general</option>
                                <option value="recepcion_odonto">Recepcionista de odontología</option>
                                <option value="recepcion_psico">Recepcionista de psicología</option>
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada" />
                        </div>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                            <input id="numeroTelefonico" type="text" placeholder="Teléfono" className="entrada" />
                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada" />
                        </div>
                    </div>

                    <div className="row">
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada" />
                        </div>
                    </div>

                    {/*mostrarCedula && <div className="mb-4">
                        <label className="etiquetas" htmlFor="cedula">Cédula profesional</label>
                        <input id="cedula" type="text" placeholder="Cedula profesional" className="entrada"
                            {...register("cedula_profesional")}
                        />
                        {errors.cedula_profesional && <span>Es necesario este campo</span>}
    </div>*/}

                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">
                            Guardar
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
