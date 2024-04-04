import { useForm } from "react-hook-form"
import { useEffect } from "react"

export function Interrogatorio({ getInterrogatorioData }) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    useEffect(() => {
        const data = {
            padecimiento: getValues("padecimiento"),
            aparatos_sistemas: getValues("aparatos_sistemas"),
            auxiliares: getValues("auxiliares"),
            tratamientos_previos: getValues("tratamientos_previos")
        }
        getInterrogatorioData(data);
    }, [getValues("padecimiento"), getValues("aparatos_sistemas"), getValues("auxiliares"), getValues("tratamientos_previos")])

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Dolor de garganta..." className="text-amplio" rows="10" cols="30"
                            {...register("padecimiento", { required: true })}
                            onChange={(e) => getInterrogatorioData({ padecimiento: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="aparatos_sistemas">Aparatos y sistemas</label>
                        <textarea id="aparatos_sistemas" placeholder="Sistema nervioso..." className="text-amplio" rows="10" cols="30"
                            {...register("aparatos_sistemas", { required: true })}
                            onChange={(e) => getInterrogatorioData({ aparatos_sistemas: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="auxiliares">Auxiliares de diagnóstico previo</label>
                        <textarea id="auxiliares" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                            {...register("auxiliares", { required: true })}
                            onChange={(e) => getInterrogatorioData({ auxiliares: e.target.value })} />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tratamientos_previos">Manejo de tratamiento previos</label>
                        <textarea id="tratamientos_previos" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30"
                            {...register("tratamientos_previos", { required: true })}
                            onChange={(e) => getInterrogatorioData({ tratamientos_previos: e.target.value })} />
                    </div>
                </div>
            </div>


        </div>
    )
}