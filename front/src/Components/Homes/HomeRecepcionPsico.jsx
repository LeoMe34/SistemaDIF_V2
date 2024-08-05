import { TablaPacientePsico } from "../Paciente/TablaPacientePsico"
import BuscarPacientePsico from "../Paciente/BuscarPacientePsico"
export function HomeRecepcionPsico() {
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <a href="/home_recepcion_psicologia">
                            <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        </a>
                    </ol>
                </nav>
            </div>

            <BuscarPacientePsico isHomePage={true}></BuscarPacientePsico>

            <TablaPacientePsico></TablaPacientePsico>
        </div>
    )
}