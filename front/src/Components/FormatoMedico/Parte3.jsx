import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

export function Parte3() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [datos, setDatos] = useState(null);
    const [datos2, setDatos2] = useState(null);
    const [noExpediente, setNoExpediente] = useState(null)
    const [fichaMedica, setFichaMedica] = useState(null);
    const { token } = useAuth()
    const navegador = useNavigate()
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
    const [empleado, setEmpleado] = useState([]);

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setEmpleado(response.data.user_info)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const archivosArray = Array.from(archivos);
        setArchivosSeleccionados(archivosArray); // Actualizamos archivosSeleccionados con el array de archivos
    }

    useEffect(() => {
        getNoEmpleado();
    }, [token]);

    useEffect(() => {
        const storedData = localStorage.getItem('datos');
        const storeData2 = localStorage.getItem('datos2')
        const noExp = localStorage.getItem('noExp')
        if (storedData && storeData2 && noExp) {
            setDatos(JSON.parse(storedData));
            setDatos2(JSON.parse(storeData2))
            setNoExpediente(JSON.parse(noExp))
        }
    }, []);

    useEffect(() => {
        const getFichaMedica = async () => {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/getFichaMedica/?no_expediente=${noExpediente}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setFichaMedica(response.data[0].id)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };

        getFichaMedica();
    }, [noExpediente]);


    const registrarHistorial = async (data) => {
        try {
            const formData = new FormData();
            if (data.archivo && data.archivo.length > 0) { // Verificamos que data.archivo esté definido y tenga una longitud mayor que cero
                for (let i = 0; i < data.archivo.length; i++) {
                    formData.append('archivo', data.archivo[i]);
                }
            }
            formData.append('fecha_elaboracion', datos.fecha);
            formData.append('informante', datos.informante);
            formData.append('referenciaMed', JSON.stringify({
                num_consultorio: datos.no_consultorio,
                referencia: datos.referencia,
                lugar_referencia: datos.lugar
            }));
            formData.append('datosFamiliares', JSON.stringify({
                tipo_familia: datos.tipo_familia,
                rol_madre: datos.rol_madre,
                familia: datos.familia,
                disfuncional: datos.disfuncional,
            }));

            formData.append('antHerediPatM', JSON.stringify({
                diabetes: datos2.diabetes,
                hipertension: datos2.hipertension,
                cancer: datos2.cancer,
                cardiopatia: datos2.cardiopatia,
                par_diabetes: datos2.par_diabetes,
                par_hipertension: datos2.par_hipertension,
                par_cancer: datos2.par_cancer,
                par_cardiopatia: datos2.par_cardiopatia,
                otros: datos2.otros_ant
            }));
            formData.append('antPersoPatM', JSON.stringify({
                medicosQT: datos2.medicosQT,
                tabaquismoAA: datos2.tabaquismoAA,
                tendenciaDM: datos2.tendenciaDM,
                otros: datos2.otros_antPat
            }));
            formData.append('antPersoNoPatM', JSON.stringify({
                alimentacion: datos2.alimentacion,
                habitacion: datos2.habitacion,
                higiene: datos2.higiene
            }));
            formData.append('ginecobMed', JSON.stringify({
                menarca: datos2.menarca,
                vida_sexual: datos2.vida_sexual,
                menstruacion: datos2.menstruacion,
                num_embarazos: datos2.num_embarazos,
                partos: datos2.partos,
                abortos: datos2.abortos,
                cesarea: datos2.cesarea,
                ultimo_parto: datos2.ultimo_parto,
                num_hijos: datos2.num_hijos,
                macrosomicos: datos2.macrosomicos,
                bajo_peso: datos2.bajo_peso,
                num_parejas: datos2.num_parejas,
                heterosexuales: datos2.heterosexuales,
                homosexuales: datos2.homosexuales,
                bisexuales: datos2.bisexuales,
                diu: datos2.diu,
                hormonales: datos2.hormonales,
                quirurgico: datos2.quirurgico,
                otros: datos2.otrosMP
            }));
            formData.append('interrogatorio', JSON.stringify({
                padecimiento: data.padecimiento,
                aparatos_sistemas: data.aparatos_sistemas,
                auxiliares: data.auxiliares,
                tratamientos_previos: data.tratamientos_previos
            }));
            formData.append('exploracionFisica', JSON.stringify({
                inspeccion_gral: data.inspeccion_gral,
                cabeza: data.cabeza,
                cuello: data.cuello,
                torax: data.torax,
                abdomen: data.abdomen,
                columna_vertical: data.columna_vertical,
                genitales_externos: data.genitales_externos,
                extremidades: data.extremidades
            }));
            formData.append('diagnostico', JSON.stringify({
                diagnostico: data.diagnostico,
                tratamiento_integral: data.tratamiento_integral,
                pronostico: data.pronostico
            }));
            formData.append('estudiosExter', JSON.stringify({
                estudios: datos.estudios
            }));
            formData.append('fichaMed', fichaMedica);

            const url = "http://127.0.0.1:8000/api/crear_historial_medico/"
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
        const textoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s.-:,;()/]{1,500}$/

        return textoRegex.test(texto)
    }

    const enviar = handleSubmit(async data => {
        const padecimientoValido = validarTexto(data.padecimiento)
        const aparatosSistemasValido = validarTexto(data.aparatos_sistemas)
        const auxiliaresValido = validarTexto(data.auxiliares)
        const tratamientosPreviosValido = validarTexto(data.tratamientos_previos)
        const inspeccionGralValido = validarTexto(data.inspeccion_gral)
        const cabezaValido = validarTexto(data.cabeza)
        const cuelloValido = validarTexto(data.cuello)
        const toraxValido = validarTexto(data.torax)
        const abdomenValido = validarTexto(data.abdomen)
        const columnaValido = validarTexto(data.columna_vertical)
        const genitalesExtValido = validarTexto(data.genitales_externos)
        const extremidadesValido = validarTexto(data.extremidades)
        const diagnosticoValido = validarTexto(data.diagnostico)
        const tratamientoIntegralValido = validarTexto(data.tratamiento_integral)
        const pronosticoValido = validarTexto(data.pronostico)

        if (!padecimientoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de padecimiento actual");
        } else if (!aparatosSistemasValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de aparatos y sistemas");
        } else if (!auxiliaresValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de auxiliares de diagnóstico previo");
        } else if (!tratamientosPreviosValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de manejo tratamientos previos");
        } else if (!inspeccionGralValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de inspección general");
        } else if (!cabezaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de cabeza");
        } else if (!cuelloValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de cuello");
        } else if (!toraxValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tórax");
        } else if (!abdomenValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de abdomen");
        } else if (!columnaValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de columna vertical");
        } else if (!genitalesExtValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de genitales exteriores");
        } else if (!extremidadesValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de extremidades");
        } else if (!diagnosticoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de diagnóstico");
        } else if (!tratamientoIntegralValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de tratamiento y manejo integral");
        } else if (!pronosticoValido) {
            toast.error("Ingrese solo caracteres alfanuméricos en el campo de pronóstico");
        }
        else {
            registrarHistorial(data);
            navegador('/notas_medicas')
        }
    })
    return (
        <div>
            <div className='ml-10 container'>
                <h3 className='subtitulo'>Interrogatorio</h3>
            </div>
            <form onSubmit={enviar}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="padecimiento" placeholder="Dolor de garganta..." className="text-amplio" rows="10" cols="30"
                                {...register("padecimiento", { required: true })} />
                            {errors.padecimiento && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="aparatos_sistemas">Aparatos y sistemas
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="aparatos_sistemas" placeholder="Sistema nervioso..." className="text-amplio" rows="10" cols="30"
                                {...register("aparatos_sistemas", { required: true })} />
                            {errors.aparatos_sistemas && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="auxiliares">Auxiliares de diagnóstico previo
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="auxiliares" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                {...register("auxiliares", { required: true })} />
                            {errors.auxiliares && <span>Es necesario este campo</span>}
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamientos_previos">Manejo de tratamiento previos
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="tratamientos_previos" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                {...register("tratamientos_previos", { required: true })} />
                            {errors.tratamientos_previos && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>

                <div className='ml-10 container'>
                    <h3 className="subtitulo">Exploración física</h3>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="inspeccion_gral">Inspección general
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="inspeccion_gral" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("inspeccion_gral", { required: true })} />
                            {errors.inspeccion_gral && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cabeza">Cabeza
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="cabeza" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("cabeza", { required: true })} />
                            {errors.cabeza && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cuello">Cuello
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="cuello" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("cuello", { required: true })} />
                            {errors.cuello && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="torax">Tórax
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="torax" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("torax", { required: true })} />
                            {errors.torax && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="abdomen">Abdomen
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="abdomen" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("abdomen", { required: true })} />
                            {errors.abdomen && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="columna_vertical">Columna vertical
                                <span className='etiqueta_obligatoria'>*</span></label>
                            <textarea id="columna_vertical" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("columna_vertical", { required: true })} />
                            {errors.columna_vertical && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="genitales_externos">Genitales externos
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="genitales_externos" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("genitales_externos", { required: true })} />
                            {errors.genitales_externos && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="extremidades">Extremidades
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="extremidades" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("extremidades", { required: true })} />
                            {errors.extremidades && <span>Es necesario este campo</span>}
                        </div>
                    </div>

                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="diagnostico">Diagnóstico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("diagnostico", { required: true })} />
                            {errors.diagnostico && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tratamiento_integral">Tratamiento y manejo integral
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="tratamiento_integral" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("tratamiento_integral", { required: true })} />
                            {errors.tratamiento_integral && <span>Es necesario este campo</span>}
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="pronostico">Pronóstico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <textarea id="pronostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("pronostico", { required: true })} />
                            {errors.pronostico && <span>Es necesario este campo</span>}
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-3">
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                            <span className="ml-10" style={{ display: 'block' }}>Cargue los estudios en formato PDF</span>
                            <label htmlFor="fileInput" className="btn btn-cargar">
                                Elegir archivo(s)
                            </label>
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} multiple
                                {...register("archivo", { required: false })} />

                            {archivosSeleccionados && archivosSeleccionados.map((archivo, index) => (
                                <label key={index}>{archivo.name}</label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='ml-10 mb-5 container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="medico">Médico:</label>
                            <input className="datos_lectura" id='medico' name='medico' type="text"
                                value={empleado.nombre_empleado} readOnly />
                            <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                            <input className="datos_lectura" id='cedula' name='cedula' type="text"
                                value={empleado.cedula} readOnly />
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
    )
}