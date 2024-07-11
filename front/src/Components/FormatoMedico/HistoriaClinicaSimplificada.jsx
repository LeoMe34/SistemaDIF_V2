import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import PDFViewer from '../FormatoOdonto/PDFViewer';

export function HistoriaClinicaSimplificada() {
    const [fichaMedica, setFichaMedica] = useState([]);
    const [empleado, setEmpleado] = useState([])
    const [historiaClinica, setHistoriaClinica] = useState(null);
    const { noExpediente, fecha } = useParams();
    const { token } = useAuth();
    const [sexo, setSexo] = useState(null)
    const [vidaSexual, setVidaSexual] = useState(null)
    const [otrosHereditarios, setHereditarios] = useState('')
    const [otrosPersonales, setPersonales] = useState('')
    const [otrosMetodo, setMetodo] = useState('')
    const showVidaSexual = vidaSexual !== null && !isNaN(vidaSexual) && vidaSexual.trim() !== '' && vidaSexual !== '0';

    const getFichasMedicas = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_medica/${noExpediente}/${fecha}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaMedica(response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const getEmpleadoFicha = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/get_empleado/${fichaMedica.empleado}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data)
        } catch (error) {
            console.error('Error al obtener al empleado', error);
        }
    };

    const getHistoriaClinica = async () => {
        if (fichaMedica.id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get_historia_clinica/${fichaMedica.id}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setHistoriaClinica(response.data);
                const vida_Sexual = response.data.ginecobMed.vida_sexual
                setVidaSexual(vida_Sexual)
                setHereditarios(response.data.antHerediPatM.otros || '')
                setPersonales(response.data.antPersoPatM.otros || '')
                setMetodo(response.data.ginecobMed.otros || '')

                console.log('Datos del historial clínico:', response.data);
            } catch (error) {
                console.error('Error al obtener el historial clínico:', error);
            }
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
        if (noExpediente && fecha) {
            getFichasMedicas();
            getPaciente()
        }
    }, [noExpediente, fecha, token]);

    useEffect(() => {
        if (fichaMedica.id) {
            getEmpleadoFicha()
            getHistoriaClinica();
        }
    }, [fichaMedica]);

    const convertirReferencia = (tieneRef) => {
        const opciones = {
            true: 'Sí',
            false: 'No'
        };
        return opciones[tieneRef];
    };

    const convertirAntecedentes = (tieneRef) => {
        const opciones = {
            True: 'Sí',
            False: 'No'
        };
        return opciones[tieneRef];
    };

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
                <div className='ml-10 container'>
                    <div className='ml-10 mb-3'>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            {/*Se podria hacer que desde que incie sesion ponga en que consultorio esta 
                            para que ya no tenga que estar llenandolo */}
                            <label className='etiqueta' htmlFor="num_consultorio">N° consultorio: </label>
                            <input className="entrada" id='num_consultorio' name='num_consultorio' type="text"
                                value={historiaClinica?.referenciaMed?.num_consultorio} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                            <input className="entrada" id='fecha' name='fecha' type="date"
                                value={historiaClinica?.fecha_elaboracion} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="referencia">Referencia:</label>
                            <input className="entrada" id='referencia' name='referencia' type="text"
                                value={convertirReferencia(historiaClinica?.referenciaMed?.referencia)} readOnly />
                        </div>
                        {convertirReferencia(historiaClinica?.referenciaMed?.referencia) == 'Sí' && (
                            <div className='col'>
                                <label className='etiqueta' htmlFor="lugar">Lugar de referencia:</label>
                                <input className="entrada" id='lugar' name='lugar' type="text"
                                    value={historiaClinica?.referenciaMed?.lugar_referencia} readOnly />
                            </div>
                        )}
                    </div>
                </div>

                <div className='ml-10 container'>
                    <h4 className='subtitulo_2'> Información familiar</h4>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_familia">Tipo de familia: </label>
                            <input className="entrada" id='tipo_familia' name='tipo_familia' type="text"
                                value={historiaClinica?.datosFamiliares?.tipo_familia} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="rol_madre">Rol de madre: </label>
                            <input className="entrada" id='rol_madre' name='rol_madre' type="text"
                                value={historiaClinica?.datosFamiliares?.rol_madre} readOnly />
                        </div>
                    </div>

                    <h4 className='subtitulo_2'>Familiar responsable del paciente </h4>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="familia">Familia:</label>
                            <input className="entrada" id='familia' name='familia' type="text"
                                value={historiaClinica?.datosFamiliares?.familia} readOnly />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="disfuncional">Disfuncionales familiares:</label>
                            <input className="entrada" id='disfuncional' name='disfuncional' type="text"
                                value={historiaClinica?.datosFamiliares?.disfuncional} readOnly />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="informante">Informante: </label>
                            <input className="entrada" id='informante' name='informante' type="text"
                                value={historiaClinica?.informante} readOnly />
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="estudios">Estudios externo: </label>
                            <input className="entrada" id='estudios' name='estudios' type="text"
                                value={historiaClinica?.estudiosExter?.estudios} readOnly />
                        </div>
                    </div>

                </div>

                <div className='ml-10 container'>
                    <h3 className='subtitulo'>Antecedentes</h3>
                </div>

                <h3 className='subtitulo_2'>Hereditarios y familiares</h3>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                            <input className="entrada" id='diabetes' name='diabetes' type="text"
                                value={convertirAntecedentes(historiaClinica?.antHerediPatM?.diabetes)} readOnly />

                            {convertirAntecedentes(historiaClinica?.antHerediPatM?.diabetes) == 'Sí' && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                    <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                        value={historiaClinica?.antHerediPatM?.par_diabetes} readOnly></textarea>
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                            <input className="entrada" id='hipertension' name='hipertension' type="text"
                                value={convertirAntecedentes(historiaClinica?.antHerediPatM?.hipertension)} readOnly />
                            {convertirAntecedentes(historiaClinica?.antHerediPatM?.hipertension) == 'Sí' && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                    <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                        value={historiaClinica?.antHerediPatM?.par_hipertension}></textarea>
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="cancer">Cancer</label>
                            <input className="entrada" id='cancer' name='cancer' type="text"
                                value={convertirAntecedentes(historiaClinica?.antHerediPatM?.cancer)} readOnly />
                            {convertirAntecedentes(historiaClinica?.antHerediPatM?.cancer) == 'Sí' && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                                    <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                                        value={historiaClinica?.antHerediPatM?.par_cancer}></textarea>
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="cardiopatia">Cardiopatia Isquémica</label>
                            <input className="entrada" id='cardiopatia' name='cardiopatia' type="text"
                                value={convertirAntecedentes(historiaClinica?.antHerediPatM?.cardiopatia)} readOnly />
                            {convertirAntecedentes(historiaClinica?.antHerediPatM?.cardiopatia) == 'Sí' && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cardiopatia">Parentesco</label>
                                    <textarea name="par_cardiopatia" id="par_cardiopatia" className="text-amplio"
                                        value={historiaClinica?.antHerediPatM?.par_cardiopatia}></textarea>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {otrosHereditarios !== '' && (
                    <div className="container">
                        <div className="col">
                            <label className='form-check-label etiqueta' htmlFor="otros_ant">Otros</label>
                            <textarea name="otros_ant" id="otros_ant" className="text-amplio"
                                value={historiaClinica?.antHerediPatM?.otros} readOnly></textarea>
                        </div>
                    </div>
                )}


                <h3 className='subtitulo_2'>Personales no patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                            <textarea name="alimentacion" id="alimentacion" className="text-amplio"
                                value={historiaClinica?.antPersoNoPatM?.alimentacion} readOnly></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitacion">Habitación</label>
                            <textarea name="habitacion" id="habitacion" className="text-amplio"
                                value={historiaClinica?.antPersoNoPatM?.habitacion} readOnly></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                            <textarea name="higiene" id="higiene" className="text-amplio"
                                value={historiaClinica?.antPersoNoPatM?.higiene} readOnly></textarea>
                        </div>
                    </div>
                </div>

                <h3 className='subtitulo_2'>Personales patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="medicosQT">Médicos,quirúrgicos,transfusiones</label>
                            <textarea name="medicosQT" id="medicosQT" className="text-amplio"
                                value={historiaClinica?.antPersoPatM?.medicosQT} readOnly></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tabaquismoAA">Tabaquismo,alcoholismo,alérgicos</label>
                            <textarea name="tabaquismoAA" id="tabaquismoAA" className="text-amplio"
                                value={historiaClinica?.antPersoPatM?.tabaquismoAA} readOnly></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tendenciaDM">Tendencia a drogas,medicamentos</label>
                            <textarea name="tendenciaDM" id="tendenciaDM" className="text-amplio"
                                value={historiaClinica?.antPersoPatM?.tendenciaDM} readOnly></textarea>
                        </div>
                        {otrosPersonales !== '' && (
                            <div className="col">
                                <label className="etiqueta" htmlFor="otros_antPat">Otros</label>
                                <textarea name="otros_antPat" id="otros_antPat" className="text-amplio"
                                    value={historiaClinica?.antPersoPatM?.otros} readOnly></textarea>
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
                                    <label className='etiqueta' htmlFor="menarca">Menarca: </label>
                                    <input className="entrada" id='menarca' name='menarca' type="text"
                                        value={historiaClinica?.ginecobMed?.menarca} readOnly />

                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="vida_sexual">Inicio de vida sexual activa: </label>
                                    <input className="entrada" id='vida_sexual' name='vida_sexual' type="text"
                                        value={historiaClinica?.ginecobMed?.vida_sexual} readOnly />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="menstruacion">Ultima menstruación</label>
                                    <input className="entrada" id='menstruacion' name='menstruacion' type="text"
                                        value={historiaClinica?.ginecobMed?.menstruacion} readOnly />
                                </div>
                            </div>
                        </div>
                        {showVidaSexual && (
                            <div>
                                <h3 className='subtitulo_2'>Embarazos</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_embarazos">N° embarazos: </label>
                                            <input className="entrada" id='num_embarazos' name='num_embarazos' type="text"
                                                value={historiaClinica?.ginecobMed?.num_embarazos} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="partos">Partos:</label>
                                            <input className="entrada" id='partos' name='partos' type="text"
                                                value={historiaClinica?.ginecobMed?.partos} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="abortos">Abortos</label>
                                            <input className="entrada" id='abortos' name='abortos' type="text"
                                                value={historiaClinica?.ginecobMed?.abortos} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="cesarea">Cesareas</label>
                                            <input className="entrada" id='cesarea' name='cesarea' type="text"
                                                value={historiaClinica?.ginecobMed?.cesarea} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Partos</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="ultimo_parto">Fecha de ultimo parto: </label>
                                            <input className="entrada" id='ultimo_parto' name='ultimo_parto' type="text"
                                                value={historiaClinica?.ginecobMed?.ultimo_parto} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_hijos">N° de hijos:</label>
                                            <input className="entrada" id='num_hijos' name='num_hijos' type="text"
                                                value={historiaClinica?.ginecobMed?.num_hijos} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="macrosomicos">Macrosomicos vivos</label>
                                            <input className="entrada" id='macrosomicos' name='macrosomicos' type="text"
                                                value={historiaClinica?.ginecobMed?.macrosomicos} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="bajo_peso">Bajo peso al nacer</label>
                                            <input className="entrada" id='bajo_peso' name='bajo_peso' type="text"
                                                value={historiaClinica?.ginecobMed?.bajo_peso} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Parejas</h3>
                                <div className='mt-3 container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="num_parejas">N° de parejas</label>
                                            <input className="entrada" id='num_parejas' name='num_parejas' type="text"
                                                value={historiaClinica?.ginecobMed?.num_parejas} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="heterosexuales">Heterosexuales:</label>
                                            <input className="entrada" id='heterosexuales' name='heterosexuales' type="text"
                                                value={historiaClinica?.ginecobMed?.heterosexuales} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="homosexuales">Homosexuales</label>
                                            <input className="entrada" id='homosexuales' name='homosexuales' type="text"
                                                value={historiaClinica?.ginecobMed?.homosexuales} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="bisexuales">Bisexuales</label>
                                            <input className="entrada" id='bisexuales' name='bisexuales' type="text"
                                                value={historiaClinica?.ginecobMed?.bisexuales} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <h3 className='subtitulo_2'>Método de planificación familiar</h3>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="diu">DIU</label>
                                            <input className="entrada" id='diu' name='diu' type="text"
                                                value={historiaClinica?.ginecobMed?.diu} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="hormonales">Hormonales</label>
                                            <input className="entrada" id='hormonales' name='hormonales' type="text"
                                                value={historiaClinica?.ginecobMed?.hormonales} readOnly />
                                        </div>
                                        <div className='col'>
                                            <label className='etiqueta' htmlFor="quirurgico">Quirurgico</label>
                                            <input className="entrada" id='quirurgico' name='quirurgico' type="text"
                                                value={historiaClinica?.ginecobMed?.quirurgico} readOnly />
                                        </div>
                                        {otrosMetodo !== '' && (
                                            <div className='col'>
                                                <label className='etiqueta' htmlFor="otrosMP">Otros</label>
                                                <input className="entrada" id='otrosMP' name='otrosMP' type="text"
                                                    value={historiaClinica?.ginecobMed?.otros} readOnly />
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className='ml-10 container'>
                    <h3 className='subtitulo'>Interrogatorio</h3>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                            <textarea id="padecimiento" placeholder="Dolor de garganta..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.interrogatorio?.padecimiento} readOnly />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="aparatos_sistemas">Aparatos y sistemas</label>
                            <textarea id="aparatos_sistemas" placeholder="Sistema nervioso..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.interrogatorio?.aparatos_sistemas} readOnly />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="auxiliares">Auxiliares de diagnóstico previo</label>
                            <textarea id="auxiliares" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.interrogatorio?.auxiliares} readOnly />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamientos_previos">Manejo de tratamiento previos</label>
                            <textarea id="tratamientos_previos" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.interrogatorio?.tratamientos_previos} readOnly />
                        </div>
                    </div>
                </div>

                <div className='ml-10 container'>
                    <h3 className="subtitulo">Exploración física</h3>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="inspeccion_gral">Inspección general:</label>
                            <textarea id="inspeccion_gral" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.inspeccion_gral} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cabeza">Cabeza:</label>
                            <textarea id="cabeza" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.cabeza} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cuello">Cuello:</label>
                            <textarea id="cuello" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.cuello} readOnly />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="torax">Tórax:</label>
                            <textarea id="torax" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.torax} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="abdomen">Abdomen:</label>
                            <textarea id="abdomen" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.abdomen} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="columna_vertical">Columna vertical:</label>
                            <textarea id="columna_vertical" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.columna_vertical} readOnly />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="genitales_externos">Genitales externos:</label>
                            <textarea id="genitales_externos" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.genitales_externos} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="extremidades">Extremidades:</label>
                            <textarea id="extremidades" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.exploracionFisica?.extremidades} readOnly />
                        </div>
                    </div>

                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="diagnostico">Diagnóstico:</label>
                            <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.diagnostico?.diagnostico} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tratamiento_integral">Tratamiento y manejo integral:</label>
                            <textarea id="tratamiento_integral" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.diagnostico?.tratamiento_integral} readOnly />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="pronostico">Pronostico:</label>
                            <textarea id="pronostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                value={historiaClinica?.diagnostico?.pronostico} readOnly />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 mb-3">
                <div className='row'>
                    <div className="col">
                        <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                        <PDFViewer detalles={historiaClinica} token={token} readOnly />
                    </div>
                </div>
            </div>


            <div className='container'>
                <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                <input className="datos_lectura" id='medico' name='medico' type="text"
                    value={empleado.nombre + " " + empleado.apellidoPaterno + " " + empleado.apellidoMaterno} readOnly />
                <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                <input className="datos_lectura" id='medico' name='medico' type="text"
                    value={empleado.cedula_profesional} readOnly />
            </div>
        </div >
    )
}