
export function ExploracionFisica() {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="inspeccion_gral">Inspección general:</label>
                        <textarea id="inspeccion_gral" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="cabeza">Cabeza:</label>
                        <textarea id="cabeza" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="cuello">Cuello:</label>
                        <textarea id="cuello" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="torax">Tórax:</label>
                        <textarea id="torax" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="abdomen">Abdomen:</label>
                        <textarea id="abdomen" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="columna_vertical">Columna vertical:</label>
                        <textarea id="columna_vertical" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="genitales_externos">Genitales externos:</label>
                        <textarea id="genitales_externos" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="extremidades">Extremidades:</label>
                        <textarea id="extremidades" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>

            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="diagnostico">Diagnóstico:</label>
                        <textarea id="diagnostico" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="tratamiento_integral">Tratamiento y manejo integral:</label>
                        <textarea id="tratamiento_integral" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="pronostico">Pronostico:</label>
                        <textarea id="pronostico" placeholder="..." className="text-amplio" rows="10" cols="30" />
                    </div>
                </div>                

            </div>
        </div>
    )
}