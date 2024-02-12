
export function Ginecobstetrico() {
    return (
        <div>
            <h3 className='subtitulo_2'>Datos ginecobstetricos</h3>

            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="menarca">Menarca: </label>
                        <input className="entrada" id='menarca' name='menarca' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="vida_sexual">Inicio de vida sexual activa: </label>
                        <input className="entrada" id='vida_sexual' name='vida_sexual' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="menstruacion">Ultima menstruación</label>
                        <input className="entrada" id='menstruacion' name='menstruacion' type="text" />
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Embarazos</h3>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="num_embarazos">N° embarazos: </label>
                        <input className="entrada" id='num_embarazos' name='num_embarazos' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="partos">Partos:</label>
                        <input className="entrada" id='partos' name='partos' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="abortos">Abortos</label>
                        <input className="entrada" id='abortos' name='abortos' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="cesarea">Cesareas</label>
                        <input className="entrada" id='cesarea' name='cesarea' type="text" />
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Partos</h3>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="ultimo_parto">Fecha de ultimo parto: </label>
                        <input className="entrada" id='ultimo_parto' name='ultimo_parto' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="partos">N° de hijos:</label>
                        <input className="entrada" id='partos' name='partos' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="macrosomicos">Macrosomicos vivos</label>
                        <input className="entrada" id='macrosomicos' name='macrosomicos' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="bajo_peso">Bajo peso al nacer</label>
                        <input className="entrada" id='bajo_peso' name='bajo_peso' type="text" />
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Parejas</h3>
            <div className='mt-3 container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="num_parejas">N° de parejas</label>
                        <input className="entrada" id='num_parejas' name='num_parejas' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="heterosexuales">Heterosexuales:</label>
                        <input className="entrada" id='heterosexuales' name='heterosexuales' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="homosexuales">Homosexuales</label>
                        <input className="entrada" id='homosexuales' name='homosexuales' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="bisexuales">Bisexuales</label>
                        <input className="entrada" id='bisexuales' name='bisexuales' type="text" />
                    </div>
                </div>
            </div>

            <h3 className='subtitulo_2'>Método de planificación familiar</h3>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="diu">DIU</label>
                        <input className="entrada" id='diu' name='diu' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="hormonales">Hormonales</label>
                        <input className="entrada" id='hormonales' name='hormonales' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="quirurgico">Quirurgico</label>
                        <input className="entrada" id='quirurgico' name='quirurgico' type="text" />
                    </div>
                    <div className='col'>
                        <label className='etiqueta' htmlFor="bisexuales">Otros</label>
                        <input className="entrada" id='bisexuales' name='bisexuales' type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}