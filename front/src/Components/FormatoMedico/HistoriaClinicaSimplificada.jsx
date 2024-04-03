import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { Ginecobstetrico } from '../FormatosCompartidos/Ginecobstetrico';
import { Interrogatorio } from './Interrogatorio';
import { ExploracionFisica } from './ExploracionFisica';
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
import BusquedaPaciente from "../Paciente/BuscarPaciente"

export function HistoriaClinicaSimplificada() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [ginecoData, setGinecoData] = useState({})
    const [interrogatorioData, setInterrogatorioData] = useState({})

    const handleGinecoData = (data) => {
        setGinecoData(data)
    }

    const handleInterrogatorioData= (data) => {
        setInterrogatorioData(data)
    }

    useEffect(() => {
        const getNoEmpleado = async () => {
            try {

                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const no_Empleado = response.data.user_info.no_trabajador
                setNoEmpleado(no_Empleado)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getNoEmpleado();
    }, [token]);

    const registrarHistorial = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/crear_historial_medico/"
            const respuesta = await axios.post(url, {
                fecha_elaboracion: data.fecha,
                "referenciaMed": {
                    num_consultorio: data.no_consultorio,
                    referencia: data.referencia,
                    lugar_referencia: data.lugar
                },
                "datosFamiliares": {
                    tipo_familia: data.tipo_familia,
                    rol_madre: data.rol_madre,
                    familia: data.familia,
                    disfuncional: data.disfuncional,
                    informante: data.informante
                },
                "ginecobMed": {
                    menarca: data.menarca,
                    vida_sexual: data.vida_sexual,
                    menstruacion: data.menstruacion,
                    num_embarazos: data.num_embarazos,
                    partos: data.partos,
                    abortos: data.abortos,
                    cesarea: data.cesarea,
                    ultimo_parto: data.ultimo_parto,
                    num_hijos: data.num_hijos,
                    macrosomicos: data.macrosomicos,
                    bajo_peso: data.bajo_peso,
                    num_parejas: data.num_parejas,
                    heterosexuales: data.heterosexuales,
                    homosexuales: data.homosexuales,
                    bisexuales: data.bisexuales,
                    diu: data.diu,
                    hormonales: data.hormonales,
                    quirurgico: data-quirurgico,
                    otros: data.otros
                },
                "interrogatorio":{
                    padecimiento: data.padecimiento,
                    aparatos_sistemas: data.aparatos_sistemas,
                    auxiliares: data.auxiliares,
                    tratamientos_previos: data.tratamientos_previos
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

    const enviar = handleSubmit(async data => {
        registrarHistorial({ ...data, ...ginecoData, ...interrogatorioData });
    })

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_medico">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\ficha_tecnica_medico">
                                Ficha técnica de consulta médica
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historia Clínica Simplificada</li>
                    </ol>
                </nav>
            </div>

            <div>
                <h3 className='subtitulo'>Historia Clínica Simplificada</h3>
                <BusquedaPaciente></BusquedaPaciente>

                <form onSubmit={enviar}>
                    <div className='ml-10 container'>
                        <div className='ml-10 mb-3'>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/*Se podria hacer que desde que incie sesion ponga en que consultorio esta 
                            para que ya no tenga que estar llenandolo */}
                                <label className='etiqueta' htmlFor="num_consultorio">N° consultorio: </label>
                                <input className="entrada" id='num_consultorio' name='num_consultorio' type="text"
                                    {...register("no_consultorio", { required: true })} />
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                                <input className="entrada" id='fecha' name='fecha' type="date"
                                    {...register("fecha", { required: true })} />
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="referencia">Referencia:</label>
                                <select className="opciones" id='referencia' name='referencia' type=""
                                    {...register("referencia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value={true}>Si</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="lugar">Lugar de referencia:</label>
                                <input className="entrada" id='lugar' name='lugar' type="text"
                                    {...register("lugar", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h4 className='subtitulo_2'> Información familiar</h4>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_familia">Tipo de familia: </label>
                                <select className="opciones" id='tipo_familia' name='tipo_familia' type=""
                                    {...register("tipo_familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">Nuclear</option>
                                    <option value="1">Extensa</option>
                                    <option value="2">Compuesta</option>
                                </select>

                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="rol_madre">Rol de madre: </label>
                                <select className="opciones" id='rol_madre' name='rol_madre' type=""
                                    {...register("rol_madre", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">No aplica</option>
                                    <option value="1">E-M</option>
                                    <option value="2">E-C</option>
                                    <option value="3">E-SD</option>
                                </select>
                            </div>
                        </div>

                        <h4 className='subtitulo_2'>Familiar responsable del paciente </h4>

                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="familia">Familia:</label>
                                <select className="opciones" id='familia' name='familia' type=""
                                    {...register("familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="1">1</option>
                                    <option value="d">D</option>
                                </select>
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="disfuncional">Disfuncionales familiares:</label>
                                <select className="opciones" id='disfuncional' name='disfuncional' type=""
                                    {...register("disfuncional", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="informante">Informante: </label>
                                <input className="entrada" id='informante' name='informante' type="text"
                                    {...register("informante", { required: true })} />
                            </div>
                        </div>

                    </div>

                    <div className='ml-10 container'>
                        <h3 className='subtitulo'>Antecedentes</h3>

                        <Ginecobstetrico getGinecoData={handleGinecoData} />
                    </div>

                    <div className='ml-10 container'>
                        <h3 className='subtitulo'>Interrogatorio</h3>

                        <Interrogatorio getInterrogatorioData={handleInterrogatorioData}/>
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Exploración física</h3>
                        <CardFichaEnfermeria />
                        <ExploracionFisica />
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="medico">Médico:</label>
                                <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                                <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                                <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                                <label className='etiqueta' htmlFor="firma">Firma:</label>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="pt-1 mb-3 text-center">
                            <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}