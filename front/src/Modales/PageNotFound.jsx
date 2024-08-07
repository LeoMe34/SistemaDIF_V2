export function PageNotFound() {
    const cardStyle = {
        height: '500px',  // Ajusta la altura según tus necesidades
    };

    return (
        <section className="vh-100" style={{ background: '#812A71' }}>
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={cardStyle}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="../Logos/LOGO DIF.jpeg " alt="login form"
                                        className="img-fluid" style={{
                                            marginTop: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block',
                                        }} />
                                </div>

                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5">
                                    <h1 className="titulo_2 ">Oops!</h1>
                                        <h1 className="titulo_3 ">No tienes permiso para esta página o no existe</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
