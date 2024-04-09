import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react';

export function CrearPaciente() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const location = useLocation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Solo ejecutar el efecto una vez
        if (!mounted) {
            // Limpiar los parámetros de consulta de la URL al cargar la página
            const urlSinParametros = location.pathname;
            navegador(urlSinParametros);
            setMounted(true);
        }
    }, [mounted, location, navegador]);

    const registrarPaciente = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_paciente/"
            const respuesta = await axios.post(url, {
                curp: data.curp,
                no_expediente: data.noExpediente,
                "datosPersonalesPacient": {
                    nombre: data.nombre,
                    apellidoP: data.apellidoP,
                    apellidoM: data.apellidoM,
                    fechaDeNacimiento: data.fechaNacimiento,
                    edad: data.edad,
                    sexo: data.sexo,
                    nacionalidad: data.nacionalidad,
                    ocupacion: data.ocupacion,
                    estadoCivil: data.estadoCivil
                },
                "datosContactoPacient": {
                    telefono: data.numeroTelefonico,
                    correo: data.correo
                },
                "datosDireccionPacient": {
                    direccion: data.direccion,
                    colonia: data.colonia
                }
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            console.log("Paciente registrado correctamente");

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const enviar = handleSubmit(async data => {
        registrarPaciente(data)
        navegador("/crear_empleado")
    })

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

            <h3 className="mt-4 mb-4 titulo">Paciente nuevo</h3>
            <form onSubmit={enviar}>
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="curp">CURP</label>
                            <input id="curp" type="text" placeholder="CURP" className="entrada"
                                {...register("curp", { required: true })} />
                            {errors.curp && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                            <input id="fechaNacimiento" type="date" placeholder="dd/mm/aaaa" className="entrada"
                                {...register("fechaNacimiento", { required: true })} />
                            {errors.fechaNacimiento && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="edad">Edad</label>
                            <input id="edad" type="text" className="entrada"
                                {...register("edad", { required: true })} />
                            {errors.edad && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada"
                                {...register("nombre", { required: true })} />
                            {errors.nombre && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada"
                                {...register("apellidoP", { required: true })} />
                            {errors.apellidoP && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada"
                                {...register("apellidoM", { required: true })} />
                            {errors.apellidoM && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="noExpediente">Número de expediente</label>
                            <input id="noExpediente" type="text" className="entrada"
                                {...register("noExpediente", { required: true })} />
                            {errors.noExpediente && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="sexo">Sexo</label>
                            <select name="sexo" id="sexo" className="opciones"
                                {...register("sexo", { required: true })}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="hombre">Masculino</option>
                                <option value="mujer">Femenino</option>
                            </select>
                            {errors.sexo && <span>Es necesario este campo</span>}
                        </div>

                        {/*Aun falta que desglose la opción de otra */}
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nacionalidad">Nacionalidad</label>
                            <select name="nacionalidad" id="nacionalidad" className="opciones"
                                {...register("nacionalidad", { required: true })}>
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

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="estadoCivil">Estado civil</label>
                            <select name="estadoCivil" id="estadoCivil" className="opciones"
                                {...register("estadoCivil", { required: true })}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="union_libre">Unión libre</option>
                            </select>
                            {errors.estadoCivil && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                            <input id="numeroTelefonico" type="text" placeholder="Número telefónico" className="entrada"
                                {...register("numeroTelefonico", { required: true })} />
                            {errors.numeroTelefonico && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="correo">Correo electrónico</label>
                            <input id="correo" type="text" placeholder="Correo electrónico" className="entrada"
                                {...register("correo", { required: true })} />
                            {errors.correo && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="ocupacion">Ocupación</label>
                            <textarea id="ocupacion" placeholder="Ocupación" className="text-amplio"
                                {...register("ocupacion", { required: true })}>
                                {errors.ocupacion && <span>Es necesario este campo</span>}
                            </textarea>
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="colonia">Colonia</label>
                            <textarea id="colonia" type="text" placeholder="Colonia" className="entrada"
                                {...register("colonia", { required: true })} />
                            {errors.colonia && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="direccion">Direccción</label>
                            <textarea id="direccion" placeholder="Calle, No.Externo o Interno, CP" className="entrada"
                                {...register("direccion", { required: true })} />
                            {errors.direccion && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="pt-1 mt-3 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>

            </form>

        </div>
    )
}