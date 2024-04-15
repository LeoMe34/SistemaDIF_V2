{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"

export function Parte1() {
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
    const navegador = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const nombresArchivos = Array.from(archivos).map((archivo) => archivo.name);
        setArchivosSeleccionados(nombresArchivos);
    }

    const enviar = handleSubmit(async data => {
        const historialOdonto = { ...data, noExpediente }
        localStorage.setItem('historialO', JSON.stringify(historialOdonto))
        navegador("/historial_odontologico_p2")
    })

    return (
        <div>
            <div className="ml-10 container">

                <h3 className="subtitulo">Historial clinico dental</h3>
                <BusquedaPaciente></BusquedaPaciente>
                <form onSubmit={enviar}>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="fechaAct">Fecha: </label>
                            <input id="fechaAlt" type="date" placeholder="aaaa/mm/dd" className="entrada"
                                {...register("fechaElaboracion", { required: true })} />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="ref">Referencia</label>
                            <select name="ref" id="ref" className="opciones"
                                {...register("referencia", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>


                        <div className="col">
                            <label className="etiqueta" htmlFor="lugarRef">Lugar de referencia</label>
                            <input id="lugarRef" type="text" placeholder="Lugar de referencia" className="entrada"
                                {...register("referenciaLugar", { required: true })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="subsecuente">Subsecuente</label>
                            <select name="subsecuente" id="subsecuente" className="opciones"
                                {...register("subsecuente", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="citado">Citado</label>
                            <select name="citado" id="citado" className="opciones"
                                {...register("citado", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="estudios">Estudios externos</label>
                            <select name="estudios" id="estudios" className="opciones"
                                {...register("estudios", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>



                    <div className="mt-3 mb-3">
                        <div className='row'>
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

                    </div>


                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50"
                            {...register("padecimiento", { required: true })} />
                    </div>

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}