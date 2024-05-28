import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import axios from "axios";

export function Parte2() {
    const navegador = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { token } = useAuth()
    const [showPDiabetes, setShowPDiabetes] = useState(false)
    const [showPHiper, setShowPHiper] = useState(false)
    const [showPCancer, setShowPCancer] = useState(false)
    const [showPCardio, setShowPCardio] = useState(false)
    const [showPTuber, setShowPTuber] = useState(false)
    const [showPAsma, setShowPAsma] = useState(false)
    const [showPEpilepsia, setShowPEpilepsia] = useState(false)
    const [noExpediente, setNoExpediente] = useState(null)
    const [sexo, setSexo] = useState(null)

    const handleChangeDiabetes = (e) => {
        setShowPDiabetes(e.target.value === "True");
    };

    const handleChangeHipertension = (e) => {
        setShowPHiper(e.target.value === "True");
    };

    const handleChangeCancer = (e) => {
        setShowPCancer(e.target.value === "True");
    };

    const handleChangeCardiovasculares = (e) => {
        setShowPCardio(e.target.value === "True");
    };

    const handleChangeTuberculosis = (e) => {
        setShowPTuber(e.target.value === "True");
    };

    const handleChangeAsma = (e) => {
        setShowPAsma(e.target.value === "True");
    };

    const handleChangeEpilepsia = (e) => {
        setShowPEpilepsia(e.target.value === "True");
    };

    const getNoExp = () => {
        const storedData = localStorage.getItem('noExp');
        setNoExpediente(JSON.parse(storedData));
    };

    useEffect(() => {
        if (token) {
            getNoExp();
        }
    }, [token]);

    const getPaciente = async () => {
        if (noExpediente) {
            try {
                const url = `http://127.0.0.1:8000/api/detalle_paciente/${noExpediente}`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setSexo(response.data.datosPersonalesPacient.sexo);
            } catch (error) {
                console.error("Ocurrió un error", error);
            }
        }
    };

    useEffect(() => {
        getPaciente();
    }, [noExpediente]);

    const enviar = handleSubmit(async data => {
        localStorage.setItem('antecedentes', JSON.stringify(data))
        navegador("/historial_odontologico_p3")
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

            {/*
            <div className='ml-10 mt-3 mb-2 container'>
                <CardPaciente />
    </div>*/}
            <h2 className='subtitulo'>Antecedentes</h2>

            <div className='ml-10 container'>
                <form className="row" onSubmit={enviar}>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo_2">Antecedentes Hereditarios Patologicos</h3>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                                    <select name="diabetes" id="diabetes" className="opciones" type=""
                                        {...register("diabetesH", { required: true })}
                                        onChange={handleChangeDiabetes}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPDiabetes && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                            <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                                {...register("diabetesParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <select name="hipertension" id="hipertension" className="opciones" type=""
                                        {...register("hipertH", { required: true })}
                                        onChange={handleChangeHipertension}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPHiper && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                            <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                                {...register("hipertParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <select name="cancer" id="cancer" className="opciones" type=""
                                        {...register("cancer", { required: true })}
                                        onChange={handleChangeCancer}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPCancer && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                                            <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                                {...register("cancerParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones" type=""
                                        {...register("tuberculoH", { required: true })}
                                        onChange={handleChangeTuberculosis}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPTuber && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco</label>
                                            <textarea name="par_tubercolosis" id="par_tubercolosis" className="text-amplio"
                                                {...register("tuberculoParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="asma">Asma</label>
                                    <select name="asma" id="asma" className="opciones" type=""
                                        {...register("asmaH", { required: true })}
                                        onChange={handleChangeAsma}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPAsma && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_asma">Parentesco</label>
                                            <textarea name="par_asma" id="par_asma" className="text-amplio"
                                                {...register("asmaParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares</label>
                                    <select name="cardiovascular" id="cardiovascular" className="opciones" type=""
                                        {...register("cardioH", { required: true })}
                                        onChange={handleChangeCardiovasculares}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPCardio && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco</label>
                                            <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"
                                                {...register("cardioParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="epilepsia">Epilepsia</label>
                                    <select name="epilepsia" id="epilepsia" className="opciones" type=""
                                        {...register("epilepsiaH", { required: true })}
                                        onChange={handleChangeEpilepsia}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {showPEpilepsia && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_epilepsia">Parentesco</label>
                                            <textarea name="par_epilepsia" id="par_epilepsia" className="text-amplio"
                                                {...register("epilepsiaParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo_2">Antecedentes Personales Patologicos</h3>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                                    <select name="diabetes" id="diabetes" className="opciones"
                                        {...register("diabetes", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <select name="hipertension" id="hipertension" className="opciones"
                                        {...register("hipert", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <select name="cancer" id="cancer" className="opciones"
                                        {...register("cancer", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones"
                                        {...register("tuberculo", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
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
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="quirurgicos">Quirurgicos</label>
                                    <select name="quirurgicos" id="quirurgicos" className="opciones"
                                        {...register("quirurgicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                                    <select name="anestesicos" id="anestesicos" className="opciones"
                                        {...register("anestesicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                                    <select name="alergicos" id="alergicos" className="opciones"
                                        {...register("alergicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="traumaticoss">Traumáticos</label>
                                    <select name="traumaticos" id="traumaticos" className="opciones"
                                        {...register("trauma", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo_2">Antecedentes Personales No Patologicos</h3>
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
                    {sexo === 'Femenino' && (
                        <div className='ml-10 container'>
                            <h3 className="subtitulo_2">Antecedentes ginecobstetricos</h3>
                            <div className='row'>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="fechaDoc">Fecha de ultima Doc.</label>
                                    <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada"
                                        {...register("fecha_ult_doc", { required: true })} />
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="fechaDoc">Fecha ultima regla</label>
                                    <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada"
                                        {...register("fecha_ultima_regla", { required: true })} />
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="planiFami">Planificación familiar</label>
                                    <input id="planiFami" type="text" placeholder="Planificación" className="entrada"
                                        {...register("planificacion_fam", { required: true })} />
                                </div>
                            </div>
                        </div>
                    )}


                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div >
    )
}