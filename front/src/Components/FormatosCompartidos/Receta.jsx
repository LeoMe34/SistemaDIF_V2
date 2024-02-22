
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
export function Receta() {
    return (
        <div>
            <div className='m-2'>
                <h3 className="subtitulo">Receta medica</h3>
            </div>

            <div className="ml-10 container">
                <CardFichaEnfermeria />
            </div>

            <div className="ml-10 mb-3 col">
                <label className="etiqueta" htmlFor="tratamiento">Tratamiento</label>
                <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="10" cols="30" />
            </div>
            <div className='ml-10 mb-2 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                    </div>
                </div>
            </div>

            <div className="mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div>
    )
}