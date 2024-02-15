
export function AntPersoPato() {
    return (
        <div>

            <div className="ml-101">
                <form>

                    <h3 className="subtitulo">Antecedentes Personales No Patologicos</h3>

                    <div className="col">
                        <label className="etiqueta" htmlFor="vacuna">Vacunas</label>
                        <input id="vacuna" type="text" placeholder="Vacunas aplicadas" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <input id="alimentacion" type="text" placeholder="Alimentación" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                        <input id="fauna" type="text" placeholder="Fauna nociva" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                        <input id="vivienda" type="text" placeholder="Vivivenda" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                        <input id="higiene" type="text" placeholder="Higiene del paciente" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="habi">Habitación</label>
                        <input id="habi" type="text" placeholder="Habitación" className="entrada"
                        />
                    </div>
                    {/*Seccion del boton*/}
                    <div className="text-center">
                        <button type="submit" className="btn-guardar mx-2">
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}