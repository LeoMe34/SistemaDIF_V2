import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function AntPersoPato({ getAntNoPersoPatData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    useEffect(() => {
        const data = {
            vacuna: getValues("vacuna"),
            alimentacion: getValues("alimentacion"),
            fauna_nociva: getValues("fauna_nociva"),
            vivienda: getValues("vivienda"),
            adicciones: getValues("adicciones")
        }
        getAntNoPersoPatData(data);
    }, [getValues("vacuna"), getValues("alimentacion"), getValues("fauna_nociva"), getValues("vivienda"), getValues("adicciones")])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="vacuna">Vacunas</label>
                        <input id="vacuna" type="text" placeholder="Vacunas aplicadas" className="entrada"
                            {...register("vacuna", { required: true })}
                            onChange={(e) => getAntNoPersoPatData({ vacuna: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <input id="alimentacion" type="text" placeholder="Alimentación" className="entrada"
                            {...register("alimentacion", { required: true })}
                            onChange={(e) => getAntNoPersoPatData({ alimentacion: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                        <input id="fauna" type="text" placeholder="Fauna nociva" className="entrada"
                            {...register("fauna_nociva", { required: true })}
                            onChange={(e) => getAntNoPersoPatData({ fauna_nociva: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                        <input id="vivienda" type="text" placeholder="Vivivenda" className="entrada"
                            {...register("vivienda", { required: true })}
                            onChange={(e) => getAntNoPersoPatData({ vivienda: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="higiene">Adicciones</label>
                        <input id="adicc" type="text" placeholder="Adicciones" className="entrada"
                            {...register("adicciones", { required: true })}
                            onChange={(e) => getAntNoPersoPatData({ adicciones: e.target.value })} />
                    </div>

                </div>
            </div>
        </div>
    )
}