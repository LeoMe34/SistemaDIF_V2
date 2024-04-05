{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { MenuNave } from "../MenuNav/MenuNave"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntHerediPat({ getAntPaHerediData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    useEffect(() => {
        const data = {
            diabetesH: getValues("diabetesH"),
            hipertH: getValues("hipertH"),
            tuberculoH: getValues("tuberculoH"),
            cancerH: getValues("cancerH"),
            cardioH: getValues("cardioH"),
            asmaH: getValues("asmaH"),
            epilepsiaH: getValues("epilepsiaH"),
            diabetes_parentesco: getValues("diabetes_parentesco"),
            hipert_parentesco: getValues("hipert_parentesco"),
            tuberculo_parentesco: getValues("tuberculo_parentesco"),
            cancer_parentesco: getValues("cancer_parentesco"),
            cardio_parentesco: getValues("cardio_parentesco"),
            asma_parentesco: getValues("asma_parentesco"),
            epilepsia_parentesco: getValues("epilepsia_parentesco"),
        }
        getAntPaHerediData(data);
    }, [getValues("diabetesH"), getValues("hipertH"), getValues("tuberculoH"), getValues("cancerH"), getValues("cardioH"),
    getValues("asmaH"), getValues("epilepsiaH"), getValues("diabetes_parentesco"), getValues("hipert_parentesco"),
    getValues("tuberculo_parentesco"), getValues("cancer_parentesco"), getValues("cardio_parentesco"), getValues("asma_parentesco"),
    getValues("epilepsia_parentesco")])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones" type=""
                            {...register("diabetesH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ diabetesH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones" type=""
                            {...register("hipertH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ hipertH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones" type=""
                            {...register("cancerH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ cancerH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                        <select name="tubercolosis" id="tubercolosis" className="opciones" type=""
                            {...register("tuberculoH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ tuberculoH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                        <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"
                            {...register("diabetes_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ diabetes_parentesco: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                        <textarea name="hipert_parentesco" id="par_hipertension" className="text-amplio"
                            {...register("hipert_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ hipert_parentesco: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                        <textarea name="par_cancer" id="par_cancer" className="text-amplio"
                            {...register("cancer_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ cancer_parentesco: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco</label>
                        <textarea name="par_tubercolosis" id="par_tubercolosis" className="text-amplio"
                            {...register("tuberculo_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ tuberculo_parentesco: e.target.value })}></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="asma">Asma</label>
                        <select name="asma" id="asma" className="opciones" type=""
                            {...register("asmaH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ asmaH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares</label>
                        <select name="cardiovascular" id="cardiovascular" className="opciones" type=""
                            {...register("cardioH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ cardioH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="epilepsia">Epilepsia</label>
                        <select name="epilepsia" id="epilepsia" className="opciones" type=""
                            {...register("epilepsiaH", { required: true })}
                            onChange={(e) => getAntPaHerediData({ epilepsiaH: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_asma">Parentesco</label>
                        <textarea name="par_asma" id="par_asma" className="text-amplio"
                            {...register("asma_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ asma_parentesco: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco</label>
                        <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"
                            {...register("cardio_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ cardio_parentesco: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_epilepsia">Parentesco</label>
                        <textarea name="par_epilepsia" id="par_epilepsia" className="text-amplio"
                            {...register("epilepsia_parentesco", { required: true })}
                            onChange={(e) => getAntPaHerediData({ epilepsia_parentesco: e.target.value })}></textarea>
                    </div>
                </div>
            </div>

        </div >
    )
}