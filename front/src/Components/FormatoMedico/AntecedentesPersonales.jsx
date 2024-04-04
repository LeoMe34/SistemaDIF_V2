{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntecedentesPersonales({ getPersonalesData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    useEffect(() => {
        const data = {
            alimentacion: getValues("alimentacion"),
            habitacion: getValues("habitacion"),
            higiene: getValues("higiene"),
            medicosQT: getValues("medicosQT"),
            tabaquismoAA: getValues("tabaquismoAA"),
            tendenciaDM: getValues("tendenciaDM"),
            otros: getValues("otros")
        }
        getPersonalesData(data);
    }, [getValues("alimentacion"), getValues("habitacion"), getValues("higiene"), getValues("medicosQT"),
    getValues("tabaquismoAA"), getValues("tendenciaDM"), getValues("otros")])

    return (
        <div>
            <h3 className='subtitulo_2'>Personales no patológicos</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <textarea name="alimentacion" id="alimentacion" className="text-amplio"
                            {...register("alimentacion", { required: true })}
                            onChange={(e) => getPersonalesData({ alimentacion: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habitacion">Habitación</label>
                        <textarea name="habitacion" id="habitacion" className="text-amplio"
                            {...register("habitacion", { required: true })}
                            onChange={(e) => getPersonalesData({ habitacion: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                        <textarea name="higiene" id="higiene" className="text-amplio"
                            {...register("higiene", { getPersonalesData: true })}
                            onChange={(e) => getPersonalesData({ higiene: e.target.value })}></textarea>
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Personales patológicos</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="medicosQT">Médicos,quirúrgicos,transfusiones</label>
                        <textarea name="medicosQT" id="medicosQT" className="text-amplio"
                            {...register("medicosQT", { required: true })}
                            onChange={(e) => getPersonalesData({ medicosQT: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tabaquismoAA">Tabaquismo,alcoholismo,alérgicos</label>
                        <textarea name="tabaquismoAA" id="tabaquismoAA" className="text-amplio"
                            {...register("tabaquismoAA", { required: true })}
                            onChange={(e) => getPersonalesData({ tabaquismoAA: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tendenciaDM">Tendencia a drogas,medicamentos</label>
                        <textarea name="tendenciaDM" id="tendenciaDM" className="text-amplio"
                            {...register("tendenciaDM", { required: true })}
                            onChange={(e) => getPersonalesData({ tendenciaDM: e.target.value })}></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="otros">Otros</label>
                        <textarea name="otros" id="otros" className="text-amplio"
                            {...register("otros", { required: false })}
                            onChange={(e) => getPersonalesData({ otros: e.target.value })}></textarea>
                    </div>
                </div>
            </div>

        </div >
    )
}