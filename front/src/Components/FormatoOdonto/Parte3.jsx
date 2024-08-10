import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
import generarPDF from './HistorialClinicoDentalPDF';
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function Parte3() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [antecedentes, setAntecedentes] = useState(null);
    const [historialO, setHistorialO] = useState(null);
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [empleado, setEmpleado] = useState([]);
    const [userGroup, setUserGroup] = useState(null);
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [detalleEnfermeria, setDetalleEnfermeria] = useState([]);
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
    const [fechaActual, setFechaActual] = useState('')
    const [noExpediente, setNoExpediente] = useState(null)

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const archivosArray = Array.from(archivos);
        setArchivosSeleccionados(archivosArray); // Actualizamos archivosSeleccionados con el array de archivos
    }

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            setNoEmpleado(no_Empleado)
            setEmpleado(response.data.user_info)
            const group_usuario = response.data.user_info.name
            setUserGroup(group_usuario)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    const registrarHistOdonto = async (data) => {
        try {
            const formData = new FormData();
            if (data.archivo !== null && data.archivo.length > 0) {
                for (let i = 0; i < data.archivo.length; i++) {
                    formData.append('archivo', data.archivo[i]);
                }
            }
            formData.append('fecha_elaboracion', historialO.fechaElaboracion);
            formData.append('referencia', JSON.stringify({
                referencia: historialO.referencia,
                referencia_lugar: historialO.referenciaLugar,
                subsecuente: historialO.subsecuente,
                citado: historialO.citado,
                estudios: historialO.estudios
            }));
            formData.append('aparatosSistemas', JSON.stringify({
                respiratorio: data.respiratorio,
                digestivo: data.digestivo,
                neuro: data.neuro,
                cardioV: data.cardioV,
                muscoes: data.muscoes
            }));
            formData.append('padecimiento_actual', historialO.padecimiento);
            formData.append('habitos_exteriores', data.habitos_ext);
            formData.append('cabeza', JSON.stringify({
                labios: data.labios,
                mucosa: data.mucosa,
                encias: data.encias,
                lengua: data.lengua,
                paladar_blando: data.paladar_blando,
                paladar_duro: data.paladar_duro
            }));
            formData.append('antHerediPato', JSON.stringify({
                diabetesH: antecedentes.diabetesH,
                hipertH: antecedentes.hipertH,
                tuberculoH: antecedentes.tuberculoH,
                cancerH: antecedentes.cancerH,
                cardioH: antecedentes.cardioH,
                asmaH: antecedentes.asmaH,
                epilepsiaH: antecedentes.epilepsiaH,
                diabetes_parentesco: antecedentes.diabetesParentesco,
                hipert_parentesco: antecedentes.hipertParentesco,
                tuberculo_parentesco: antecedentes.tuberculoParentesco,
                cancer_parentesco: antecedentes.cancerParentesco,
                cardio_parentesco: antecedentes.cardioParentesco,
                asma_parentesco: antecedentes.asmaParentesco,
                epilepsia_parentesco: antecedentes.epilepsiaParentesco,
            }));
            formData.append('antPersonPato', JSON.stringify({
                diabetes: antecedentes.diabetes,
                hipert: antecedentes.hipert,
                tuberculo: antecedentes.tuberculo,
                cancer: antecedentes.cancer,
                transfusion: antecedentes.transfusion,
                quirurgicos: antecedentes.quirurgicos,
                anestesicos: antecedentes.anestesicos,
                alergicos: antecedentes.alergicos,
                trauma: antecedentes.trauma
            }));
            formData.append('personNoPato', JSON.stringify({
                vacuna: antecedentes.vacuna,
                alimentacion: antecedentes.alimentacion,
                fauna_nociva: antecedentes.fauna_nociva,
                vivienda: antecedentes.vivienda,
                adicciones: antecedentes.adicciones
            }));
            formData.append('antGinecob', JSON.stringify({
                fecha_ultima_regla: antecedentes.fecha_ultima_regla,
                fecha_ult_doc: antecedentes.fecha_ult_doc,
                planificacion_fam: antecedentes.planificacion_fam
            }));
            formData.append('cuello_odont', data.cuello);
            formData.append('paciente', historialO.noExpediente);
            formData.append('empleado', noEmpleado);
            formData.append('ficha_enfermeria', detalleEnfermeria.id);

            const url = "http://127.0.0.1:8000/api/registrar_histOdonto/"
            const respuesta = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
            console.log(respuesta.data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const validarTexto = (texto) => {
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const getNoExp = () => {
        const storedData = localStorage.getItem('noExp');
        setNoExpediente(JSON.parse(storedData));
    };

    const getDetallesPaciente = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/detalle_paciente/${noExpediente}`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetallePaciente(respuesta.data)

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const getDetallesEnfermeria = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_ficha_enfermeria/${noExpediente}/${fechaActual}/`
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetalleEnfermeria(respuesta.data)

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const verificarFichaEnfermeria = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/verificar_enfermeria_odonto/${detalleEnfermeria.id}`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return respuesta.data.en_uso;
        } catch (error) {
            console.error("Error al verificar la ficha de enfermería:", error);
            return false; // Considerar que no está en uso en caso de error
        }
    };


    useEffect(() => {
        if (token) {
            getNoExp();
        }
    }, [token]);

    useEffect(() => {
        getDetallesPaciente();
        getDetallesEnfermeria();
    }, [token, noExpediente, fechaActual]);

    useEffect(() => {
        const storedData = localStorage.getItem('antecedentes');
        const storeData2 = localStorage.getItem('historialO')
        if (storedData && storeData2) {
            setAntecedentes(JSON.parse(storedData));
            setHistorialO(JSON.parse(storeData2))
        }
    }, []);

    useEffect(() => {
        getNoEmpleado();
    }, [token]);

    const enviar = handleSubmit(async data => {
        const habitosValido = validarTexto(data.habitos_ext)
        const labiosValido = validarTexto(data.labios)
        const mucosaValido = validarTexto(data.mucosa)
        const enciaValido = validarTexto(data.encias)
        const lenguaValida = validarTexto(data.lengua)
        const paladarBValido = validarTexto(data.paladar_blando)
        const paladarDValuido = validarTexto(data.paladar_duro)
        const cuelloValido = validarTexto(data.cuello)
        const respiratorioValido = validarTexto(data.respiratorio)
        const digestivoValido = validarTexto(data.digestivo)
        const neurologicoValido = validarTexto(data.neuro)
        const cardioValido = validarTexto(data.cardioV)
        const musculoValido = validarTexto(data.muscoes)
        if (!habitosValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de habitos exteriores");
        } else if (!labiosValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de labios");
        } else if (!mucosaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de mucosa oral");
        } else if (!enciaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de encias");
        } else if (!lenguaValida) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de lengua");
        } else if (!paladarBValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de paladar blando");
        } else if (!paladarDValuido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de paladar duro");
        } else if (!cuelloValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de cuello");
        } else if (!respiratorioValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de respiratorio");
        } else if (!digestivoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de digestivo");
        } else if (!neurologicoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de neurológico");
        } else if (!cardioValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de cardiovasculares");
        } else if (!musculoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de muscuesqueleto");
        }
        else {
            const enUso = await verificarFichaEnfermeria();

            if (enUso) {
                toast.error("La ficha de enfermería ya está en uso.");
            } else {
                mensajeConfirmacionGuardar('l historial', userGroup, navegador, () => {
                    generarPDF(detallePaciente, noExpediente, historialO, antecedentes, data, empleado, detalleEnfermeria, fechaActual)
                    registrarHistOdonto(data)
                    localStorage.setItem('noExp', JSON.stringify(historialO.noExpediente));
                })
            }
        }
    })

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="/home_odontologo">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historial clinico dental</li>
                    </ol>
                </nav>
            </div>

            <div className="ml-5 container">
                <div className="ml-10 mt-2">
                    {noExpediente && fechaActual && (
                        <CardFichaEnfermeria noExp={noExpediente} fecha={fechaActual}></CardFichaEnfermeria>
                    )}
                </div>

                <form className="row" onSubmit={enviar}>
                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitos">Habitos exteriores
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="habitos" type="text" placeholder="Habitos" className="entrada" rows="10" cols="30"
                                {...register("habitos_ext", { required: true })} />
                            {errors.habitos_ext && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Cabeza y cuello</h3>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="labio">Labios
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="labio" type="text" placeholder="Revisión de labios" className="text-amplio"
                                {...register("labios", { required: true })} />
                            {errors.labios && <span>Es necesario este campo</span>}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="mucosa">Mucosa oral
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="mucosa" type="text" placeholder="Revisión de mucosa oral" className="text-amplio"
                                {...register("mucosa", { required: true })} />
                            {errors.mucosa && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="encias">Encias
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="encia" type="text" placeholder="Revisión de encias" className="text-amplio"
                                {...register("encias", { required: true })} />
                            {errors.encias && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="lengua">Lengua
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="lengua" type="text" placeholder="Revisión de lengua" className="text-amplio"
                                {...register("lengua", { required: true })} />
                            {errors.lengua && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorB">Paladar blando
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="paladorB" type="text" placeholder="Revisión de palador blando" className="text-amplio"
                                {...register("paladar_blando", { required: true })} />
                            {errors.paladar_blando && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorD">Paladar duro
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="paladorD" type="text" placeholder="Revisión de palador duro" className="text-amplio"
                                {...register("paladar_duro", { required: true })} />
                            {errors.paladar_duro && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cuello">Cuello
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="cuello" type="text" placeholder="Revisión de cuello" className="text-amplio"
                                {...register("cuello", { required: true })} />
                            {errors.cuello && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Interrogatorio por aparatos y sistema</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="respi">Respiratorio
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="respi" type="text" placeholder="Sistema respiratorio" className="text-amplio"
                                {...register("respiratorio", { required: true })} />
                            {errors.respiratorio && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="digestivo">Digestivo
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="digestivo" type="text" placeholder="Sistema digestivo" className="text-amplio"
                                {...register("digestivo", { required: true })} />
                            {errors.digestivo && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="neuro">Neurológico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="neuro" type="text" placeholder="Sistema neurológico" className="text-amplio"
                                {...register("neuro", { required: true })} />
                            {errors.neuro && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cardio">Cardiovasculares
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="cardio" type="text" placeholder="Cardiovasculares" className="text-amplio"
                                {...register("cardioV", { required: true })} />
                            {errors.cardioV && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="musco">Muscoesqueleto
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="musco" type="text" placeholder="Muscoesqueleto" className="text-amplio"
                                {...register("muscoes", { required: true })} />
                            {errors.muscoes && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className="mt-3 mb-3">
                        <div className='row'>
                            <div className="col">
                                <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                                <span className="ml-5" style={{ display: 'block' }}>Cargue los estudios en formato PDF</span>
                                <label htmlFor="fileInput" className="btn btn-cargar">
                                    Elegir archivo(s)
                                </label>
                                <input type="file" id="fileInput" style={{ display: 'block' }} onChange={handleFileChange} multiple
                                    {...register("archivo")} />

                                {archivosSeleccionados && archivosSeleccionados.map((archivo, index) => (
                                    <label key={index}>{archivo.name}</label>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}