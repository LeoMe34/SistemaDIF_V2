{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntecedentesPersonales({ getPersonalesData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    const getDatos = () => {
        const personalesData = {
            alimentacion: getValues("alimentacion"),
            habitacion: getValues("habitacion"),
            higiene: getValues("higiene"),
            medicosQT: getValues("medicosQT"),
            tabaquismoAA: getValues("tabaquismoAA"),
            tendenciaDM: getValues("tendenciaDM"),
            otros: getValues("otros")         
        }
        return personalesData
    }

    useEffect(() => {
        const data = getDatos();
        getPersonalesData(data);
    }, [getValues])

    return (
        <div>
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
                            {...register("higiene", { required: true })}></textarea>
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
                        <label className="etiqueta" htmlFor="otros">Otros</label>
                        <textarea name="otros" id="otros" className="text-amplio"
                        {...register("otros", { required: false })}></textarea>
                    </div>
                </div>
            </div>

        </div >
    )
}