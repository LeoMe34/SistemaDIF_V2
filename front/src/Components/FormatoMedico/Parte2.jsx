{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../Contexto/AuthContext";

export function Parte2() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const { token } = useAuth()
    const navegador = useNavigate()
    const [showPDiabetes, setShowPDiabetes] = useState(false)
    const [showPHiper, setShowPHiper] = useState(false)
    const [showPCancer, setShowPCancer] = useState(false)
    const [showPCardio, setShowPCardio] = useState(false)
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

    const handleChangeCardiopatia = (e) => {
        setShowPCardio(e.target.value === "True");
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

        localStorage.setItem('datos2', JSON.stringify(data));

        navegador('/historial_clinico_p3');
    });

    return (
        <div>
            <div className='ml-10 container'>
                <h3 className='subtitulo'>Antecedentes</h3>
            </div>

            <h3 className='subtitulo_2'>Hereditarios y familiares</h3>
            <form onSubmit={enviar}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                            <select name="diabetes" id="diabetes" className="opciones" type=""
                                {...register("diabetes", { required: true })}
                                onChange={handleChangeDiabetes}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {showPDiabetes && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                                    <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                                        {...register("par_diabetes", { required: false })}></textarea>
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                            <select name="hipertension" id="hipertension" className="opciones" type=""
                                {...register("hipertension", { required: true })}
                                onChange={handleChangeHipertension}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {showPHiper && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                                    <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                                        {...register("par_hipertension", { required: false })}></textarea>
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
                                        {...register("par_cancer", { required: false })}></textarea>
                                </div>
                            )}
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="cardiopatia">Cardiopatia Isquémica</label>
                            <select name="cardiopatia" id="cardiopatia" className="opciones" type=""
                                {...register("cardiopatia", { required: true })}
                                onChange={handleChangeCardiopatia}>
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="True">Si</option>
                                <option value="False">No</option>
                            </select>
                            {showPCardio && (
                                <div className="col">
                                    <label className="etiqueta" htmlFor="par_cardiopatia">Parentesco</label>
                                    <textarea name="par_cardiopatia" id="par_cardiopatia" className="text-amplio"
                                        {...register("par_cardiopatia", { required: false })}></textarea>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="col">
                        <label className='form-check-label etiqueta' htmlFor="otros_ant">Otros</label>
                        <textarea name="otros_ant" id="otros_ant" className="text-amplio"
                            {...register("otros_ant", { required: false })}></textarea>
                    </div>
                </div>

                <h3 className='subtitulo_2'>Personales no patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                            <textarea name="alimentacion" id="alimentacion" className="text-amplio"
                                {...register("alimentacion", { required: true })}></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitacion">Habitación</label>
                            <textarea name="habitacion" id="habitacion" className="text-amplio"
                                {...register("habitacion", { required: true })}></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                            <textarea name="higiene" id="higiene" className="text-amplio"
                                {...register("higiene", { getPersonalesData: true })}></textarea>
                        </div>
                    </div>
                </div>

                <h3 className='subtitulo_2'>Personales patológicos</h3>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="medicosQT">Médicos,quirúrgicos,transfusiones</label>
                            <textarea name="medicosQT" id="medicosQT" className="text-amplio"
                                {...register("medicosQT", { required: true })}></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tabaquismoAA">Tabaquismo,alcoholismo,alérgicos</label>
                            <textarea name="tabaquismoAA" id="tabaquismoAA" className="text-amplio"
                                {...register("tabaquismoAA", { required: true })}></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="tendenciaDM">Tendencia a drogas,medicamentos</label>
                            <textarea name="tendenciaDM" id="tendenciaDM" className="text-amplio"
                                {...register("tendenciaDM", { required: true })}></textarea>
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="otros_antPat">Otros</label>
                            <textarea name="otros_antPat" id="otros_antPat" className="text-amplio"
                                {...register("otros_antPat", { required: false })}></textarea>
                        </div>
                    </div>
                </div>


                {sexo === 'Femenino' &&(
                    <div>
                        <h3 className='subtitulo_2'>Datos ginecobstetricos</h3>

                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="menarca">Menarca: </label>
                                    <input className="entrada" id='menarca' name='menarca' type="text"
                                        {...register("menarca", { required: true })} />

                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="vida_sexual">Inicio de vida sexual activa: </label>
                                    <input className="entrada" id='vida_sexual' name='vida_sexual' type="text"
                                        {...register("vida_sexual", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="menstruacion">Ultima menstruación</label>
                                    <input className="entrada" id='menstruacion' name='menstruacion' type="text"
                                        {...register("menstruacion", { required: true })} />
                                </div>
                            </div>
                        </div>

                        <h3 className='subtitulo_2'>Embarazos</h3>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="num_embarazos">N° embarazos: </label>
                                    <input className="entrada" id='num_embarazos' name='num_embarazos' type="text"
                                        {...register("num_embarazos", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="partos">Partos:</label>
                                    <input className="entrada" id='partos' name='partos' type="text"
                                        {...register("partos", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="abortos">Abortos</label>
                                    <input className="entrada" id='abortos' name='abortos' type="text"
                                        {...register("abortos", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="cesarea">Cesareas</label>
                                    <input className="entrada" id='cesarea' name='cesarea' type="text"
                                        {...register("cesarea", { required: true })} />
                                </div>
                            </div>
                        </div>

                        <h3 className='subtitulo_2'>Partos</h3>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="ultimo_parto">Fecha de ultimo parto: </label>
                                    <input className="entrada" id='ultimo_parto' name='ultimo_parto' type="text"
                                        {...register("ultimo_parto", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="num_hijos">N° de hijos:</label>
                                    <input className="entrada" id='num_hijos' name='num_hijos' type="text"
                                        {...register("num_hijos", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="macrosomicos">Macrosomicos vivos</label>
                                    <input className="entrada" id='macrosomicos' name='macrosomicos' type="text"
                                        {...register("macrosomicos", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="bajo_peso">Bajo peso al nacer</label>
                                    <input className="entrada" id='bajo_peso' name='bajo_peso' type="text"
                                        {...register("bajo_peso", { required: true })} />
                                </div>
                            </div>
                        </div>

                        <h3 className='subtitulo_2'>Parejas</h3>
                        <div className='mt-3 container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="num_parejas">N° de parejas</label>
                                    <input className="entrada" id='num_parejas' name='num_parejas' type="text"
                                        {...register("num_parejas", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="heterosexuales">Heterosexuales:</label>
                                    <input className="entrada" id='heterosexuales' name='heterosexuales' type="text"
                                        {...register("heterosexuales", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="homosexuales">Homosexuales</label>
                                    <input className="entrada" id='homosexuales' name='homosexuales' type="text"
                                        {...register("homosexuales", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="bisexuales">Bisexuales</label>
                                    <input className="entrada" id='bisexuales' name='bisexuales' type="text"
                                        {...register("bisexuales", { required: true })} />
                                </div>
                            </div>
                        </div>

                        <h3 className='subtitulo_2'>Método de planificación familiar</h3>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="diu">DIU</label>
                                    <input className="entrada" id='diu' name='diu' type="text"
                                        {...register("diu", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="hormonales">Hormonales</label>
                                    <input className="entrada" id='hormonales' name='hormonales' type="text"
                                        {...register("hormonales", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="quirurgico">Quirurgico</label>
                                    <input className="entrada" id='quirurgico' name='quirurgico' type="text"
                                        {...register("quirurgico", { required: true })} />
                                </div>
                                <div className='col'>
                                    <label className='etiqueta' htmlFor="otrosMP">Otros</label>
                                    <input className="entrada" id='otrosMP' name='otrosMP' type="text"
                                        {...register("otrosMP", { required: true })} />
                                </div>
                            </div>
                        </div>
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