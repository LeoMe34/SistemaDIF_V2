{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { CardPaciente } from "../Paciente/CardPaciente"
export function FichaTecnicaMedico() {

    return (
        <div>
            {/*<header>
                <NavBarSimple />
    </header>*/}
            <div className='m-2'>
                <h3 className="subtitulo">Ficha técnica de consulta médica</h3>
                {/*Nutricion, medicina, odontologo */}

            </div>

            <div className="ml-10 container">
                <div className="ml-10">
                    <CardPaciente />
                </div>

                <form>
                    <div className='row'>
                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="peso">Peso: </label>
                            <input className="entrada" id='peso' name='peso' type="text" />

                            <label className='mt-2 etiqueta' htmlFor="correo">Correo electrónico: </label>
                            <input className="entrada" id='correo' name='correo' type="text" />
                        </div>

                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="talla">Talla: </label>
                            <input className="entrada" id='talla' name='talla' type="text" />

                            <label className='mt-2 etiqueta' htmlFor="profesion">Profesión: </label>
                            <input className="entrada" id='profesion' name='profesion' type="text" />
                        </div>

                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="lugar_nacimiento">Lugar de nacimiento: </label>
                            <input className="entrada" id='lugar_nacimiento' name='lugar_nacimiento' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivoCons">Motivo de consulta</label>
                            <textarea id="motivoCons" placeholder="Motivo" className="text-amplio" rows="10" cols="30" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="diagMedi">Diagnostico medico</label>
                            <textarea id="diagMedi" placeholder="Diagnostico" className="text-amplio" rows="10" cols="30" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="observacion">Observación</label>
                            <textarea id="observacion" placeholder="Observaciones" className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <label className="mt-3 etiqueta" htmlFor="medico">Médico responsable</label>
                    <input className="datos_lectura" id='medico' name='medico' type="text" readOnly />

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
