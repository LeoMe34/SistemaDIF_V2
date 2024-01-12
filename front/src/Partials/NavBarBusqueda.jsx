export function NavBarBusqueda() {
    return (
        <nav className="navbar div-header">
            <div className="container-fluid">
                <div className="encabezado">
                    <img src="../Logos/LOGO DIF.jpeg" alt="Logo del DIF" className="img-logos mx-2" />
                    <img src="../Logos/logo-coatza.jpg" alt="Logo del DIF-Coatzacoalcos" className="img-logos mx-2" />
                    <img src="../Logos/LOGO-AYUNTAMIENTO-22-25.webp" alt="Logo del Ayuntamiento de Coatzacoalcos" className="img-logos mx-2" />
                    DIF MUNICIPAL
                </div>

                <form className="d-flex" role="search">
                    <input className="buscador me-2" type="search" placeholder="Buscar" style={{ minWidth: '300px' }} />
                    <button className="btn-buscar" type="submit">Buscar</button>
                </form>
            </div>
        </nav>


    )
}