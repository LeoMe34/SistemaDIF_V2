{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }

export function AntecedentesPersonales() {

    return (
        <div>
            <h3 className='subtitulo_2'>Personales no patológicos</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <textarea name="alimentacion" id="alimentacion" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habitacion">Habitación</label>
                        <textarea name="habitacion" id="habitacion" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                        <textarea name="higiene" id="higiene" className="text-amplio"></textarea>
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Personales patológicos</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="medicosQT">Médicos,quirúrgicos,transfusiones</label>
                        <textarea name="medicosQT" id="medicosQT" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tabaquismoAA">Tabaquismo,alcoholismo,alérgicos</label>
                        <textarea name="tabaquismoAA" id="tabaquismoAA" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tendenciaDM">Tendencia a drogas,medicamentos</label>
                        <textarea name="tendenciaDM" id="tendenciaDM" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="otros">Otros</label>
                        <textarea name="otros" id="otros" className="text-amplio"></textarea>
                    </div>
                </div>
            </div>

        </div >
    )
}