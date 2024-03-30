import { useEffect, useState } from 'react'
import { PacienteIndividual } from './PacienteIndividual'
import { useAuth } from '../../Contexto/AuthContext';

import axios from 'axios'

export function ListaPacientes() {

    const [paciente, setPaciente] = useState([])
    const { token } = useAuth()


    useEffect(() => {
        async function cargarPacientes() {
            const url = "http://127.0.0.1:8000/api/pacientes"
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setPaciente(respuesta.data)
        }
        cargarPacientes()
    }, [])

    return (
        <div>
            <div className='mt-2'>
                {paciente.map(paciente => (
                    <PacienteIndividual key={paciente.noExpediente} paciente={paciente} />
                ))}
            </div>
        </div>
    )

}