
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntPPatologicos({ getAntPaPersoData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    useEffect(() => {
        const data = {
            diabetes: getValues("diabetes"),
            hipert: getValues("hipert"),
            tuberculo: getValues("tuberculo"),
            cancer: getValues("cancer"),
            transfusion: getValues("transfusion"),
            quirurgicos: getValues("quirurgicos"),
            anestesicos: getValues("anestesicos"),
            alergicos: getValues("alergicos"),
            trauma: getValues("trauma")
        }
        getAntPaPersoData(data);
    }, [getValues("diabetes"), getValues("hipert"), getValues("tuberculo"), getValues("cancer"), getValues("transfusion"),
    getValues("quirurgicos"), getValues("anestesicos"), getValues("alergicos"), getValues("trauma")])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones"
                            {...register("diabetes", { required: true })}
                            onChange={(e) => getAntPaPersoData({ diabetes: e.target.value })} >
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones"
                            {...register("hipert", { required: true })}
                            onChange={(e) => getAntPaPersoData({ hipert: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones"
                            {...register("cancer", { required: true })}
                            onChange={(e) => getAntPaPersoData({ cancer: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                        <select name="tubercolosis" id="tubercolosis" className="opciones"
                            {...register("tuberculo", { required: true })}
                            onChange={(e) => getAntPaPersoData({ tuberculo: e.target.value })}>
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
                        <label className="etiqueta" htmlFor="transfusiones">Transfusiones</label>
                        <select name="transfusiones" id="transfusiones" className="opciones"
                            {...register("transfusion", { required: true })}
                            onChange={(e) => getAntPaPersoData({ transfusion: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="quirurgicos">Quirurgicos</label>
                        <select name="quirurgicos" id="quirurgicos" className="opciones"
                            {...register("quirurgicos", { required: true })}
                            onChange={(e) => getAntPaPersoData({ quirurgicos: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                        <select name="anestesicos" id="anestesicos" className="opciones"
                            {...register("anestesicos", { required: true })}
                            onChange={(e) => getAntPaPersoData({ anestesicos: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                        <select name="alergicos" id="alergicos" className="opciones"
                            {...register("alergicos", { required: true })}
                            onChange={(e) => getAntPaPersoData({ alergicos: e.target.value })}>
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
                        <label className="etiqueta" htmlFor="traumaticoss">Traumaticos</label>
                        <select name="traumaticos" id="traumaticos" className="opciones"
                            {...register("trauma", { required: true })}
                            onChange={(e) => getAntPaPersoData({ trauma: e.target.value })}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}