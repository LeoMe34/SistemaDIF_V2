import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function ExploracionFisica({ getExploracionData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    
    const getDatos = () => {
        const exploracionData = {
            inspeccion_gral: getValues("inspeccion_gral"),
            cabeza: getValues("cabeza"),
            cuello: getValues("cuello"),
            torax: getValues("torax"),
            abdomen: getValues("abdomen"),
            columna_vertical: getValues("columna_vertical"),
            genitales_externos: getValues("genitales_externos"),
            extremidades: getValues("extremidades"),
            diagnostico: getValues("diagnostico"),
            tratamiento_integral: getValues("tratamiento_integral"),
            pronostico: getValues("pronostico")            
        }
        return exploracionData
    }

    useEffect(() => {
        const data = getDatos();
        getExploracionData(data);
    }, [])

    return (
        <div>
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
        </div>
    )
}