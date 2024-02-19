import { CardPaciente } from "../Paciente/CardPaciente"

export function NotaEvolucion() {
    return (
        <div>
            <div className='ml-10 container'>
                <CardPaciente />
            </div>
            <h2 className='subtitulo'>Nota Evolución</h2>
            <div className="ml-10 col">
                <textarea id="habitos" placeholder="Notas" className="text-amplio" rows="10" cols="30" />
            </div>
            <div className="ml-10 col">
                <label className="etiqueta" htmlFor="diagnostico">Diagnostico</label>
                <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="10" cols="30" />
            </div>
            <div className="ml-10 col">
                <label className="etiqueta" htmlFor="tratamiento">Tratamiento</label>
                <textarea id="tratamiento" type="text" placeholder="tratamiento" className="entrada" rows="10" cols="30" />
            </div>

            <div className='ml-10 mb-5 container'>
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
        </div>
    )
}