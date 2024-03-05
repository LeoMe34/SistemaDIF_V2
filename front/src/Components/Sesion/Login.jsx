import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"


export function Login() {
    const [usuario, setUsuario] = useState([])
    const [contrasenia, setContrasenia] = useState('')
    const navegador = useNavigate()

    const iniciarSesion = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/login/"
            const resultado = await axios.post(url, {
                username: usuario,
                password: contrasenia
            })

            setUsuario(resultado.data)
            navegador("/home_enfermeria")
            console.log("Usuario logueado correctamente")
        } catch (error) {
            console.error("Ocurrio un error", error)
        }

    }

    return (
        <section className="vh-100" style={{ background: '#812A71' }}>
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" >
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="../Logos/LOGO DIF.jpeg " alt="login form"
                                        className="img-fluid" style={{
                                            marginTop: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block',
                                        }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 Titulo mb-0">Desarrollo Integral de la Familia</span>
                                            </div>

                                            <h5 className="etiquetas mb-2 pb-3" style={{ letterSpacing: '1px' }}>Iniciar sesión</h5>

                                            <div className="form-outline mb-3">
                                                <input type="no_trabajador" id="no_trabajador" className="form-control form-control-lg entrada"
                                                    placeholder="MRR009" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                                                <label className="form-label etiquetas" htmlFor="form2Example17">Número de trabajador</label>
                                            </div>

                                            <div className="form-outline mb-3">
                                                <div className="input-group">
                                                    <input type="password" id="contrasenia" className="form-control form-control-lg entrada"
                                                        placeholder="********" value={contrasenia} autoComplete="new-password"
                                                        onChange={(e) => setContrasenia(e.target.value)} />
                                                </div>
                                                <label className="form-label etiquetas" htmlFor="contrasenia">Contraseña</label>
                                            </div>

                                            {/*Editar el botón */}
                                            <div className="pt-1 mb-3">
                                                <button className="btn btn-guardar btn-lg btn-block" onClick={iniciarSesion}>Entrar</button>
                                            </div>
                                            <a className=" etiquetas text-muted" href="#!" style={{ display: 'block' }}>¿Olvidaste tu contraseña?</a>

                                            <a href="#!" className=" small etiquetas text-muted" style={{ display: 'block' }}>Terminos y condiciones </a>
                                            <a href="#!" className=" small etiquetas text-muted" style={{ display: 'block' }}>Política de privacidad</a>
                                        </form>

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