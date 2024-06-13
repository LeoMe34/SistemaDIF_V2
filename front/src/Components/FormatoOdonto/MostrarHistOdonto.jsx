import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useParams } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import { Document, Page } from '@react-pdf/renderer';


export function MostrarHistOdonto() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { noExpediente } = useNoExpediente();
    const { fecha, id } = useParams();
    const [detalles, setDetalles] = useState([])
    const [showParentesco, setShowP] = useState(false)
    const [empleado, setEmpleado] = useState([])
    const [sexo, setSexo] = useState(null)

    const convertirReferencia = (tieneRef) => {
        const opciones = {
            True: 'Sí',
            False: 'No'
        };
        return opciones[tieneRef];
    };

    const convertirReferencia2 = (tieneRef) => {
        const opciones = {
            true: 'Sí',
            false: 'No'
        };
        return opciones[tieneRef];
    };

    const handleChangeParentesco = (e) => {
        setShowP(e.target.value === "True");
    };


    const getEmpleadoFicha = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_empleado/${detalles.empleado}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data);
        } catch (error) {
            console.error('Error al obtener al empleado', error);
        }
    };

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

        const getHistOdont = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get_hist_odonto/${noExpediente}/${fecha}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                console.log(response)
                setDetalles(response.data)
                // obtenerDocumento(); // Llama a la función aquí después de obtener los detalles
            } catch (error) {
                console.error('Error al obtener la ficha', error);
            }
        };

        getHistOdont();
        getPaciente()
    }, [fecha, noExpediente, token]);



    useEffect(() => {
        if (detalles?.id) {
            getEmpleadoFicha()
        }
    }, [detalles]);

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historial clinico dental</li>
                    </ol>
                </nav>
            </div>
            <h3 className='subtitulo'>Historial clinico dental</h3>

            <form>
                <div className='ml-10 mt-2 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fechaElaboracion">Fecha: </label>
                            <input className="entrada" id='fechaElaboracion' name='fechaElaboracion' type="date"
                                value={detalles.fecha_elaboracion} readOnly />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="ref">Referencia</label>
                            <input id="referencia" type="text" className="entrada" name='referencia'
                                value={convertirReferencia2(detalles.referencia?.referencia)} readOnly />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="referenciaLugar">Lugar de referencia</label>
                            <input id="referenciaLugar" type="text" className="entrada" name='referenciaLugar'
                                value={detalles.referencia?.referencia_lugar} readOnly />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="subsecuente">Subsecuente</label>
                            <input id="subsecuenter" type="text" className="entrada" name='subsecuente'
                                value={convertirReferencia2(detalles.referencia?.subsecuente)} readOnly />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="citado">Citado</label>
                            <input id="citado" type="text" className="entrada" name='citado'
                                value={convertirReferencia2(detalles.referencia?.citado)} readOnly />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="estudios">Estudios externos</label>
                            <input id="estudios" type="text" className="entrada" name='estudios'
                                value={convertirReferencia2(detalles.referencia?.estudios)} readOnly />
                        </div>
                    </div>

                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50"
                            value={detalles.padecimiento_actual} readOnly />
                    </div>
                    <div className='ml-10 mt-2 container'>
                        <h3 className="subtitulo_2">Antecedentes Hereditarios Patologicos</h3>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                                    <input id="diabetes" type="text" className="entrada" name='diabetes'
                                        value={convertirReferencia(detalles.antHerediPato?.diabetesH)} readOnly
                                    />
                                    {convertirReferencia(detalles.antHerediPato?.diabetesH) == 'Si' && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                            <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                                value={detalles.antHerediPato?.diabetes_parentesco} readOnly></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <input id="hipertension" type="text" className="entrada" name='hipertension'
                                        value={convertirReferencia(detalles.antHerediPato?.hipertH)} readOnly
                                    />

                                    {convertirReferencia(detalles.antHerediPato?.hipertH) == 'Si' && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                            <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                                value={detalles.antHerediPato?.hipert_parentesco} readOnly></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <input id="cancer" type="text" className="entrada" name='cancer'
                                        value={convertirReferencia(detalles.antHerediPato?.cancerH)} readOnly
                                    />

                                    {convertirReferencia(detalles.antHerediPato?.cancerH) == 'Si' && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                                            <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                                value={detalles.antHerediPato?.cancer_parentesco} readOnly></textarea>
                                        </div>
                                    )}
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <input id="tubercolosis" type="text" className="entrada" name='tubercolosis'
                                        value={convertirReferencia(detalles.antHerediPato?.tuberculoH)} readOnly
                                    />

                                    {convertirReferencia(detalles.antHerediPato?.tuberculoH) == 'Si' && (
                                        <div className="col">
                                            <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco</label>
                                            <textarea name="par_tubercolosis" id="par_tubercolosis" className="text-amplio"
                                                value={detalles.antHerediPato?.tuberculo_parentesco} readOnly></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <label className="etiqueta" htmlFor="asma">Asma</label>
                                        <input id="asma" type="text" className="entrada" name='asma'
                                            value={convertirReferencia(detalles.antHerediPato?.asmaH)} readOnly
                                        />
                                        {convertirReferencia(detalles.antHerediPato?.asmaH) == 'Si' && (
                                            <div className="col">
                                                <label className="etiqueta" htmlFor="par_asma">Parentesco</label>
                                                <textarea name="par_asma" id="par_asma" className="text-amplio"
                                                    value={detalles.antHerediPato?.asma_parentesco} readOnly></textarea>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares</label>
                                        <input id="cardiovascular" type="text" className="entrada" name='cardiovascular'
                                            value={convertirReferencia(detalles.antHerediPato?.cardioH)} readOnly 
                                        />
                                        {convertirReferencia(detalles.antHerediPato?.cardioH) == 'Si' && (
                                            <div className="col">
                                                <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco</label>
                                                <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"
                                                    value={detalles.antHerediPato?.cardio_parentesco} readOnly></textarea>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col">
                                        <label className="etiqueta" htmlFor="epilepsia">Epilepsia</label>
                                        <input id="epilepsia" type="text" className="entrada" name='epilepsia'
                                            value={convertirReferencia(detalles.antHerediPato?.epilepsiaH)} readOnly
                                        />
                                        {convertirReferencia(detalles.antHerediPato?.epilepsiaH) == 'Si' && (
                                            <div className="col">
                                                <label className="etiqueta" htmlFor="par_epilepsia">Parentesco</label>
                                                <textarea name="par_epilepsia" id="par_epilepsia" className="text-amplio"
                                                    value={detalles.antHerediPato?.epilepsia_parentesco} readOnly></textarea>
                                            </div>
                                        )}
                                    </div>
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
                                    <input id="diabetes" type="text" className="entrada" name='diabetes'
                                        value={convertirReferencia(detalles.antPersonPato?.diabetes)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                                    <input id="hipert" type="text" className="entrada" name='hipert'
                                        value={convertirReferencia(detalles.antPersonPato?.hipert)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="cancer">Cancer</label>
                                    <input id="cancer" type="text" className="entrada" name='cancer'
                                        value={convertirReferencia(detalles.antPersonPato?.cancer)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                                    <input id="tuberculo" type="text" className="entrada" name='tuberculo'
                                        value={convertirReferencia(detalles.antPersonPato?.tuberculo)} readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="transfusiones">Transfusiones</label>
                                    <input id="transfusion" type="text" className="entrada" name='transfusion'
                                        value={convertirReferencia(detalles.antPersonPato?.transfusion)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="quirurgicos">Quirurgicos</label>
                                    <input id="quirurgicos" type="text" className="entrada" name='quirurgicos'
                                        value={convertirReferencia(detalles.antPersonPato?.quirurgicos)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                                    <input id="anestesicos" type="text" className="entrada" name='anestesicos'
                                        value={convertirReferencia(detalles.antPersonPato?.anestesicos)} readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                                    <input id="alergicos" type="text" className="entrada" name='alergicos'
                                        value={convertirReferencia(detalles.antPersonPato?.alergicos)} readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <label className="etiqueta" htmlFor="traumaticoss">Traumáticos</label>
                                    <input id="trauma" type="text" className="entrada" name='trauma'
                                        value={convertirReferencia(detalles.antPersonPato?.trauma)} readOnly
                                    />
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
                                    <input id="vacuna" type="text" name="vacunas" className="entrada"
                                        value={detalles.personNoPato?.vacuna} readOnly/>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                                    <input id="alimentacion" type="text" name="Alimentación" className="entrada"
                                        value={detalles.personNoPato?.alimentacion} readOnly/>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                                    <input id="fauna" type="text" name="fauna" className="entrada"
                                        value={detalles.personNoPato?.fauna_nociva} readOnly/>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                                    <input id="vivienda" type="text" name="vivivenda" className="entrada"
                                        value={detalles.personNoPato?.vivienda} readOnly/>
                                </div>
                                <div className="col">
                                    <label className="etiqueta" htmlFor="higiene">Adicciones</label>
                                    <input id="adicc" type="text" name="adicciones" className="entrada"
                                        value={detalles.personNoPato?.adicciones} readOnly/>
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
                                    <input id="fechaDoc" type="date" name="fec" className="entrada"
                                        value={detalles.antGinecob?.fecha_ult_doc} readOnly/>
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="fechaDoc">Fecha ultima regla</label>
                                    <input id="fechaDoc" type="date" name="fecha" className="entrada"
                                        value={detalles.antGinecob?.fecha_ultima_regla} readOnly/>
                                </div>

                                <div className="col">
                                    <label className="etiqueta" htmlFor="planiFami">Planificación familiar</label>
                                    <input id="planiFami" type="text" name="planificación" className="entrada"
                                        value={detalles.antGinecob?.planificacion_fam} readOnly/>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --------------------------------------------------   */}
                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitos">Habitos exteriores</label>
                            <textarea id="habitos" type="text" name="Habitos" className="entrada" rows="10" cols="30"
                                value={detalles.habitos_exteriores} readOnly/>
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Cabeza y cuello</h3>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="labio">Labios</label>
                            <input id="labio" type="text" name="labios" className="entrada"
                                value={detalles.cabeza?.labios} readOnly/>
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="mucosa">Mucosa oral</label>
                            <input id="mucosa" type="text" name="mucosa" className="entrada"
                                value={detalles.cabeza?.mucosa} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="encias">Encias</label>
                            <input id="encia" type="text" name="encias" className="entrada"
                                value={detalles.cabeza?.encias} readOnly/>
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="lengua">Lengua</label>
                            <input id="lengua" type="text" name="lengua" className="entrada"
                                value={detalles.cabeza?.lengua} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorB">Paladar blando</label>
                            <input id="paladorB" type="text" name="palador_blando" className="entrada"
                                value={detalles.cabeza?.paladar_blando} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorD">Paladar duro</label>
                            <input id="paladorD" type="text" name="palador_duro" className="entrada"
                                value={detalles.cabeza?.paladar_duro} readOnly/>
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cuello">Cuello</label>
                            <input id="cuello" type="text" name="cuello" className="entrada"
                                value={detalles.cuello_odont} readOnly/>
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Interrogatorio por aparatos y sistema</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="respi">Respiratorio</label>
                            <input id="respi" type="text" name="respiratorio" className="entrada"
                                value={detalles.aparatosSistemas?.respiratorio} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="digestivo">Digestivo</label>
                            <input id="digestivo" type="text" name="digestivo" className="entrada"
                                value={detalles.aparatosSistemas?.digestivo} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="neuro">Neurológico</label>
                            <input id="neuro" type="text" name="neurológico" className="entrada"
                                value={detalles.aparatosSistemas?.neuro} readOnly/>
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cardio">Cardiovasculares</label>
                            <input id="cardio" type="text" placeholder="Cardiovasculares" className="entrada"
                                value={detalles.aparatosSistemas?.cardioV} readOnly/>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="musco">Muscoesqueleto</label>
                            <input id="musco" type="text" name="Muscoesqueleto" className="entrada"
                                value={detalles.aparatosSistemas?.muscoes} readOnly/>
                        </div>
                        <div className='col'></div>
                    </div>
                    <div className="mt-3 mb-3">
                        <div className='row'>
                            <div className="col">
                                <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                                <PDFViewer detalles={detalles} token={token} readOnly/>
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 mb-5 container'>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="medico">Odontólogo:</label>
                                <input className="datos_lectura" id='medico' name='medico' type="text"
                                    value={empleado.nombre + " " + empleado.apellidoPaterno + " " + empleado.apellidoMaterno} readOnly />
                                <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                                <input className="datos_lectura" id='cedula' name='cedula' type="text"
                                    value={empleado.cedula_profesional} readOnly />
                                <label className='etiqueta' htmlFor="firma">Firma:</label>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )

}