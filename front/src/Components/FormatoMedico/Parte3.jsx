import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function Parte3() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [datos, setDatos] = useState(null);
    const [datos2, setDatos2] = useState(null);
    const [noEmpleado, setNoEmpleado] = useState(null);
    const { token } = useAuth()


    useEffect(() => {
        const storedData = localStorage.getItem('datos');
        const storeData2 = localStorage.getItem('datos2')
        if (storedData && storeData2) {
            setDatos(JSON.parse(storedData));
            setDatos2(JSON.parse(storeData2))
        }
    }, []);

    //console.log(datos);
    //console.log(datos2);

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
                fecha_elaboracion: datos.fecha,
                informante: datos.informante,
                "referenciaMed": {
                    num_consultorio: datos.no_consultorio,
                    referencia: datos.referencia,
                    lugar_referencia: datos.lugar
                },
                "datosFamiliares": {
                    tipo_familia: datos.tipo_familia,
                    rol_madre: datos.rol_madre,
                    familia: datos.familia,
                    disfuncional: datos.disfuncional,
                },
                "antHerediPatM": {
                    diabetes: datos2.diabetes,
                    hipertension: datos2.hipertension,
                    cancer: datos2.cancer,
                    cardiopatia: datos2.cardiopatia,
                    par_diabetes: datos2.par_diabetes,
                    par_hipertension: datos2.par_hipertension,
                    par_cancer: datos2.par_cancer,
                    par_cardiopatia: datos2.par_cardiopatia,
                    otros: datos2.otros_ant
                },
                "antPersoPatM": {
                    medicosQT: datos2.medicosQT,
                    tabaquismoAA: datos2.tabaquismoAA,
                    tendenciaDM: datos2.tendenciaDM,
                    otros: datos2.otros_antPat
                },
                "antPersoNoPatM": {
                    alimentacion: datos2.alimentacion,
                    habitacion: datos2.habitacion,
                    higiene: datos2.higiene
                },
                "ginecobMed": {
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
                },
                "interrogatorio": {
                    padecimiento: data.padecimiento,
                    aparatos_sistemas: data.aparatos_sistemas,
                    auxiliares: data.auxiliares,
                    tratamientos_previos: data.tratamientos_previos
                },
                "exploracionFisica": {
                    inspeccion_gral: data.inspeccion_gral,
                    cabeza: data.cabeza,
                    cuello: data.cuello,
                    torax: data.torax,
                    abdomen: data.abdomen,
                    columna_vertical: data.columna_vertical,
                    genitales_externos: data.genitales_externos,
                    extremidades: data.extremidades
                },
                "diagnostico": {
                    diagnostico: data.diagnostico,
                    tratamiento_integral: data.tratamiento_integral,
                    pronostico: data.pronostico
                },
                "estudiosExter": {
                    estudios: datos.estudios
                },
                paciente: datos.noExpediente,
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
        registrarHistorial(data);
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
                            <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                            <textarea id="padecimiento" placeholder="Dolor de garganta..." className="text-amplio" rows="10" cols="30"
                                {...register("padecimiento", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="aparatos_sistemas">Aparatos y sistemas</label>
                            <textarea id="aparatos_sistemas" placeholder="Sistema nervioso..." className="text-amplio" rows="10" cols="30"
                                {...register("aparatos_sistemas", { required: true })} />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="auxiliares">Auxiliares de diagnóstico previo</label>
                            <textarea id="auxiliares" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                {...register("auxiliares", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamientos_previos">Manejo de tratamiento previos</label>
                            <textarea id="tratamientos_previos" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                                {...register("tratamientos_previos", { required: true })} />
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
                                {...register("inspeccion_gral", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cabeza">Cabeza:</label>
                            <textarea id="cabeza" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("cabeza", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="cuello">Cuello:</label>
                            <textarea id="cuello" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("cuello", { required: true })} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="torax">Tórax:</label>
                            <textarea id="torax" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("torax", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="abdomen">Abdomen:</label>
                            <textarea id="abdomen" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("abdomen", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="columna_vertical">Columna vertical:</label>
                            <textarea id="columna_vertical" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("columna_vertical", { required: true })} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="genitales_externos">Genitales externos:</label>
                            <textarea id="genitales_externos" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("genitales_externos", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="extremidades">Extremidades:</label>
                            <textarea id="extremidades" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("extremidades", { required: true })} />
                        </div>
                    </div>

                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="diagnostico">Diagnóstico:</label>
                            <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("diagnostico", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tratamiento_integral">Tratamiento y manejo integral:</label>
                            <textarea id="tratamiento_integral" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("tratamiento_integral", { required: true })} />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="pronostico">Pronostico:</label>
                            <textarea id="pronostico" placeholder="..." className="text-amplio" rows="10" cols="30"
                                {...register("pronostico", { required: true })} />
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