{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntecedentesHereditarios({ getHereditariosData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    const getDatos = () => {
        const hereditariosData = {
            diabetes: getValues("diabetes"),
            hipertension: getValues("hipertension"),
            cancer: getValues("cancer"),
            cardiopatia: getValues("cardiopatia"),
            par_diabetes: getValues("par_diabetes"),
            par_hipertension: getValues("par_hipertension"),
            par_cancer: getValues("par_cancer"),
            par_cardiopatia: getValues("par_cardiopatia"),
            otros: getValues("otros")          
        }
        return hereditariosData
    }

    useEffect(() => {
        const data = getDatos();
        getHereditariosData(data);
    }, [getValues])

    return (
        <div>
            <h3 className='subtitulo_2'>Hereditarios y familiares</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones" type=""
                            {...register("diabetes", { required: true })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones" type=""
                            {...register("hipertension", { required: true })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones" type=""
                            {...register("cancer", { required: true })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cardiopatia">Cardiopatia Isquémica</label>
                        <select name="cardiopatia" id="cardiopatia" className="opciones" type=""
                            {...register("cardiopatia", { required: true })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                        <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                            {...register("par_diabetes", { required: false })} ></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                        <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"
                            {...register("par_hipertension", { required: false })} ></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                        <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                            {...register("par_cancer", { required: false })} ></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cardiopatia">Parentesco</label>
                        <textarea name="par_cardiopatia" id="par_cardiopatia" className="text-amplio"
                            {...register("par_cardiopatia", { required: false })} ></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="col">
                    <label className='form-check-label etiqueta' htmlFor="otros">Otros</label>
                    <textarea name="otros" id="otros" className="text-amplio"
                        {...register("otros", { required: false })}></textarea>

                </div>
            </div>

        </div >
    )
}