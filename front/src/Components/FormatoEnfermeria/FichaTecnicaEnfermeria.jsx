import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { toast } from 'react-hot-toast'
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function FichaTecnicaEnfermeria() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
    const { noExpediente } = useNoExpediente()
    const [userGroup, setUserGroup] = useState(null);
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombreE, setNombreE] = useState(null);
    const [fechaActual, setFechaActual] = useState('')    

    useEffect(() => {
        const getNoEmpleado = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const no_Empleado = response.data.user_info.no_trabajador
                const nombre = response.data.user_info.nombre_empleado
                setNoEmpleado(no_Empleado)
                setNombreE(nombre)
                const group_usuario = response.data.user_info.name
                setUserGroup(group_usuario)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getNoEmpleado();
    }, [token]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    useEffect(() => {
        const peso = watch('peso');
        const talla = watch('talla');
        if (peso && talla) {
            const imc = (parseFloat(peso) / (parseFloat(talla) ** 2)).toFixed(2);
            setValue("imc", imc);
        }
    }, [watch(['peso', 'talla']), setValue]);

    const registrarFicha = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_ficha_enfermeria/"
            const respuesta = await axios.post(url, {
                fecha: fechaActual,
                "signosVitales": {
                    presion: data.presion,
                    frecuenciaC: data.frecuencia_cardiaca,
                    frecuenciaR: data.frecuencia_respiratoria,
                    temperatura: data.temperatura,
                    glicemia: data.glicemia
                },
                "datosFisicos": {
                    peso: data.peso,
                    talla: data.talla,
                    imc: data.imc
                },
                servicio_enfermeria: data.tipo_atencion,
                trabajador: data.es_trabajador,
                "datosDemograficos": {
                    religion: data.religion,
                    escolaridad: data.escolaridad,
                    discapacitado: data.discapacitado,
                    adulto_mayor: data.adulto_mayor,
                    embarazada: data.embarazada,
                    ninguna: data.ninguno
                },
                paciente: noExpediente,
                empleado: noEmpleado
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

    const getFichaDuplicada = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExpediente}/${fechaActual}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return true
            console.log(response.data)
        } catch (error) {
            console.error('Error al obtener la ficha', error);
            return false
        }
    };

    const validarPesoYTalla = (pesoYTalla) => {
        const pesoYTallaRegex = /^[0-9.]{1,10}$/

        return pesoYTallaRegex.test(pesoYTalla)
    }

    const validarPresionYFrecCardioYFrecRespYglicemia = (presionYfcYfrYg) => {
        const presionRegex = /^[0-9/\s]{1,7}$/

        return presionRegex.test(presionYfcYfrYg)
    }

    const validarTemperatura = (temperatura) => {
        const temperaturaRegex = /^[0-9.]{1,5}$/

        return temperaturaRegex.test(temperatura)
    }

    const validarReligionYEscolaridad = (religionYEscolar) => {
        const religionYEscolaridadRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ/.-\s]{1,50}$/

        return religionYEscolaridadRegex.test(religionYEscolar)
    }

    const enviar = handleSubmit(async data => {
        const pesoValido = validarPesoYTalla(data.peso)
        const tallaValido = validarPesoYTalla(data.talla)
        const presionValido = validarPresionYFrecCardioYFrecRespYglicemia(data.presion)
        const frecCardioValido = validarPresionYFrecCardioYFrecRespYglicemia(data.frecuencia_cardiaca)
        const frecRespValido = validarPresionYFrecCardioYFrecRespYglicemia(data.frecuencia_respiratoria)
        const glicemiaValido = validarPresionYFrecCardioYFrecRespYglicemia(data.glicemia)
        const temperaturaValido = validarTemperatura(data.temperatura)
        const religionValido = validarReligionYEscolaridad(data.religion)
        const escolaridadValido = validarReligionYEscolaridad(data.escolaridad)

        if (!pesoValido) {
            toast.error("Ingrese sólo números y . en el peso")
        } else if (!tallaValido) {
            toast.error("Ingrese sólo números y . en la talla")
        } else if (!presionValido) {
            toast.error("Ingrese sólo números y / en el campo del T/A")
        } else if (!frecCardioValido) {
            toast.error("Ingrese sólo números y / en la frecuencia cardiaca")
        } else if (!frecRespValido) {
            toast.error("Ingrese sólo números y / en la frecuencia respiratoria")
        } else if (!glicemiaValido) {
            toast.error("Ingrese sólo números y / en el campo de glicemia")
        } else if (!temperaturaValido) {
            toast.error("Ingrese sólo números y . en el campo de temperatura")
        } else if (!religionValido) {
            toast.error("Ingrese sólo letras en el campo de religion")
        } else if (!escolaridadValido) {
            toast.error("Ingrese sólo letras en el campo de escolaridad")
        }
        else {
            const fichaDuplicada = await getFichaDuplicada();
            if (!fichaDuplicada) {
                mensajeConfirmacionGuardar(' la ficha tecnica', userGroup, navegador, () => {
                    registrarFicha(data)
                })
            } else {
                toast.error("El paciente ya tiene una ficha de hoy")
            }

        }
    })

    const handleCheckboxChange = (e) => {
        if (e.target.name === "ninguna") {
            setValue("discapacitado", false);
            setValue("adulto_mayor", false);
            setValue("embarazada", false);
        } else {
            setValue("ninguna", false);
        }
    };

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_enfermeria">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de enfermería</li>
                    </ol>
                </nav>
            </div>
            <h3 className='subtitulo'>Ficha técnica de enfermería</h3>

            <BusquedaPaciente></BusquedaPaciente>

            <form onSubmit={enviar}>
                <div className='ml-10 mt-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha: </label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                value={fechaActual} readOnly
                                {...register("fecha", { required: false })} />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="es_trabajador">Trabajador:
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select className="opciones" id='es_trabajador' name='es_trabajador' type=""
                                {...register("es_trabajador", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                            {errors.es_trabajador && <span>Es necesario este campo</span>}
                        </div>

                    </div>
                </div>

                <div className='ml-10 mt-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="peso">Peso (Kg):
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='peso' name='peso' type="text"
                                {...register("peso", { required: true })} />
                            {errors.peso && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="talla">Talla (m):
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='talla' name='talla' type="text"
                                {...register("talla", { required: true })} />
                            {errors.talla && <span>Es necesario este campo</span>}
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="imc">IMC:
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input className="entrada" id='imc' name='imc' type="text"
                                {...register("imc", { required: true })} readOnly />
                            {errors.imc && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='subtitulo'>Registro de signos vitales</h3>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_atencion">Tipo de atención
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <select className="opciones" id='tipo_atencion' name='tipo_atencion' type=""
                                    {...register("tipo_atencion", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="1">Consulta general</option>
                                    <option value="2">Curación</option>
                                    <option value="3">Retiro de puntos</option>
                                    <option value="4">Aplicación de medicamentos</option>
                                    <option value="5">DxTx</option>
                                </select>
                                {errors.tipo_atencion && <span>Es necesario este campo</span>}
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="presion">T/A:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='presion' name='presion' type="text"
                                    {...register("presion", { required: true })} />
                                {errors.presion && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="frecuencia_cardiaca">Frecuencia cardiaca (lpm):
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='frecuencia_cardiaca' name='frecuencia_cardiaca' type="text"
                                    {...register("frecuencia_cardiaca", { required: true })} />
                                {errors.frecuencia_cardiaca && <span>Es necesario este campo</span>}
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="frecuencia_respiratoria">Frecuencia respiratoria (rpm):
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='frecuencia_respiratoria' name='frecuencia_respiratoria' type="text"
                                    {...register("frecuencia_respiratoria", { required: true })} />
                                {errors.frecuencia_respiratoria && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="temperatura">Temperatura:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='temperatura' name='temperatura' type="text"
                                    {...register("temperatura", { required: true })} />
                                {errors.temperatura && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="glicemia">Glicemia capilar:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='glicemia' name='glicemia' type="text"
                                    {...register("glicemia", { required: true })} />
                                {errors.glicemia && <span>Es necesario este campo</span>}
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="religion">Religión:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='religion' name='religion' type="text"
                                    {...register("religion", { required: true })} />
                                {errors.religion && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="escolaridad">Escolaridad:
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>
                                <input className="entrada" id='escolaridad' name='escolaridad' type="text"
                                    {...register("escolaridad", { required: true })} />
                                {errors.escolaridad && <span>Es necesario este campo</span>}
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_poblacion">Tipo de población
                                    <span className='etiqueta_obligatoria'>*</span>
                                </label>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" type="checkbox" id='discapacitado' name='discapacitado'
                                        {...register("discapacitado")} onChange={handleCheckboxChange} />
                                    <label className='form-check-label etiqueta' htmlFor="discapacitado">Discapacitado</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='adulto_mayor' name='adulto_mayor' type="checkbox"
                                        {...register("adulto_mayor")} onChange={handleCheckboxChange} />
                                    <label className='form-check-label etiqueta' htmlFor="adulto_mayor">Adulto mayor</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='embarazada' name='embarazada' type="checkbox"
                                        {...register("embarazada")} onChange={handleCheckboxChange} />
                                    <label className='form-check-label etiqueta' htmlFor="embarazada">Embarazada</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input className="form-check-input caja_opciones" id='ninguna' name='ninguna' type="checkbox"
                                        {...register("ninguna")} onChange={handleCheckboxChange} />
                                    <label className='form-check-label etiqueta' htmlFor="ninguna">Ninguna</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="enfermero">Enfermero</label>
                                <input className="datos_lectura" id='enfermero' name='enfermero' type="text"
                                    value={nombreE} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}