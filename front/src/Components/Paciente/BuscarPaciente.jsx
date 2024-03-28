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
                <div className="input-group buscador1">
                    <input type="text" className="form-control" placeholder="Ingrese el nombre o número de expediente" 
                    aria-label="Input group example" aria-describedby="basic-addon1" value={consulta} onChange={handleConsultaChange} />
                    <button className="input-group-text btn-buscar" id="basic-addon1">
                        <i className="color_icono bi bi-search"></i>
                        <div className="color_icono ml-10">
                            Buscar
                        </div>
                    </button>
                </div>


                <ul className='mt-3 p-0'>
                    {resultados.map((paciente) => (
                        <ol key={paciente.no_expediente}>

                            <div className='datos-busqueda'>
                                <div className='mb-2 mt-3'>
                                    <div className='form-campos'>
                                        <label htmlFor="num_expediente">
                                            N° Expediente:
                                            <br />
                                            {paciente.no_expediente}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="nombre">Nombre:
                                            <br />
                                            {paciente.datosPersonalesPacient.nombre} {paciente.datosPersonalesPacient.apellidoP} {paciente.datosPersonalesPacient.apellidoM}</label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento:
                                            <br />
                                            {paciente.datosPersonalesPacient.fechaDeNacimiento}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="direccion">Direccion:
                                            <br />
                                            {paciente.datosDireccionPacient.direccion}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="sexo">Sexo:
                                            <br />
                                            {paciente.datosPersonalesPacient.sexo}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="edad">Edad:
                                            <br />
                                            {paciente.datosPersonalesPacient.edad}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="ocupacion">Ocupación:
                                            <br />
                                            {paciente.datosPersonalesPacient.ocupacion}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="telefono">Teléfono:
                                            <br />
                                            {paciente.datosContactoPacient.telefono}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="nacionalidad">Nacionalidad:
                                            <br />
                                            {paciente.datosPersonalesPacient.nacionalidad}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </ol>
                    ))}
                </ul>
                {/*<ul>
                {resultados.map((paciente) => (
                    <li key={paciente.no_expediente}>
                        {paciente.no_expediente} <br />
                        {paciente.curp} <br />
                        {paciente.datosPersonalesPacient.nombre} {paciente.datosPersonalesPacient.apellidoP} {paciente.datosPersonalesPacient.apellidoM}
                    </li>
                ))}
            </ul>*/}
            </form>
        </div>
    );
}

export default BusquedaPaciente;
