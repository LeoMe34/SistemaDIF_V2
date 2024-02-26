import { CardFichaEnfermeria } from "../FormatoEnfermeria/CardFichaEnfermeria"

export function NotaEvolucion() {
    return (
        <div>
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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Nota Evolución</li>
                    </ol>
                </nav>
            </div>

            <h2 className='subtitulo'>Nota Evolución</h2>

            <div className='ml-10 mt-3 mb-3 container'>
                <CardFichaEnfermeria />
            </div>
            <div className="container">
                <div className="col">
                <label className="etiqueta mb-2" htmlFor="notas">Notas: </label>
                    <textarea id="notas" placeholder="Notas" className="text-amplio" rows="5" />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="diagnostico">Diagnóstico:</label>
                    <textarea id="diagnostico" type="text" placeholder="diagnostico" className="entrada" rows="5" />
                </div>
                <div className="mt-2 col">
                    <label className="etiqueta mb-2" htmlFor="tratamiento">Tratamiento:</label>
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