export function Usuario() {
    return (
        <div className='container'>
            <h2 className="subtitulo">Perfil de usuario</h2>
            <div className="card-user">
                <div className="img">
                    <img src="../Logos/LOGO DIF.jpeg" alt="Logo del DIF" className="img-logos mx-2" />

                </div>
                <div className="content">
                    <h2>Nombre del empleado</h2>
                    <p>posición en el DIF</p>
                    <div className="center container">
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="medico">Cédula profesional:</label>
                            <input className="entrada" id='medico' name='medico' type="text" readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="medico">Número profesional:</label>
                            <input className="entrada" id='medico' name='medico' type="text" readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="medico">Área:</label>
                            <input className="entrada" id='medico' name='medico' type="text" readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="medico">Rol:</label>
                            <input className="entrada" id='medico' name='medico' type="text" readOnly />
                        </div>
                        <div className="col">
                            <label className='etiqueta-user' htmlFor="medico">Correo electronico:</label>
                            <input className="entrada" id='medico' name='medico' type="text" readOnly />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}