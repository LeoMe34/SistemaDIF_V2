import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"

export function NotaEvolucion() {
    return (
        <div>
            <h2 className='subtitulo'>Nota Evolución</h2>

            <div className='ml-10 mt-3 mb-3 container'>
                <CardFichaEnfermeria />
            </div>
            <div className='row'>
                <div className='col'>
                    <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                    <input className="entrada" id='fecha' name='fecha' type="date" readOnly />
                </div>
                <div className='col'>
                    <label className='etiqueta' htmlFor="hora">Hora:</label>
                    <input className="entrada" id='hora' name='hora' type="time" readOnly />
                </div>
            </div>

            <div className="mt-2 container">
                <div className="col">
                    <textarea id="habitos" placeholder="Notas" className="text-amplio" rows="5" />
                </div>

                <div className="mt-2 col">
                    <label className="etiqueta" htmlFor="diagnostico">Diagnostico</label>
                    <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5" />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta" htmlFor="tratamiento">Tratamiento</label>
                    <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="5" />
                </div>
            </div>


            <div className='mt-2 mb-2 container'>
                <div className='col'>
                    <label className='etiqueta' htmlFor="medico">Médico:</label>
                    <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                    <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                    <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                    <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                </div>
            </div>

            <div className="mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div>
    )

}