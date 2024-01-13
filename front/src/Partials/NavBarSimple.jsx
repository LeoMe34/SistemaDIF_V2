
export function NavBarSimple() {
    return (
        <nav className="navbar div-header">
            <div className="container-fluid">
                <div className="encabezado">
                    <img src="../Logos/LOGO DIF.jpeg" alt="Logo del DIF" className="img-logos mx-2" />
                    <img src="../Logos/logo-coatza.jpg" alt="Logo del DIF-Coatzacoalcos" className="img-logos mx-2" />
                    <img src="../Logos/LOGO-AYUNTAMIENTO-22-25.webp" alt="Logo del Ayuntamiento de Coatzacoalcos" className="img-logos mx-2" />
                    DIF MUNICIPAL
                </div>
                <div>
                    <i class="icono bi bi-bell-fill  fs-2"></i>
                    <i class="icono bi bi-person-circle fs-2"></i>
                </div>
            </div>
        </nav>
    );
}
