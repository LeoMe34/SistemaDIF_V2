import React, { useEffect, useState } from 'react';
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import BuscarNotaMedica from '../FormatoMedico/BuscarNotaMedica';

export function Receta() {
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [idNotaMedica, setIdNotaMedica] = useState(null)

    const registrarReceta = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/crear_receta/"
            const respuesta = await axios.post(url, {
                "medicamento": {
                    tratamiento: data.tratamiento
                },
                notMed:idNotaMedica,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const handleSeleccionNotaMedica = (idNotaMedica) => {
        console.log("ID de la nota médica seleccionada:", idNotaMedica);
        setIdNotaMedica(idNotaMedica)
        
        // Aquí podrías hacer algo con el ID de la nota médica seleccionada, como guardarlo en el estado del componente Receta
    };

    const enviar = handleSubmit(async data => {
        registrarReceta(data)
    })
    return (
        <div>
            <div className='m-2'>
                <h3 className="subtitulo">Receta medica</h3>
            </div>

            <div className="ml-10 container">
                <CardFichaEnfermeria />
            </div>

            <BuscarNotaMedica getIdNotaMedica={handleSeleccionNotaMedica}/>

            <form onSubmit={enviar}>


                <div className="ml-10 mb-3 col">
                    <label className="etiqueta" htmlFor="tratamiento">Tratamiento</label>
                    <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="10" cols="30" 
                    {...register("tratamiento", { required: true })}/>
                </div>
                <div className='ml-10 mb-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="medico">Médico:</label>
                            <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                            <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                            <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                            <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}