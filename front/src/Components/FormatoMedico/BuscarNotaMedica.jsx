import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

function BuscarNotaMedica({ getIdNotaMedica }) {
    const [consulta, setConsulta] = useState('');
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleConsultaChange = (event) => {
        setConsulta(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/buscar_nota_medica/?q=${consulta}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setResultados(response.data);
            console.log(response.data);
            setError('');
        } catch (error) {
            setError('No se encontraron resultados');
            setResultados([]);
        }
    };

    const handlePacienteSeleccionado = (id) => {
        const seleccionado = resultados.find((notaMedica) => notaMedica.id === id);
        setResultados([seleccionado]);
        getIdNotaMedica(id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-group buscador1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el nombre o número de expediente"
                        aria-label="Input group example"
                        aria-describedby="basic-addon1"
                        value={consulta}
                        onChange={handleConsultaChange}
                    />
                    <button className="input-group-text btn-buscar" id="basic-addon1" type="submit">
                        <i className="color_icono bi bi-search"></i>
                        <div className="color_icono ml-10">Buscar</div>
                    </button>
                </div>
                <div className='mt-3 ml-10 form-campos'>
                    <label htmlFor="Instruccion" className='etiqueta'>Seleccione el paciente:</label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <ul className='mt-3 p-0'>
                    {resultados.map((notaMedica) => (
                        <ol key={notaMedica.id}>
                            <div className='mb-2 datos-busqueda'>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input caja_opciones"
                                        type="checkbox"
                                        id='seleccionar'
                                        name='seleccionar'
                                        onChange={() => handlePacienteSeleccionado(notaMedica.id)}
                                    />
                                    <label className='form-check-label etiqueta' htmlFor="seleccionar">Seleccionar</label>
                                </div>
                                <div className='mb-2 mt-3'>
                                    <div className='form-campos'>
                                        <label htmlFor="num_expediente">
                                            N° Expediente:
                                            <br />
                                            {notaMedica.paciente.no_expediente}
                                        </label>
                                    </div>
                                    <div className='form-campos'>
                                        <label htmlFor="nombre">Nombre:
                                            <br />
                                            {notaMedica.paciente.nombre} {notaMedica.paciente.apellido_paterno} {notaMedica.paciente.apellido_materno}
                                        </label>
                                    </div>
                                    <div className='form-campos'>
                                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento:
                                            <br />
                                            {notaMedica.paciente.fecha_nacimiento}
                                        </label>
                                    </div>
                                    <div className='form-campos'>
                                        <label htmlFor="fecha_consulta">Fecha de consulta:
                                            <br />
                                            {notaMedica.fecha_consulta}
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </ol>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default BuscarNotaMedica;
