{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { AntHerediPat } from './AntHerediPat';
import { AntPersoPato } from './AntPersoPato';
import { AntPPatologicos } from './AntPPatologicos';

export function HistorialClinicoDental() {
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [antHerePatData, setAntHerePat] = useState(null);
    const [antNoHerePatData, setAntNoHerePat] = useState(null);
    const [antPatPersoData, setAntPatPerso] = useState(null);


    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const nombresArchivos = Array.from(archivos).map((archivo) => archivo.name);
        setArchivosSeleccionados(nombresArchivos);
    }

    const handleAntHerediPatData = (data) => {
        setAntHerePat(data)
    }
    const handleNoAntHerediPatData = (data) => {
        setAntNoHerePat(data)
    }
    const handleAntPatPersoData = (data) => {
        setAntPatPerso(data)
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

    const registrarHistOdonto = async (data) => {
        try {
            const formData = new FormData();
            formData.append('archivo', data.archivo[0]);
            formData.append('fechaElaboracion', data.fechaElaboracion);
            formData.append('referencia', JSON.stringify({
                referencia: data.referencia,
                referencia_lugar: data.referenciaLugar,
                subsecuente: data.subsecuente,
                citado: data.citado,
                estudios: data.estudios
            }));
            formData.append('aparatosSistemas', JSON.stringify({
                respiratorio: data.respiratorio,
                digestivo: data.digestivo,
                neuro: data.neuro,
                cardioV: data.cardioV,
                muscoes: data.muscoes
            }));
            formData.append('padecimiento_actual', data.padecimiento);
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
                diabetesH: data.diabetesH,
                hipertH: data.hipertH,
                tuberculoH: data.tuberculoH,
                cancerH: data.cancerH,
                cardioH: data.cardioH,
                asmaH: data.asmaH,
                epilepsiaH: data.epilepsiaH,
                diabetes_parentesco: data.diabetes_parentesco,
                hipert_parentesco: data.hipert_parentesco,
                tuberculo_parentesco: data.tuberculo_parentesco,
                cancer_parentesco: data.cancer_parentesco,
                cardio_parentesco: data.cardio_parentesco,
                asma_parentesco: data.asma_parentesco,
                epilepsia_parentesco: data.epilepsia_parentesco,
            }));
            formData.append('antPersonPato', JSON.stringify({
                diabetes: data.diabetes,
                hipert: data.hipert,
                tuberculo: data.tuberculo,
                cancer: data.cancer,
                transfusion: data.transfusion,
                quirurgicos: data.quirurgicos,
                anestesicos: data.anestesicos,
                alergicos: data.alergicos,
                trauma: data.trauma
            }));
            formData.append('personNoPato', JSON.stringify({
                vacuna: data.vacuna,
                alimentacion: data.alimentacion,
                fauna_nociva: data.fauna_nociva,
                vivienda: data.vivienda,
                adicciones: data.adicciones
            }));
            formData.append('antGinecob', JSON.stringify({
                fecha_ultima_regla: data.fecha_ultima_regla,
                fecha_ult_doc: data.fecha_ult_doc,
                planificacion_fam: data.planificacion_fam
            }));
            formData.append('cuello_odont', data.cuello);
            formData.append('paciente', noExpediente);
            formData.append('empleado', noEmpleado);

            const url = "http://127.0.0.1:8000/api/registrar_histOdonto/"
            const respuesta = await axios.post(url, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)

        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const enviar = handleSubmit(async data => {
        await registrarHistOdonto({ ...data, ...antHerePatData, ...antNoHerePatData, ...antPatPersoData });
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
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\antecedente">
                                Antecedentes
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historial clínico dental</li>
                    </ol>
                </nav>
            </div>
            <BusquedaPaciente></BusquedaPaciente>


            {/*<header>
                <NavBarBusqueda />
    </header>*/}
            <div className="ml-10 container">
                <form className="row" onSubmit={enviar}>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Hereditarios Patologicos</h3>
                        <AntHerediPat getAntPaHerediData={handleAntHerediPatData} />
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Personales Patologicos</h3>
                        <AntPPatologicos getAntPaPersoData={handleAntPatPersoData} />
                    </div>

                    <div className='ml-10 container'>
                        <h3 className="subtitulo">Antecedentes Personales No Patologicos</h3>
                        <AntPersoPato getAntNoPersoPatData={handleNoAntHerediPatData} />
                    </div>

                    <h3 className="subtitulo">Historial clinico dental</h3>

                    <div className="col">
                        <label className="etiqueta" htmlFor="fechaAct">Fecha: </label>
                        <input id="fechaAlt" type="date" placeholder="aaaa/mm/dd" className="entrada"
                            {...register("fechaElaboracion", { required: true })} />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="ref">Referencia</label>
                        <select name="ref" id="ref" className="opciones"
                            {...register("referencia", { required: true })} >
                            <option value="" disabled selected>Elija la opción</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>


                    <div className="col">
                        <label className="etiqueta" htmlFor="lugarRef">Lugar de referencia</label>
                        <input id="lugarRef" type="text" placeholder="Lugar de referencia" className="entrada"
                            {...register("referenciaLugar", { required: true })} />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="subsecuente">Subsecuente</label>
                        <select name="subsecuente" id="subsecuente" className="opciones"
                            {...register("subsecuente", { required: true })} >
                            <option value="" disabled selected>Elija la opción</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="citado">Citado</label>
                        <select name="citado" id="citado" className="opciones"
                            {...register("citado", { required: true })} >
                            <option value="" disabled selected>Elija la opción</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

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

                    <div className="mt-3 mb-3 row">

                        <div className="col">
                            <label className="etiqueta" htmlFor="estudios">Estudios externos</label>
                            <select name="estudios" id="estudios" className="opciones"
                                {...register("estudios", { required: true })} >
                                <option value="" disabled selected>Elija la opción</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                            <span className="ml-10" style={{ display: 'block' }}>Cargue los estudios  en formato PDF</span>
                            <label htmlFor="fileInput" className="btn btn-cargar">
                                Elegir archivo(s)
                            </label>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple />

                            {archivosSeleccionados.length > 0 && (
                                <div>
                                    {archivosSeleccionados.map((nombreArchivo, index) => (
                                        <label key={index}>{nombreArchivo}</label>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>


                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50"
                            {...register("padecimiento", { required: true })} />
                    </div>

                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habitos">Habitos exteriores</label>
                        <textarea id="habitos" type="text" placeholder="Habitos" className="entrada" rows="10" cols="30"
                            {...register("habitos_ext", { required: true })} />
                    </div>


                    <h3 className="subtitulo">Cabeza y cuello</h3>

                    <div className="col">
                        <label className="etiqueta" htmlFor="labio">Labios</label>
                        <input id="labio" type="text" placeholder="Revisión de labios" className="entrada"
                            {...register("labios", { required: true })} />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="mucosa">Mucosa oral</label>
                        <input id="mucosa" type="text" placeholder="Revisión de mucosa oral" className="entrada"
                            {...register("mucosa", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="encias">Encias</label>
                        <input id="encia" type="text" placeholder="Revisión de encias" className="entrada"
                            {...register("encias", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="lengua">Lengua</label>
                        <input id="lengua" type="text" placeholder="Revisión de lengua" className="entrada"
                            {...register("lengua", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="paladorB">Paladar blando</label>
                        <input id="paladorB" type="text" placeholder="Revisión de palador blando" className="entrada"
                            {...register("paladar_blando", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="paladorD">Paladar duro</label>
                        <input id="paladorD" type="text" placeholder="Revisión de palador duro" className="entrada"
                            {...register("paladar_duro", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cuello">Cuello</label>
                        <input id="cuello" type="text" placeholder="Revisión de cuello" className="entrada"
                            {...register("cuello", { required: true })} />
                    </div>


                    <h3 className="subtitulo">Interrogatorio por aparatos y sistema</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="respi">Respiratorio</label>
                        <input id="respi" type="text" placeholder="Sistema respiratorio" className="entrada"
                            {...register("respiratorio", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="digestivo">Digestivo</label>
                        <input id="digestivo" type="text" placeholder="Sistema digestivo" className="entrada"
                            {...register("digestivo", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="neuro">Neurológico</label>
                        <input id="neuro" type="text" placeholder="Sistema neurológico" className="entrada"
                            {...register("neuro", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cardio">Cardiovasculares</label>
                        <input id="cardio" type="text" placeholder="Cardiovasculares" className="entrada"
                            {...register("cardioV", { required: true })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="musco">Muscoesqueleto</label>
                        <input id="musco" type="text" placeholder="Muscoesqueleto" className="entrada"
                            {...register("muscoes", { required: true })} />
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