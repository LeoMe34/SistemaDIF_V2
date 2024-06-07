import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import axios from "axios";
import { toast } from 'react-hot-toast'

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

    const validarParentesco = (parentesco) => {
        const parentescoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü\s.-:,;()]{1,500}$/

        return parentescoRegex.test(parentesco)
    }

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

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
        const parentescoDiabetesValido = validarParentesco(data.diabetesParentesco)
        const parentescoHipertensionValido = validarParentesco(data.hipertParentesco)
        const parentescoCancerValido = validarParentesco(data.cancerParentesco)
        const parentescoTuberculosisValido = validarParentesco(data.tuberculoParentesco)
        const parentescoAsmaValido = validarParentesco(data.asmaParentesco)
        const parentescoCardiovascularValido = validarParentesco(data.cardioParentesco)
        const parentescoEpilepsiaValido = validarParentesco(data.epilepsiaParentesco)
        const vacunaValido = validarTexto(data.vacuna)
        const alimentacionValido = validarTexto(data.alimentacion)
        const faunaValido = validarTexto(data.fauna_nociva)
        const viviendaValido = validarTexto(data.vivienda)
        const adiccionesValido = validarTexto(data.adicciones)
        const planificacionValido = validarTexto(data.planificacion_fam)

        if (showPDiabetes && !parentescoDiabetesValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de diabetes");
        } else if (showPHiper && !parentescoHipertensionValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de hipertensión");
        } else if (showPCancer && !parentescoCancerValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de cáncer");
        } else if (showPTuber && !parentescoTuberculosisValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de tuberculosis");
        } else if (showPAsma && !parentescoAsmaValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de asma");
        } else if (showPCardio && !parentescoCardiovascularValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de cardiovascular");
        } else if (showPEpilepsia && !parentescoEpilepsiaValido) {
            toast.error("Ingrese solo caracteres alfabeticos en el parentesco de epilepsia");
        } else if (!vacunaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de vacunas");
        } else if (!alimentacionValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de alimentación");
        } else if (!faunaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de fauna nociva");
        } else if (!viviendaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de vivienda");
        } else if (!adiccionesValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de adicciones");
        } else if (sexo === "Femenino") {
            if (!planificacionValido) {
                toast.error("Ingrese solo caracteres alfanuméricos en el campo de planificación familiar");
            } else {
                localStorage.setItem('antecedentes', JSON.stringify(data))
                navegador("/historial_odontologico_p3")
            }
        }
        else {
            localStorage.setItem('antecedentes', JSON.stringify(data))
            navegador("/historial_odontologico_p3")
        }
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
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="diabetes" id="diabetes" className="opciones" type=""
                                        {...register("diabetesH", { required: true })}
                                        onChange={handleChangeDiabetes}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.diabetesH && <span>Es necesario este campo</span>}
                                    {showPDiabetes && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_diabetes">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                                {...register("diabetesParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="hipertension" id="hipertension" className="opciones" type=""
                                        {...register("hipertH", { required: true })}
                                        onChange={handleChangeHipertension}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.hipertH && <span>Es necesario este campo</span>}

                                    {showPHiper && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_hipertension">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                                {...register("hipertParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="cancer" id="cancer" className="opciones" type=""
                                        {...register("cancer", { required: true })}
                                        onChange={handleChangeCancer}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.cancer && <span>Es necesario este campo</span>}

                                    {showPCancer && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_cancer">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                                {...register("cancerParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones" type=""
                                        {...register("tuberculoH", { required: true })}
                                        onChange={handleChangeTuberculosis}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.tuberculoH && <span>Es necesario este campo</span>}

                                    {showPTuber && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
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
                                    <label className="etiqueta" htmlFor="asma">Asma
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="asma" id="asma" className="opciones" type=""
                                        {...register("asmaH", { required: true })}
                                        onChange={handleChangeAsma}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.asmaH && <span>Es necesario este campo</span>}

                                    {showPAsma && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_asma">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <textarea name="par_asma" id="par_asma" className="text-amplio"
                                                {...register("asmaParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="cardiovascular" id="cardiovascular" className="opciones" type=""
                                        {...register("cardioH", { required: true })}
                                        onChange={handleChangeCardiovasculares}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.cardioH && <span>Es necesario este campo</span>}

                                    {showPCardio && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"
                                                {...register("cardioParentesco", { required: false })}></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="epilepsia">Epilepsia
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="epilepsia" id="epilepsia" className="opciones" type=""
                                        {...register("epilepsiaH", { required: true })}
                                        onChange={handleChangeEpilepsia}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.epilepsiaH && <span>Es necesario este campo</span>}

                                    {showPEpilepsia && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_epilepsia">Parentesco
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
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
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="diabetes" id="diabetes" className="opciones"
                                        {...register("diabetes", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.diabetes && <span>Es necesario este campo</span>}

                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="hipertension" id="hipertension" className="opciones"
                                        {...register("hipert", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.hipert && <span>Es necesario este campo</span>}

                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="cancer" id="cancer" className="opciones"
                                        {...register("cancer", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.cancer && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="tubercolosis" id="tubercolosis" className="opciones"
                                        {...register("tuberculo", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.tuberculo && <span>Es necesario este campo</span>}
                                </div>
                            </div>
                        </div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="transfusiones">Transfusiones
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="transfusiones" id="transfusiones" className="opciones"
                                        {...register("transfusion", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.transfusion && <span>Es necesario este campo</span>}

                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="quirurgicos">Quirúrgicos
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="quirurgicos" id="quirurgicos" className="opciones"
                                        {...register("quirurgicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.quirurgicos && <span>Es necesario este campo</span>}

                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="anestesicos">Anestesicos
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="anestesicos" id="anestesicos" className="opciones"
                                        {...register("anestesicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.anestesicos && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alergicos">Alérgicos
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="alergicos" id="alergicos" className="opciones"
                                        {...register("alergicos", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.alergicos && <span>Es necesario este campo</span>}
                                </div>
                            </div>
                        </div>


                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="traumaticoss">Traumáticos
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <select name="traumaticos" id="traumaticos" className="opciones"
                                        {...register("trauma", { required: true })}>
                                        <option value="" disabled selected>Elija la opción</option>
                                        <option value="True">Si</option>
                                        <option value="False">No</option>
                                    </select>
                                    {errors.trauma && <span>Es necesario este campo</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo_2">Antecedentes Personales No Patologicos</h3>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="vacuna">Vacunas
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <textarea id="vacuna" placeholder="Vacunas aplicadas" className="text-amplio"
                                        {...register("vacuna", { required: true })} />
                                    {errors.vacuna && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alimentacion">Alimentación
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <textarea id="alimentacion" placeholder="Alimentación" className="text-amplio"
                                        {...register("alimentacion", { required: true })} />
                                    {errors.alimentacion && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="fauna">Fauna nociva
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <textarea id="fauna" placeholder="Fauna nociva" className="text-amplio"
                                        {...register("fauna_nociva", { required: true })} />
                                    {errors.fauna_nociva && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="vivienda">Vivienda
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <textarea id="vivienda" placeholder="Vivivenda" className="text-amplio"
                                        {...register("vivienda", { required: true })} />
                                    {errors.vivienda && <span>Es necesario este campo</span>}
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="higiene">Adicciones
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <textarea id="adicc" type="text" placeholder="Adicciones" className="text-amplio"
                                        {...register("adicciones", { required: true })} />
                                    {errors.adicciones && <span>Es necesario este campo</span>}
                                </div>

                            </div>
                        </div>
                    </div>
                    {sexo === 'Femenino' && (
                        <div className='ml-10 container'>
                            <h3 className="subtitulo_2">Antecedentes ginecobstetricos</h3>
                            <div className='row'>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="fechaDoc">Fecha de ultima Doc.
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada"
                                        {...register("fecha_ult_doc", { required: true })} />
                                    {errors.fecha_ult_doc && <span>Es necesario este campo</span>}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="fechaDoc">Fecha ultima regla
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada"
                                        {...register("fecha_ultima_regla", { required: true })} />
                                    {errors.fecha_ultima_regla && <span>Es necesario este campo</span>}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="planiFami">Planificación familiar
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input id="planiFami" type="text" placeholder="Planificación" className="entrada"
                                        {...register("planificacion_fam", { required: true })} />
                                    {errors.planificacion_fam && <span>Es necesario este campo</span>}
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