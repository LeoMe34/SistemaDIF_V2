{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { toast } from 'react-hot-toast'

export function Parte1() {
    const navegador = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [fechaActual, setFechaActual] = useState('')
    const [showReferencia, setShowReferencia] = useState(false)

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s.-:,;()/]{1,1000}$/

        return textoRegex.test(texto)
    }

    const handleReferenciaChange = (e) => {
        if (e.target.value === "true") {
            setShowReferencia(true)
        }
        else {
            setShowReferencia(false)
        }
    };

    const enviar = handleSubmit(async data => {
        const lugarReferenciaValido = validarTexto(data.referenciaLugar)
        const padecimientoValido = validarTexto(data.padecimiento)
        if (showReferencia && !lugarReferenciaValido) {
            toast.error("En el campo de lugar de referencia solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        } else if (!padecimientoValido) {
            toast.error("En el campo de padecimiento solo se puede ingresar caracteres alfanuméricos y signos de puntuación como: .-:,;()/");
        }
        else {
            const historialOdonto = { ...data, noExpediente }

            localStorage.setItem('historialO', JSON.stringify(historialOdonto))
            localStorage.setItem('noExp', JSON.stringify(noExpediente))
            navegador("/historial_odontologico_p2")
        }

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
                                value={fechaActual} readOnly
                                {...register("fecha_elaboracion", { required: true })} />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="subsecuente">Subsecuente
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="subsecuente" id="subsecuente" className="opciones"
                                {...register("subsecuente", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                            {errors.subsecuente && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="citado">Citado
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="citado" id="citado" className="opciones"
                                {...register("citado", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                            {errors.citado && <span>Es necesario este campo</span>}
                        </div>

                    </div>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="ref">Referencia
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="ref" id="ref" className="opciones"
                                {...register("referencia", { required: true })}
                                onChange={handleReferenciaChange}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                            {errors.referencia && <span>Es necesario este campo</span>}
                        </div>

                        {showReferencia && (
                            <div className="col">
                                <label className="etiqueta" htmlFor="lugarRef">Lugar de referencia
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input id="lugarRef" type="text" placeholder="Lugar de referencia" className="entrada"
                                    {...register("referenciaLugar", { required: true })} />
                                {errors.referenciaLugar && <span>Es necesario este campo</span>}
                            </div>
                        )}

                        <div className="col">
                            <label className="etiqueta" htmlFor="estudios">Estudios externos
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="estudios" id="estudios" className="opciones"
                                {...register("estudios", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                            {errors.estudios && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual
                            <span className='etiqueta_obligatoria'>*</span>
                        </label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50"
                            {...register("padecimiento", { required: true })} />
                        {errors.padecimiento && <span>Es necesario este campo</span>}
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