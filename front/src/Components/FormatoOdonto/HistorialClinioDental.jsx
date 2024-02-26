{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }
import React, { useState } from 'react';

export function HistorialClinicoDental() {
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const nombresArchivos = Array.from(archivos).map((archivo) => archivo.name);
        setArchivosSeleccionados(nombresArchivos);
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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historial clínico dental</li>
                    </ol>
                </nav>
            </div>

            {/*<header>
                <NavBarBusqueda />
    </header>*/}
            <div className="ml-10 container">
                <h2 className="titulo">Historial clínico dental</h2>
                <form className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="ref">Referencia</label>
                        <select name="ref" id="ref" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="opcion01">Si</option>
                            <option value="opcion02">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="lugarRef">Lugar de referencia</label>
                        <input id="lugarRef" type="text" placeholder="Lugar de referencia" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="fechaDoc">Fecha de ultima Doc.</label>
                        <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="planiFami">Planificación familiar</label>
                        <input id="planiFami" type="text" placeholder="Planificación" className="entrada" />
                    </div>

                    <div className="mt-3 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                            <span className="ml-10" style={{ display: 'block' }}>Cargue los estudios  en formato PDF</span>
                            <label htmlFor="fileInput" className="btn btn-cargar">
                                Elegir archivo(s)
                            </label>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

                            {archivosSeleccionados.length > 0 && (
                                <div>
                                    {archivosSeleccionados.map((nombreArchivo, index) => (
                                        <label key={index}>{nombreArchivo}</label>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>


                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50" />
                    </div>

                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habitos">Habitos exteriores</label>
                        <textarea id="habitos" type="text" placeholder="Habitos" className="entrada" rows="10" cols="30" />
                    </div>


                    <h3 className="subtitulo">Cabeza y cuello</h3>

                    <div className="col">
                        <label className="etiqueta" htmlFor="labio">Labios</label>
                        <input id="labio" type="text" placeholder="Revisión de labios" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="mucosa">Mucosa oral</label>
                        <input id="mucosa" type="text" placeholder="Revisión de mucosa oral" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="encias">Encias</label>
                        <input id="encia" type="text" placeholder="Revisión de encias" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="lengua">Lengua</label>
                        <input id="lengua" type="text" placeholder="Revisión de lengua" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="paladorB">Paladar blando</label>
                        <input id="paladorB" type="text" placeholder="Revisión de palador blando" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="paladorD">Paladar duro</label>
                        <input id="paladorD" type="text" placeholder="Revisión de palador duro" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cuello">Cuello</label>
                        <input id="cuello" type="text" placeholder="Revisión de cuello" className="entrada" />
                    </div>


                    <h3 className="subtitulo">Interrogatorio por aparatos y sistema</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="respi">Respiratorio</label>
                        <input id="respi" type="text" placeholder="Sistema respiratorio" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="digestivo">Digestivo</label>
                        <input id="digestivo" type="text" placeholder="Sistema digestivo" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="neuro">Neurológico</label>
                        <input id="neuro" type="text" placeholder="Sistema neurológico" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cardio">Cardiovasculares</label>
                        <input id="cardio" type="text" placeholder="Cardiovasculares" className="entrada" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="musco">Muscoesqueleto</label>
                        <input id="musco" type="text" placeholder="Muscoesqueleto" className="entrada" />
                    </div>

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}