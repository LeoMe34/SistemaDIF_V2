import { CardPaciente } from '../Paciente/CardPaciente';
import { NavBarBusqueda } from '../../Partials/NavBarBusqueda';
import { Ginecobstetrico } from '../FormatosCompartidos/Ginecobstetrico';

export function HistoriaClinicaSimplificada() {
    return (
        <div>
            <header>
                <NavBarBusqueda />
            </header>
            <div className='m-2'>
                <CardPaciente />
            </div>

            <div>
                <h3 className='subtitulo'>Historia Clínica Simplificada</h3>

                <div className='ml-10 container'>
                    <div className='row'>
                        <div className='col'>
                            {/*Se podria hacer que desde que incie sesion ponga en que consultorio esta 
                            para que ya no tenga que estar llenandolo */}
                            <label className='etiqueta' htmlFor="num_consultorio">N° consultorio: </label>
                            <input className="entrada" id='num_consultorio' name='num_consultorio' type="text" />
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

                    <Ginecobstetrico/>
                </div>
            </div>
        </div>
    )
}