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
                    <div className="input-group buscador">                        
                        <input type="text" className="form-control" placeholder="Ingrese el nombre o número de expediente" aria-label="Input group example" aria-describedby="basic-addon1" />
                        <button className="input-group-text btn-buscar" id="basic-addon1">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>

                    {/*<input className="buscador me-2" type="search" placeholder="Ingrese el nombre o número de expediente" style={{ minWidth: '400px' }} />
                    <button type="submit" class="btn btn-buscar">
                        <i class="bi bi-search"></i>
                    </button>
                    <button className="btn-buscar" type="submit">Buscar</button>*/}
                </form>

            </div>
        </nav>


    )
}