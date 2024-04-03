import { CardPaciente } from "../Paciente/CardPaciente"
import { AntHerediPat } from "./AntHerediPat"
import { AntPersoPato } from "./AntPersoPato"
import { AntPPatologicos } from "./AntPPatologicos"
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import React, { useEffect, useState } from 'react';


export function Antecedente() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);

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

    const registrarHistOdonto = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_histOdonto/"
            const respuesta = await axios.post(url, {
                fecha_elaboracion: data.fechaElaboracion,
                "referencia": {
                    referencia: data.referencia,
                    referencia_lugar: data.referenciaLugar,
                },
                "aparatosSistemas": {
                    respiratorio: data.respiratorio,
                    digestivo: data.digestivo,
                    neuro: data.neuro,
                    cardioV: data.cardioV,
                    muscoes: data.muscoes
                },
                padecimiento_actual: data.padecimiento,
                habitos_exteriores: data.habitos_ext,
                "cabeza": {
                    labios: data.labios,
                    mucosa: data.mucosa,
                    encias: data.encias,
                    lengua: data.lengua,
                    paladar_blando: data.paladar_blando,
                    paladar_duro: data.paladar_duro
                },
                "antHerediPato": {
                    diabetesH: data.diabetesH,
                    hipertH: data.hipertH,
                    tuberculoH: data.tuberculoH,
                    cancerH: data.cancerH,
                    cardioH: data.cardioH,
                    asmaH: data.asmaH,
                    epilepsiaH: data.epilepsiaH,
                    diabetes_parentesco: data.diabetesParentesco,
                    hipert_parentesco: data.hipertParentesco,
                    tuberculo_parentesco: data.tuberculoParentesco,
                    cancer_parentesco: data.cancerParentesco,
                    cardio_parentesco: data.cardioParentesco,
                    asma_parentesco: data.asmaParentesco,
                    epilepsia_parentesco: data.epilepsiaParentesco,

                },
                "antPersonPato": {
                    diabetes: data.diabetes,
                    hipert: data.hipert,
                    tuberculo: data.tuberculo,
                    cancer: data.cancer,
                    transfusion: data.transfusion,
                    quirurgicos: data.quirurgicos,
                    anestesicos: data.anestesicos,
                    alergicos: data.alergicos,
                    trauma: data.trauma
                },
                "personNoPato": {
                    vacuna: data.vacuna,
                    alimentacion: data.alimentacion,
                    fauna_nociva: data.fauna_nociva,
                    vivienda: data.vivienda,
                    adicciones: data.adicciones
                },
                "antGinecob": {
                    fecha_ultima_regla: data.fechaUltRegla,
                    fecha_ult_doc: data.fechaUltDoc,
                    planificacion_fam: data.planiFami
                },
                cuello_odont: data.cuello,
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
        registrarHistOdonto(data)
        navegador("/hist_dent")
    })


    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_odontologo">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Antecedentes</li>
                    </ol>
                </nav>
            </div>

            <h2 className='subtitulo'>Antecedentes</h2>
            <BusquedaPaciente></BusquedaPaciente>

            {/*
            <div className='ml-10 mt-3 mb-2 container'>
                <CardPaciente />
    </div>*/}

            <div className='ml-10 container'>
                <form className="row" onSubmit={enviar}>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Hereditarios Patologicos</h3>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                                    <select name="diabetes" id="diabetes" className="opciones" type=""
                                        {...register("diabetesH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <select name="hipertension" id="hipertension" className="opciones" type=""
                                        {...register("hipertH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <select name="cancer" id="cancer" className="opciones" type=""
                                        {...register("cancer", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones" type=""
                                        {...register("tuberculoH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                    <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                        {...register("diabetesParentesco", { required: true })}></textarea>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                    <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                        {...register("hipertParentesco", { required: true })}></textarea>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                                    <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                        {...register("cancerParentesco", { required: true })}></textarea>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco</label>
                                    <textarea name="par_tubercolosis" id="par_tubercolosis" className="text-amplio"
                                        {...register("tuberculoParentesco", { required: true })}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="asma">Asma</label>
                                    <select name="asma" id="asma" className="opciones" type=""
                                        {...register("asmaH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares</label>
                                    <select name="cardiovascular" id="cardiovascular" className="opciones" type=""
                                        {...register("cardioH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="epilepsia">Epilepsia</label>
                                    <select name="epilepsia" id="epilepsia" className="opciones" type=""
                                        {...register("epilepsiaH", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_asma">Parentesco</label>
                                    <textarea name="par_asma" id="par_asma" className="text-amplio"
                                        {...register("asmaParentesco", { required: true })}></textarea>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco</label>
                                    <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"
                                        {...register("cardioParentesco", { required: true })}></textarea>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_epilepsia">Parentesco</label>
                                    <textarea name="par_epilepsia" id="par_epilepsia" className="text-amplio"
                                        {...register("epilepsiaParentesco", { required: true })}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Personales Patologicos</h3>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                                    <select name="diabetes" id="diabetes" className="opciones"
                                        {...register("diabetes", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <select name="hipertension" id="hipertension" className="opciones"
                                        {...register("hipert", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <select name="cancer" id="cancer" className="opciones"
                                        {...register("cancer", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones"
                                        {...register("tuberculo", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="transfusiones">Transfusiones</label>
                                    <select name="transfusiones" id="transfusiones" className="opciones"
                                        {...register("transfusion", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="quirurgicos">Quirurgicos</label>
                                    <select name="quirurgicos" id="quirurgicos" className="opciones"
                                        {...register("quirurgicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                                    <select name="anestesicos" id="anestesicos" className="opciones"
                                        {...register("anestesicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                                    <select name="alergicos" id="alergicos" className="opciones"
                                        {...register("alergicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="traumaticoss">Traumaticos</label>
                                    <select name="traumaticos" id="traumaticos" className="opciones"
                                        {...register("trauma", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Personales No Patologicos</h3>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="vacuna">Vacunas</label>
                                    <input id="vacuna" type="text" placeholder="Vacunas aplicadas" className="entrada"
                                        {...register("vacuna", { required: true })} />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                                    <input id="alimentacion" type="text" placeholder="Alimentación" className="entrada"
                                        {...register("alimentacion", { required: true })} />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                                    <input id="fauna" type="text" placeholder="Fauna nociva" className="entrada"
                                        {...register("fauna_nociva", { required: true })} />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                                    <input id="vivienda" type="text" placeholder="Vivivenda" className="entrada"
                                        {...register("vivienda", { required: true })} />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="higiene">Adicciones</label>
                                    <input id="adicc" type="text" placeholder="Adicciones" className="entrada"
                                        {...register("adicciones", { required: true })} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}
                    {/*---------------------------------------------------------------------------------------*/}

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div >
    )
}