import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';

export function MostrarPaciente() {
    const { token } = useAuth()
    const { noExpediente } = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [detallePaciente, setDetallePaciente] = useState(null)
    const [showDatos, setShowDatos] = useState(false);
    const [editando, setEditando] = useState(false);

    const [ocupacion, setOcupacion] = useState(null)
    const [estadoCivil, setEstadoCivil] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [correo, setCorreo] = useState(null)
    const [direccion, setDireccion] = useState(null)
    const [colonia, setColonia] = useState(null)

    const getDetallePaciente = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/detalle_paciente/${noExpediente}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetallePaciente(response.data);
            const paciente = response.data
            setOcupacion(paciente.datosPersonalesPacient.ocupacion)
            setEstadoCivil(paciente.datosPersonalesPacient.estadoCivil)
            setTelefono(paciente.datosContactoPacient.telefono)
            setCorreo(paciente.datosContactoPacient.correo)
            setDireccion(paciente.datosDireccionPacient.direccion)
            setColonia(paciente.datosDireccionPacient.colonia)

        } catch (error) {
            console.error('Error al obtener detalles del paciente:', error);
        }
    }

    const modificarPaciente = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/modificar_paciente/${noExpediente}`
            const respuesta = await axios.put(url, {
                datosPersonalesPacient: {
                    nombre:detallePaciente.datosPersonalesPacient.nombre,
                    apellidoP:detallePaciente.datosPersonalesPacient.apellidoP,
                    apellidoM:detallePaciente.datosPersonalesPacient.apellidoM,                    
                    fechaDeNacimiento:detallePaciente.datosPersonalesPacient.fechaDeNacimiento,
                    edad:detallePaciente.datosPersonalesPacient.edad,
                    sexo:detallePaciente.datosPersonalesPacient.sexo,
                    nacionalidad:detallePaciente.datosPersonalesPacient.nacionalidad,
                    ocupacion: ocupacion,
                    estadoCivil: estadoCivil
                },
                datosContactoPacient: {
                    telefono: telefono,
                    correo: correo
                },
                datosDireccionPacient: {
                    direccion:direccion,
                    colonia: colonia
                },
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setShowDatos(false)
            console.log("Paciente modificado correctamente");

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        getDetallePaciente()
    }, [noExpediente, token])

    useEffect(() => {
        if (detallePaciente !== null) {
            setShowDatos(true)
        }
    }, [detallePaciente])

    const handleEditarPerfil = () => {
        setEditando(true);
    };

    const handleOcupacion = (e) => {
        setOcupacion(e.target.value);
    };

    const handleEstadoCivil = (e) => {
        setEstadoCivil(e.target.value);
    };

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    };

    const handleTelefono = (e) => {
        setTelefono(e.target.value);
    };

    const handleColonia = (e) => {
        setColonia(e.target.value);
    };

    const handleDireccion = (e) => {
        setDireccion(e.target.value);
    };

    const handleGuardarCambios = async () => {
        modificarPaciente()
        window.location.reload()
    }

    const handleCancelarEdicion = () => {
        setEditando(false);
    };

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_recepcion">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Paciente nuevo</li>
                    </ol>
                </nav>
            </div>

            <h3 className="mt-4 mb-4 titulo">Número de expediente: {noExpediente}</h3>
            {showDatos &&
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="curp">CURP</label>
                            <input id="curp" type="text" placeholder="CURP" className="entrada"
                                value={detallePaciente.curp} readOnly />
                            {errors.curp && <span>Es necesario este campo</span>}
                        </div>


                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                            <input id="fechaNacimiento" type="date" placeholder="dd/mm/aaaa" className="entrada"
                                value={detallePaciente.datosPersonalesPacient.fechaDeNacimiento} readOnly />
                            {errors.fechaNacimiento && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="edad">Edad</label>
                            <input id="edad" type="text" className="entrada"
                                value={detallePaciente.datosPersonalesPacient.edad} readOnly />
                            {errors.edad && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>
            }
            {showDatos &&
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada"
                                value={detallePaciente.datosPersonalesPacient.nombre} readOnly />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                value={detallePaciente.datosPersonalesPacient.apellidoP} readOnly />
                            {errors.apellidoP && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                value={detallePaciente.datosPersonalesPacient.apellidoM} readOnly />
                            {errors.apellidoM && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>
            }

            {showDatos &&
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="noExpediente">Número de expediente</label>
                            <input id="noExpediente" type="text" className="entrada"
                                value={detallePaciente.no_expediente} readOnly />
                            {errors.noExpediente && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="sexo">Sexo</label>
                            <select name="sexo" id="sexo" className="opciones"
                                value={detallePaciente.datosPersonalesPacient.sexo} disabled>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            {errors.sexo && <span>Es necesario este campo</span>}
                        </div>

                        {/*Aun falta que desglose la opción de otra */}
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nacionalidad">Nacionalidad</label>
                            <select name="nacionalidad" id="nacionalidad" className="opciones"
                                value={detallePaciente.datosPersonalesPacient.nacionalidad} disabled>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="Mexicana">Mexicana</option>
                                <option value="Extranjero">Otra</option>
                            </select>
                            {errors.nacionalidad && <span>Es necesario este campo</span>}

                            {/*mostrarOtraNacion && <div className="mb-5">
                    <label className="form-label etiqueta" htmlFor="otra_nacionalidad">Otra</label>
                    <input id="otra_nacionalidad" type="text" placeholder="Nacionalidad" className="entrada"/>
</div>*/}
                        </div>
                    </div>
                </div>
            }

            {showDatos &&
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="estadoCivil">Estado civil</label>
                                <select name="estadoCivil" id="estadoCivil" className="opciones"
                                    value={estadoCivil} onChange={handleEstadoCivil}>
                                    <option value="" disabled selected>Elija la opción</option>
                                    <option value="soltero">Soltero</option>
                                    <option value="casado">Casado</option>
                                    <option value="viudo">Viudo</option>
                                    <option value="divorciado">Divorciado</option>
                                    <option value="union_libre">Unión libre</option>
                                </select>
                                {errors.estadoCivil && <span>Es necesario este campo</span>}
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="estadoCivil">Estado civil</label>
                                <select name="estadoCivil" id="estadoCivil" className="opciones"
                                    value={detallePaciente.datosPersonalesPacient.estadoCivil} disabled>
                                    <option value="" disabled selected>Elija la opción</option>
                                    <option value="soltero">Soltero</option>
                                    <option value="casado">Casado</option>
                                    <option value="viudo">Viudo</option>
                                    <option value="divorciado">Divorciado</option>
                                    <option value="union_libre">Unión libre</option>
                                </select>
                                {errors.estadoCivil && <span>Es necesario este campo</span>}
                            </div>
                        )}
                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                                <input id="numeroTelefonico" type="text" placeholder="Número telefónico" className="entrada"
                                    value={telefono} onChange={handleTelefono} />
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                                <input id="numeroTelefonico" type="text" placeholder="Número telefónico" className="entrada"
                                    value={detallePaciente.datosContactoPacient.telefono} readOnly />
                            </div>
                        )}

                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="correo">Correo electrónico</label>
                                <input id="correo" type="text" placeholder="Correo electrónico" className="entrada"
                                    value={correo} onChange={handleCorreo} />
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="correo">Correo electrónico</label>
                                <input id="correo" type="text" placeholder="Correo electrónico" className="entrada"
                                    value={detallePaciente.datosContactoPacient.correo} readOnly />
                            </div>
                        )}
                    </div>
                </div>
            }

            {showDatos &&
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="ocupacion">Ocupación</label>
                                <textarea id="ocupacion" placeholder="Ocupación" className="text-amplio"
                                    value={ocupacion} onChange={handleOcupacion}>
                                </textarea>
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="ocupacion">Ocupación</label>
                                <textarea id="ocupacion" placeholder="Ocupación" className="text-amplio"
                                    value={detallePaciente.datosPersonalesPacient.ocupacion} readOnly>
                                </textarea>
                            </div>
                        )}

                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="colonia">Colonia</label>
                                <textarea id="colonia" type="text" placeholder="Colonia" className="entrada"
                                    value={colonia} onChange={handleColonia} />
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="colonia">Colonia</label>
                                <textarea id="colonia" type="text" placeholder="Colonia" className="entrada"
                                    value={detallePaciente.datosDireccionPacient.colonia} readOnly />
                            </div>
                        )}

                        {editando ? (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="direccion">Direccción</label>
                                <textarea id="direccion" placeholder="Calle, No.Externo o Interno, CP" className="entrada"
                                    value={direccion} onChange={handleDireccion} />
                            </div>
                        ) : (
                            <div className="col">
                                <label className="form-label etiqueta" htmlFor="direccion">Direccción</label>
                                <textarea id="direccion" placeholder="Calle, No.Externo o Interno, CP" className="entrada"
                                    value={detallePaciente.datosDireccionPacient.direccion} readOnly />
                            </div>
                        )}

                    </div>
                </div>
            }
            {editando ? (
                <div>
                    <button className="btn btn-guardar btn-lg btn-block" onClick={handleGuardarCambios}>
                        Guardar cambios
                    </button>

                    <button className="btn ml-10 btn-cancelar btn-lg btn-block" onClick={handleCancelarEdicion}>
                        Cancelar
                    </button>
                </div>
            ) : (
                <div className="pt-1 mt-3 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block" onClick={handleEditarPerfil}>
                        Editar paciente
                    </button>
                </div>
            )}

        </div>
    )
}