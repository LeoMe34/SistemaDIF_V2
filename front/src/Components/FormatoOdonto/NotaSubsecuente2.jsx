
import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"
export function NotaSubsecuente2() {
    return (
        <div>
            {/*Este debe cambiar sus migas */}
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_odontologo">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\antecedente">
                                Antecedentes
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\hist_dent">
                                Historial clinico dental
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\nota_evo">
                                Nota Evolución
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Nota subsecuente</li>
                    </ol>
                </nav>
            </div>

            <h3 className='subtitulo'>Nota subsecuente</h3>

            <div className='ml-10 mb-3 container'>
                <CardFichaEnfermeria />
            </div>

            <div className="ml-10 mb-3 col">
                <label htmlFor="descripcion" className="etiqueta mb-2">Descripción:</label>
                <textarea id="descripcion" placeholder="Notas subsecuente" className="text-amplio" rows="10" cols="30" />
            </div>

            <div className='ml-10 mb-2 container'>
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

            <div className="mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div>
    )
}