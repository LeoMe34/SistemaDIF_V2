import { TablaUsuarios } from "../Empleado/TablaUsuarios"
import BuscarUsuario from "../Empleado/BuscarUsuario"
export function HomeAdmin() {
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <a href="\home_administrador">
                            <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        </a>
                    </ol>
                </nav>
            </div>

            <BuscarUsuario></BuscarUsuario>
            <TablaUsuarios></TablaUsuarios>
        </div>
    )
}