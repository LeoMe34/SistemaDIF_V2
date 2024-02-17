
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
export function NotaSubsecuente() {
    return (
        <div>
            <div className='m-2'>
                <CardFichaEnfermeria />
            </div>
            <h3 className='subtitulo'>Nota subsecuente</h3>


            <div className="col">
                <textarea id="habitos" placeholder="Notas subsecuente" className="text-amplio" rows="10" cols="30" />
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta-firma' htmlFor="firma">Firma:</label>
                        <label className='etiqueta-firma' htmlFor="firma">Firma del paciente (Consentimiento):</label>
                    </div>
                </div>
            </div>

        </div>
    )
}