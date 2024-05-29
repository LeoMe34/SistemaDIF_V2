import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useUsuarioId } from '../../Contexto/UsuarioIdContext';
import { toast } from 'react-hot-toast'

function BuscarUsuario() {
    const [consulta, setConsulta] = useState('');
    const [resultados, setResultados] = useState([]);
    const [showResultados, setShowResultados] = useState(true);
    const { token } = useAuth()
    const { setUsuarioId } = useUsuarioId()


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
                const response = await axios.get(`http://127.0.0.1:8000/api/buscar_usuario/?q=${consulta}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setResultados(response.data);
                console.log(resultados)
            } catch (error) {
                console.log("Ocurrio un error: " + error)
                setResultados([]);
            }
        }
    };

    const handleUsuarioSeleccionado = (id) => {
        console.log(id);
        setUsuarioId(id);
        const usuarioSeleccionado = resultados.find(usuario => usuario.id === id);
        setResultados([usuarioSeleccionado]);
        setShowResultados(false)
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="input-group buscador1">
                    <input type="text" className="form-control" placeholder="Ingrese el usuario o id"
                        aria-label="Input group example" aria-describedby="basic-addon1" value={consulta} onChange={handleConsultaChange} />
                    <button className="input-group-text btn-buscar" id="basic-addon1">
                        <i className="color_icono bi bi-search"></i>
                        <div className="color_icono">
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
                    {resultados.map((user) => (
                        < ol key={user.id} >

                            <div className='mb-2 datos-busqueda'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" type="checkbox" id='seleccionar' name='seleccionar'
                                        onChange={() => handleUsuarioSeleccionado(user.id)} />
                                    <label className='form-check-label etiqueta' htmlFor="seleccionar">Seleccionar</label>
                                </div>
                                <div className='mb-2 mt-3'>
                                    <div className='form-campos'>
                                        <label htmlFor="username">
                                            Nombre de usuario:
                                            <br />
                                            {user.username}
                                        </label>
                                    </div>

                                    <div className='form-campos'>
                                        <label htmlFor="nombre">Correo:
                                            <br />
                                            {user.email} </label>
                                    </div>
                                </div>
                            </div>
                        </ol>
                    ))}
                </ul>
            </form>
        </div >
    );
}

export default BuscarUsuario;
