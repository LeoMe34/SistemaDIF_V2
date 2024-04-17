import { TablaEnfermeria } from "../FormatoEnfermeria/TablaEnfermeria"

export function HomeEnfermeria() {
    return (
        <div>
            <div className="mt-3 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb ml-10">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                    </ol>
                </nav>
            </div>

            <TablaEnfermeria></TablaEnfermeria>

        </div>
    )
}