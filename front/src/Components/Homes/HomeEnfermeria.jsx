import BusquedaPaciente from "../Paciente/BuscarPaciente"

export function HomeEnfermeria() {    
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        <BusquedaPaciente></BusquedaPaciente>
                    </ol>
                </nav>
            </div>
        </div>
    )
}