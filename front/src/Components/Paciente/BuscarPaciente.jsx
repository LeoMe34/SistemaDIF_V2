import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { CardPaciente } from './CardPaciente';


function BusquedaPaciente() {
    const [consulta, setConsulta] = useState('');
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth()


    const handleConsultaChange = (event) => {
        setConsulta(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/buscar_paciente/?q=${consulta}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setResultados(response.data);
            console.log(resultados)
            setError('');
        } catch (error) {
            setError('Ocurrió un error al buscar pacientes.');
            setResultados([]);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={consulta} onChange={handleConsultaChange} />
                <button type="submit">Buscar</button>
            </form>


            <ul>
                {resultados.map((paciente) => (
                    <li key={paciente.no_expediente}>
                        {paciente.no_expediente} <br />
                        {paciente.curp} <br />
                        {paciente.datosPersonalesPacient.nombre} {paciente.datosPersonalesPacient.apellidoP} {paciente.datosPersonalesPacient.apellidoM}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default BusquedaPaciente;
