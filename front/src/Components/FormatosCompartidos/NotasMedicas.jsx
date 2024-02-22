import { CardPaciente } from "../Paciente/CardPaciente"
import { NavBarSimple } from "../../Partials/NavBarSimple"
export function NotasMedicas() {
    return (
        <div>
            <header>
<<<<<<< HEAD
                <NavBarSimple />
=======
                <NavBarSimple/>
>>>>>>> e20854e26730605aecd55f0a552a082b4e2f3de5
            </header>
            <h3 className='subtitulo'>Notas médicas</h3>
            <CardPaciente />
            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="fecha">Fecha:</label>
<<<<<<< HEAD
                        <input className="entrada" id='fecha' name='fecha' type="date" readOnly />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="hora">Hora:</label>
                        <input className="entrada" id='hora' name='hora' type="time" readOnly />
=======
                        <input className="entrada" id='fecha' name='fecha' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="hora">Hora:</label>
                        <input className="entrada" id='hora' name='hora' type="text" />
>>>>>>> e20854e26730605aecd55f0a552a082b4e2f3de5
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="servicio">Servicio:</label>
                        <input className="entrada" id='servicio' name='servicio' type="text" />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="anotacion">Anotación del médico:</label>
                        <textarea id="anotacion" placeholder="..." className="text-amplio" rows="5" cols="10" />
                    </div>
                </div>
            </div>

            <div className='ml-10 mb-5 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="medico">Médico:</label>
                        <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />
                        <label className='etiqueta' htmlFor="cedula">Cédula:</label>
                        <input className="datos_lectura" id='cedula' name='cedula' type="text" readOnly />
                        <label className='etiqueta' htmlFor="firma">Firma:</label>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button type="submit" className="btn-guardar mx-2">
                    Guardar
                </button>
            </div>
        </div>
    )
}