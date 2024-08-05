import BusquedaPaciente from "../Paciente/BuscarPaciente"
import { TablaPacienteGral } from "../Paciente/TablaPacienteGral"

export function HomeRecepcionGral() {
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <a href="/home_recepcion_medica">
                            <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        </a>
                    </ol>
                </nav>
            </div>
            <BusquedaPaciente isHomePage={true} />

            <TablaPacienteGral></TablaPacienteGral>
        </div>
    )
}