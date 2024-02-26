import { CardPaciente } from '../Paciente/CardPaciente';
import { Ginecobstetrico } from '../FormatosCompartidos/Ginecobstetrico';
import { Interrogatorio } from './Interrogatorio';
import { ExploracionFisica } from './ExploracionFisica';
import { CardFichaEnfermeria } from '../FormatoEnfermeria/CardFichaEnfermeria';
export function HistoriaClinicaSimplificada() {
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_medico">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\ficha_tecnica_medico">
                                Ficha técnica de consulta médica
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historia Clínica Simplificada</li>
                    </ol>
                </nav>
            </div>

            <div>
                <h3 className='subtitulo'>Historia Clínica Simplificada</h3>

                <div className='ml-10 container'>
                    <div className='ml-10 mb-3'>
                        <CardPaciente />
                    </div>
                    <div className='row'>
                        <div className='col'>
                            {/*Se podria hacer que desde que incie sesion ponga en que consultorio esta 
                            para que ya no tenga que estar llenandolo */}
                            <label className='etiqueta' htmlFor="num_consultorio">N° consultorio: </label>
                            <input className="entrada" id='num_consultorio' name='num_consultorio' type="text" />
                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                            <input className="entrada" id='fecha' name='fecha' type="date" readOnly />
                        </div>
                    </div>
                </div>

                <div className='ml-10 container'>
                    <h4 className='subtitulo_2'> Información familiar</h4>
                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="tipo_familia">Tipo de familia: </label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='nuclear' name='nuclear' />
                                <label className='form-check-label etiqueta' htmlFor="nuclear">Nuclear</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='extensa' name='extensa' />
                                <label className='form-check-label etiqueta' htmlFor="extensa">Extensa</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='compuesta' name='compuesta' />
                                <label className='form-check-label etiqueta' htmlFor="compuesta">Compuesta</label>
                            </div>

                        </div>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="rol_madre">Rol de madre: </label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='e_m' name='e_m' />
                                <label className='form-check-label etiqueta' htmlFor="e_m">E-M</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='e_c' name='e_c' />
                                <label className='form-check-label etiqueta' htmlFor="e_c">E-C</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input caja_opciones" type="checkbox" id='e_sd' name='e_sd' />
                                <label className='form-check-label etiqueta' htmlFor="e_sd">E-SD</label>
                            </div>
                        </div>
                    </div>

                    <h4 className='subtitulo_2'>Familiar responsable del paciente </h4>

                    <div className='row'>
                        <div className='col'>
                            <label className='etiqueta' htmlFor="familia">Familia:</label>
                            <select className="opciones" id='tipo_familia' name='familia' type="">
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">1</option>
                                <option value="d">D</option>
                            </select>
                        </div>

                        <div className='col'>
                            <label className='etiqueta' htmlFor="familia">Disfuncionales familiares:</label>
                            <select className="opciones" id='tipo_familia' name='familia' type="">
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className='ml-10 container'>
                    <h3 className='subtitulo'>Antecedentes</h3>

                    <Ginecobstetrico />
                </div>

                <div className='ml-10 container'>
                    <h3 className='subtitulo'>Interrogatorio</h3>

                    <Interrogatorio />
                </div>

                <div className='ml-10 container'>
                    <h3 className="subtitulo">Exploración física</h3>
                    <CardFichaEnfermeria />
                    <ExploracionFisica />
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
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}