
export function AntPersoPato() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="vacuna">Vacunas</label>
                        <input id="vacuna" type="text" placeholder="Vacunas aplicadas" className="entrada"
                        />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <input id="alimentacion" type="text" placeholder="Alimentación" className="entrada"
                        />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                        <input id="fauna" type="text" placeholder="Fauna nociva" className="entrada"
                        />
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                        <input id="vivienda" type="text" placeholder="Vivivenda" className="entrada"
                        />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                        <input id="higiene" type="text" placeholder="Higiene del paciente" className="entrada"
                        />
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habi">Habitación</label>
                        <input id="habi" type="text" placeholder="Habitación" className="entrada"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}