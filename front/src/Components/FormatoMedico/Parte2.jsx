{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../Contexto/AuthContext";
import { toast } from 'react-hot-toast'
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria";
import { mensajeConfirmacionSiguiente } from '../../Modales/MensajeConfirmacionSiguiente';

export function Parte2() {
    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm()
    const { token } = useAuth()
    const navegador = useNavigate()
    const [showPDiabetes, setShowPDiabetes] = useState(false)
    const [showPHiper, setShowPHiper] = useState(false)
    const [showPCancer, setShowPCancer] = useState(false)
    const [showPCardio, setShowPCardio] = useState(false)
    const [showOtrosAnt, setShowOtrosAnt] = useState(false)
    const [showOtrosPersonalP, setShowOtrosPersonalP] = useState(false)
    const [showOtrosMPF, setShowOtrosMPF] = useState(false)
    const menarcaValue = watch('menarca')
    const showUltimaMens = !isNaN(menarcaValue) && menarcaValue.trim() !== ''
    const vidaSexualValue = watch('vida_sexual')
    const showVidaSexual = !isNaN(vidaSexualValue) && vidaSexualValue.trim() !== '' && vidaSexualValue !== '0'
    const [noExpediente, setNoExpediente] = useState(null)
    const [fechaActual, setFechaActual] = useState('')
    const [sexo, setSexo] = useState(null)
    const [userGroup, setUserGroup] = useState(null);

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const group_usuario = response.data.user_info.name
            setUserGroup(group_usuario)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    useEffect(() => {
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

    const handleChangeDiabetes = (e) => {
        setShowPDiabetes(e.target.value === "True");
    };

    const handleChangeHipertension = (e) => {
        setShowPHiper(e.target.value === "True");
    };

    const handleChangeCancer = (e) => {
        setShowPCancer(e.target.value === "True");
    };

    const handleChangeCardiopatia = (e) => {
        setShowPCardio(e.target.value === "True");
    };

    const getNoExp = () => {
        const storedData = localStorage.getItem('noExp')
        if (storedData) {
            setNoExpediente(JSON.parse(storedData))
        } else {
            setNoExpediente(null)
        }
        console.log(noExpediente)
    }

    useEffect(() => {
        if (token) {
            getNoExp();
        }
    }, [token]);

    const getPaciente = async () => {
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
    };

    useEffect(() => {
        if (noExpediente !== null) {
            getPaciente();
        }
    }, [noExpediente]);

    const validarParentesco = (parentesco) => {
        const parentescoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ\s.-:,;()]{1,500}$/

        return parentescoRegex.test(parentesco)
    }

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const validarNumeros = (numero) => {
        const numeroRegex = /^[0-9]{1,5}$/

        return numeroRegex.test(numero)
    }

    const handleOtrosAnt = (e) => {
        setShowOtrosAnt(e.target.checked);
    };

    const handleOtrosPersonalesP = (e) => {
        setShowOtrosPersonalP(e.target.checked);
    };

    const handleOtrosMPF = (e) => {
        setShowOtrosMPF(e.target.checked);
    };

    const enviar = handleSubmit(async data => {
        const parentescoDiabetesValido = validarParentesco(data.par_diabetes)
        const parentescoHipertensionValido = validarParentesco(data.par_hipertension)
        const parentescoCancerValido = validarParentesco(data.par_cancer)
        const parentescoCardiopatiaValido = validarParentesco(data.par_cardiopatia)
        const otroParentescoValido = validarParentesco(data.otros_ant_par)

        const alimentacionValido = validarTexto(data.alimentacion)
        const habitacionValido = validarTexto(data.habitacion)
        const higieneValido = validarTexto(data.higiene)
        const medicosValido = validarTexto(data.medicosQT)
        const tabaquismoValido = validarTexto(data.tabaquismoAA)
        const tendenciaValido = validarTexto(data.tendenciaDM)
        const otroPersonalPatValido = validarTexto(data.otros_antPat)

        const menarcaValido = validarTexto(data.menarca)
        const inicioVSValido = validarTexto(data.vida_sexual)
        const embarazosValido = validarNumeros(data.num_embarazos)
        const partosValido = validarNumeros(data.partos)
        const abortosValido = validarNumeros(data.abortos)
        const cesareasValido = validarNumeros(data.cesarea)
        const hijosValido = validarNumeros(data.num_hijos)
        const macrosomicosValido = validarNumeros(data.macrosomicos)
        const bajoPesoValido = validarNumeros(data.bajo_peso)
        const parejasValido = validarNumeros(data.num_parejas)
        const heteroValido = validarNumeros(data.heterosexuales)
        const homoValido = validarNumeros(data.homosexuales)
        const biValido = validarNumeros(data.bisexuales)
        const diuValido = validarNumeros(data.diu)
        const hormonalValido = validarNumeros(data.hormonales)
        const quirurgicoValido = validarNumeros(data.quirurgico)
        const otrosMTPValido = validarTexto(data.otrosMP)
        console.log(sexo)
        if (showPDiabetes && !parentescoDiabetesValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el parentesco de diabetes");
        } else if (showPHiper && !parentescoHipertensionValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el parentesco de hipertensión");
        } else if (showPCancer && !parentescoCancerValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el parentesco de cáncer");
        } else if (showPCardio && !parentescoCardiopatiaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el parentesco de cardiopatía");
        } else if (showOtrosAnt && !otroParentescoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de otros");
        } else if (!alimentacionValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de alimentación");
        } else if (!habitacionValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de habitación");
        } else if (!higieneValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de higiene");
        } else if (!medicosValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de medicos, quirúrgicos y transfuciones");
        } else if (!tabaquismoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tabaquismo, alcoholismo y alérgicos");
        } else if (!tendenciaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tendencia a drogas y medicamentos");
        } else if (showOtrosPersonalP && !otroPersonalPatValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de otros personales patológicos");
        } else if (sexo === "Femenino") {
            if (!menarcaValido) {
                toast.error("Ingrese solo caracteres alfanuméricos en el campo de inicio de vida sexual");
            } else if (!inicioVSValido) {
                toast.error("Ingrese solo caracteres alfanuméricos en el campo de inicio de vida sexual");
            } else if (showVidaSexual) {
                if (!embarazosValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de embarazos");
                } else if (!partosValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de partos");
                } else if (!abortosValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de abortos");
                } else if (!cesareasValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de cesarea");
                } else if (!hijosValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de hijos");
                } else if (!macrosomicosValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de macrosomicos vivos");
                } else if (!bajoPesoValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de bajo peso al nacer");
                } else if (!parejasValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de parejas");
                } else if (!heteroValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de heterosexual");
                } else if (!homoValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de homosexuales");
                } else if (!biValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de bisexuales");
                } else if (!diuValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de DIU");
                } else if (!hormonalValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de hormonal");
                } else if (!quirurgicoValido) {
                    toast.error("Ingrese solo caracteres numéricos en el campo de quirúrgicos");
                } else if (showOtrosMPF && !otrosMTPValido) {
                    toast.error("Ingrese solo caracteres alfanuméricos en el campo de otros métodos de planificación familiar");
                }
                else {
                    mensajeConfirmacionSiguiente('diagnostico', userGroup, navegador, () => {
                        localStorage.setItem('datos2', JSON.stringify(data));
                    })
                }
            }
            else {
                mensajeConfirmacionSiguiente('diagnostico', userGroup, navegador, () => {
                    localStorage.setItem('datos2', JSON.stringify(data));
                })
            }
        }
        else {
            mensajeConfirmacionSiguiente('diagnostico', userGroup, navegador, () => {
                localStorage.setItem('datos2', JSON.stringify(data));
            })
        }
    });

    return (
        <div>

            <div className="ml-10 container mt-2">
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

                {noExpediente !== null && fechaActual && (
                    <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                )}
            </div>

            <div className='ml-10 container'>
                <h3 className='subtitulo'>Antecedentes</h3>
            </div>

            <h3 className='subtitulo_2'>Hereditarios y familiares</h3>
            <form onSubmit={enviar}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="diabetes">Diabetes
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="diabetes" id="diabetes" className="opciones" type=""
                                {...register("diabetes", { required: true })}
                                onChange={handleChangeDiabetes}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {errors.diabetes && <span>Es necesario este campo</span>}
                            {showPDiabetes && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                    <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                        {...register("par_diabetes", { required: false })}></textarea>
                                    {errors.par_diabetes && <span>Es necesario este campo</span>}
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="hipertension">Hipertensión
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="hipertension" id="hipertension" className="opciones" type=""
                                {...register("hipertension", { required: true })}
                                onChange={handleChangeHipertension}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {errors.hipertension && <span>Es necesario este campo</span>}

                            {showPHiper && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                    <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                        {...register("par_hipertension", { required: false })}></textarea>
                                    {errors.par_hipertension && <span>Es necesario este campo</span>}
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
                                    <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                                    <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                        {...register("par_cancer", { required: false })}></textarea>
                                    {errors.par_cancer && <span>Es necesario este campo</span>}
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="cardiopatia">Cardiopatia Isquémica
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <select name="cardiopatia" id="cardiopatia" className="opciones" type=""
                                {...register("cardiopatia", { required: true })}
                                onChange={handleChangeCardiopatia}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {errors.cardiopatia && <span>Es necesario este campo</span>}

                            {showPCardio && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cardiopatia">Parentesco</label>
                                    <textarea name="par_cardiopatia" id="par_cardiopatia" className="text-amplio"
                                        {...register("par_cardiopatia", { required: false })}></textarea>
                                    {errors.par_cardiopatia && <span>Es necesario este campo</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="mt-4 ml-10 form-check form-check-inline">
                        <input className="form-check-input caja_opciones" id='otros_ant' name='otros_ant' type="checkbox"
                            onChange={handleOtrosAnt} />
                        <label className='form-check-label etiqueta' htmlFor="otros_ant">Otros antecedentes</label>

                    </div>
                    {showOtrosAnt && (
                        <div className="col">
                            <label className='form-check-label etiqueta' htmlFor="otros_ant_par">Antecedente y parentesco</label>
                            <textarea name="otros_ant_par" id="otros_ant_par" className="text-amplio"
                                {...register("otros_ant_par", { required: false })}></textarea>
                            {errors.otros_ant_par && <span>Es necesario este campo</span>}
                        </div>
                    )}

                </div>

                <h3 className='subtitulo_2'>Personales no patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="alimentacion">Alimentación
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="alimentacion" id="alimentacion" className="text-amplio"
                                {...register("alimentacion", { required: true })}></textarea>
                            {errors.alimentacion && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitacion">Habitación
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="habitacion" id="habitacion" className="text-amplio"
                                {...register("habitacion", { required: true })}></textarea>
                            {errors.habitacion && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="higiene">Higiene personal
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="higiene" id="higiene" className="text-amplio"
                                {...register("higiene", { getPersonalesData: true })}></textarea>
                            {errors.higiene && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <h3 className='subtitulo_2'>Personales patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="medicosQT">Médicos,quirúrgicos,transfusiones
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="medicosQT" id="medicosQT" className="text-amplio"
                                {...register("medicosQT", { required: true })}></textarea>
                            {errors.medicosQT && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tabaquismoAA">Tabaquismo,alcoholismo,alérgicos
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="tabaquismoAA" id="tabaquismoAA" className="text-amplio"
                                {...register("tabaquismoAA", { required: true })}></textarea>
                            {errors.tabaquismoAA && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tendenciaDM">Tendencia a drogas o medicamentos
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea name="tendenciaDM" id="tendenciaDM" className="text-amplio"
                                {...register("tendenciaDM", { required: true })}></textarea>
                            {errors.tendenciaDM && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="mt-4 ml-10 form-check form-check-inline">
                            <input className="form-check-input caja_opciones" id='otros_ant_pp' name='otros_ant_pp' type="checkbox"
                                onChange={handleOtrosPersonalesP} />
                            <label className='form-check-label etiqueta' htmlFor="otros_ant_pp">Otros antecedentes</label>

                        </div>
                        {showOtrosPersonalP && (
                            <div className="col">
                                <label className="etiqueta" htmlFor="otros_antPat">Otros</label>
                                <textarea name="otros_antPat" id="otros_antPat" className="text-amplio"
                                    {...register("otros_antPat", { required: false })}></textarea>
                                {errors.otros_antPat && <span>Es necesario este campo</span>}
                            </div>
                        )}

                    </div>
                </div>


                {sexo === 'Femenino' && (
                    <div>
                        <h3 className='subtitulo_2'>Datos ginecobstetricos</h3>

                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="menarca">Menarca (Edad):
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input className="entrada" id='menarca' name='menarca' type="text"
                                        {...register("menarca", { required: true })} />
                                    {errors.menarca && <span>Es necesario este campo</span>}

                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="vida_sexual">Inicio de vida sexual activa (Edad):
                                        <span className='etiqueta_obligatoria'>*</span>
                                    </label>
                                    <input className="entrada" id='vida_sexual' name='vida_sexual' type="text"
                                        {...register("vida_sexual", { required: true })} />
                                    {errors.vida_sexual && <span>Es necesario este campo</span>}
                                </div>
                                {showUltimaMens && (
                                    <div className='col'>
                                        <label className='etiqueta' htmlFor="menstruacion">Ultima menstruación
                                            <span className='etiqueta_obligatoria'>*</span>
                                        </label>
                                        <input className="entrada" id='menstruacion' name='menstruacion' type="date"
                                            {...register("menstruacion", { required: true })} />
                                        {errors.menstruacion && <span>Es necesario este campo</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {showVidaSexual && (
                            <div>
                                <h3 className='subtitulo_2'>Embarazos</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_embarazos">N° embarazos:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='num_embarazos' name='num_embarazos' type="text"
                                                {...register("num_embarazos", { required: true })} />
                                            {errors.num_embarazos && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="partos">Partos:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='partos' name='partos' type="text"
                                                {...register("partos", { required: true })} />
                                            {errors.partos && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="abortos">Abortos:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='abortos' name='abortos' type="text"
                                                {...register("abortos", { required: true })} />
                                            {errors.abortos && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="cesarea">Cesareas:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='cesarea' name='cesarea' type="text"
                                                {...register("cesarea", { required: true })} />
                                            {errors.cesarea && <span>Es necesario este campo</span>}
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Partos</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="ultimo_parto">Fecha de ultimo parto:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='ultimo_parto' name='ultimo_parto' type="text"
                                                {...register("ultimo_parto", { required: true })} />
                                            {errors.ultimo_parto && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_hijos">N° de hijos:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='num_hijos' name='num_hijos' type="text"
                                                {...register("num_hijos", { required: true })} />
                                            {errors.num_hijos && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="macrosomicos">Macrosomicos vivos:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='macrosomicos' name='macrosomicos' type="text"
                                                {...register("macrosomicos", { required: true })} />
                                            {errors.macrosomicos && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="bajo_peso">Bajo peso al nacer:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='bajo_peso' name='bajo_peso' type="text"
                                                {...register("bajo_peso", { required: true })} />
                                            {errors.bajo_peso && <span>Es necesario este campo</span>}
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Parejas</h3>
                                <div className='mt-3 container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_parejas">N° de parejas:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='num_parejas' name='num_parejas' type="text"
                                                {...register("num_parejas", { required: true })} />
                                            {errors.num_parejas && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="heterosexuales">Heterosexuales:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='heterosexuales' name='heterosexuales' type="text"
                                                {...register("heterosexuales", { required: true })} />
                                            {errors.heterosexuales && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="homosexuales">Homosexuales:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='homosexuales' name='homosexuales' type="text"
                                                {...register("homosexuales", { required: true })} />
                                            {errors.homosexuales && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="bisexuales">Bisexuales:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='bisexuales' name='bisexuales' type="text"
                                                {...register("bisexuales", { required: true })} />
                                            {errors.bisexuales && <span>Es necesario este campo</span>}
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Método de planificación familiar</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="diu">DIU:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='diu' name='diu' type="text"
                                                {...register("diu", { required: true })} />
                                            {errors.diu && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="hormonales">Hormonales:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='hormonales' name='hormonales' type="text"
                                                {...register("hormonales", { required: true })} />
                                            {errors.hormonales && <span>Es necesario este campo</span>}
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="quirurgico">Quirurgico:
                                                <span className='etiqueta_obligatoria'>*</span>
                                            </label>
                                            <input className="entrada" id='quirurgico' name='quirurgico' type="text"
                                                {...register("quirurgico", { required: true })} />
                                            {errors.quirurgico && <span>Es necesario este campo</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mt-4 ml-10 form-check form-check-inline">
                                            <input className="form-check-input caja_opciones" id='otros_mpf' name='otros_mpf' type="checkbox"
                                                onChange={handleOtrosMPF} />
                                            <label className='form-check-label etiqueta' htmlFor="otros_mpf">Otros métodos</label>
                                        </div>
                                        {showOtrosMPF && (
                                            <div className='col'>
                                                <label className='etiqueta' htmlFor="otrosMP">Otros</label>
                                                <textarea name="otrosMP" id="otrosMP" className="text-amplio"
                                                    {...register("otrosMP", { required: true })}></textarea>
                                                {errors.otrosMP && <span>Es necesario este campo</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="text-center">
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </div>
            </form>

        </div >
    )
}