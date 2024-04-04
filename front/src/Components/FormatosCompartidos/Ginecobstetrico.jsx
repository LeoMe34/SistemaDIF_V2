import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function Ginecobstetrico({ getGinecoData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    const getDatos = () => {
        const ginecoData = {
            menarca: getValues("menarca"),
            vida_sexual: getValues("vida_sexual"),
            menstruacion: getValues("menstruacion"),
            num_embarazos: getValues("num_embarazos"),
            partos: getValues("partos"),
            abortos: getValues("abortos"),
            cesarea: getValues("cesarea"),
            ultimo_parto: getValues("ultimo_parto"),
            num_hijos: getValues("num_hijos"),
            macrosomicos: getValues("macrosomicos"),
            bajo_peso: getValues("bajo_peso"),
            num_parejas: getValues("num_parejas"),
            heterosexuales: getValues("heterosexuales"),
            homosexuales: getValues("homosexuales"),
            bisexuales: getValues("bisexuales"),
            diu: getValues("diu"),
            hormonales: getValues("hormonales"),
            quirurgico: getValues("quirurgico"),
            otros: getValues("otros")
        }
        return ginecoData
    }    
    useEffect(() => {
        const data = getDatos();
        getGinecoData(data);
    }, [getValues])

    return (
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
                        <label className='etiqueta' htmlFor="otros">Otros</label>
                        <input className="entrada" id='otros' name='otros' type="text"
                            {...register("otros", { required: true })} />
                    </div>
                </div>
            </div>
        </div>
    )
}