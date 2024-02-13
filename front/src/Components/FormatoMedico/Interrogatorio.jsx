export function Interrogatorio() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Dolor de garganta..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="aparatos_sistemas">Aparatos y sistemas</label>
                        <textarea id="aparatos_sistemas" placeholder="Sistema nervioso..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="auxiliares">Auxiliares de diagnóstico previo</label>
                        <textarea id="auxiliares" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tratamientos_previos">Manejo de tratamiento previos</label>
                        <textarea id="tratamientos_previos" placeholder="Rayos X..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>
            </div>


        </div>
    )
}