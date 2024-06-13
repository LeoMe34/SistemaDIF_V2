import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

function BuscarPacientePsico({ getIdHistorialMedico, isMostrarExp, isHomePage }) {
    const [consulta, setConsulta] = useState('');
    const [resultados, setResultados] = useState([]);
    const [showResultados, setShowResultados] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth()
    const { setNoExpediente } = useNoExpediente()
    const navegador = useNavigate()


    const handleConsultaChange = (event) => {
        setConsulta(event.target.value);
    };

    const validarEntrada = (entrada) => {
        const entradaRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s.-]{1,50}$/
        return entradaRegex.test(entrada)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const entrada = validarEntrada(consulta)
        if (!entrada) {
            toast.error("Ese caracter no es valido")
            setResultados([]);
        } else {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/buscar_paciente_psico/?q=${consulta}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setResultados(response.data);
                setShowResultados(true);
                setError('');
            } catch (error) {
                setError('Ocurrió un error al buscar pacientes.');
                setResultados([]);
            }
        }
    };

    const handlePacienteSeleccionado = (noExpediente) => {
        setNoExpediente(noExpediente);

        if (isMostrarExp) {
            navegador(`/mostrar_expediente_psicologia`)
        }
        if (getIdHistorialMedico) {
            getIdHistorialMedico(noExpediente);
        }
        if (isHomePage) {
            navegador(`/mostrar_paciente/${noExpediente}`)
        }

        const pacienteSeleccionado = resultados.find(paciente => paciente.no_expediente === noExpediente);
        setResultados([pacienteSeleccionado]);
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

                {resultados.length > 0 && showResultados && (
                    <div className='mt-3 ml-10 form-campos'>
                        <label htmlFor="Instruccion" className='etiqueta'>Seleccione el paciente:</label>
                    </div>
                )}

                <ul className='mt-3 p-0'>
                    {resultados.length > 0 ? (
                        resultados.map((paciente) => (
                            <ol key={paciente.no_expediente}>

                                <div className='datos-busqueda'>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input caja_opciones" type="checkbox" id='seleccionar' name='seleccionar'
                                            onChange={() => handlePacienteSeleccionado(paciente.no_expediente)} />
                                        <label className='form-check-label etiqueta' htmlFor="seleccionar">Seleccionar</label>
                                    </div>
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
                                    </div>

                                </div>
                            </ol>
                        ))
                    ) : (
                        <div className="mt-3 ml-10">No se encontraron resultados.</div>
                    )}
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

export default BuscarPacientePsico;
