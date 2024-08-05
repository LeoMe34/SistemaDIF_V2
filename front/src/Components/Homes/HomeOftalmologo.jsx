import { TablaOftalmologo } from "../FormatoOftalmologo/TablaOftalmologo"
export function HomeOftalmologo() {
    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <i className="bi bi-house-fill color-icono"></i>&nbsp;
                        <a href="/home_oftalmologo">
                            <li className="breadcrumb-item active pag-actual" aria-current="page">Home</li>
                        </a>
                    </ol>
                </nav>
            </div>
            <TablaOftalmologo></TablaOftalmologo>
        </div>
    )
}