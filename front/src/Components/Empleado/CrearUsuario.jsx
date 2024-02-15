{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
export function CrearUsuario() {
    return (
        <div>
            {/*<NavBarSimple />*/}
            <div className="ml-10 container mt-3">
                <form>
                    <h3 className="titulo">Registrar usuario</h3>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="noTrabajador">Número de trabajador</label>
                            <input id="noTrabajador" type="text" placeholder="No. de trabajador" className="entrada" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="usuario">Usuario</label>
                            <input id="usuario" type="text" className="entrada" readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="email">Correo electrónico</label>
                            <input id="email" type="text" placeholder="Correo electrónico" className="entrada" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-2 mb-2 col'>
                            <label className="etiqueta" htmlFor="contrasenia">Contraseña</label>
                            <input id="contrasenia" type="password" placeholder="Contraseña" className="entrada" />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn-guardar mt-5 mb-4">
                            Guardar
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}