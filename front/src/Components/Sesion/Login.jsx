import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';
import { showLoading } from '../../Modales/ModalLoading'


export function Login() {
    const [usuario, setUsuario] = useState([])
    const [contrasenia, setContrasenia] = useState('')
    const navegador = useNavigate()
    const { login } = useAuth()
    const [userGroup, setUserGroup] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const getIdUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const is_super = response.data.user_info.is_superuser;
                if (is_super) {
                    navegador('/home_administrador');
                } else {
                    const group_usuario = response.data.user_info.name;
                    setUserGroup(group_usuario);
                    const route = userRoutes[group_usuario];
                    if (route) {
                        navegador(route);
                    }
                }
                console.log(response);
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();
    }, [token, navegador]);

    const userRoutes = {
        'Enfermero': '/home_enfermeria',
        'Odontologo': '/home_odontologo',
        'Medico': '/home_medico',
        'Psicologo': '/home_psicologia',
        'Nutriologo': '/home_nutricion',
        'Recepcion': '/home_recepcion_medica',
        'RecepcionPsico': '/home_recepcion_psicologia'
    }
    /*
        const homes = () => {
    
            const route = userRoutes[userGroup];
            if (idUser && userGroup === null) {
                navegador('/home_administrador')
            }
            else if (route) {
                navegador(route)
            }
        }
    */
    const iniciarSesion = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/login/"
            const respuesta = await axios.post(url, {
                username: usuario,
                password: contrasenia
            })
            const token = respuesta.data.token

            if (token) {
                console.log('Usuario logueado correctamente');
                login(token);
            } else {
                console.error("La respuesta del servidor no contiene el token");
            }
        } catch (error) {
            console.error("Ocurrió un error", error);
            if (error.response) {
                console.error('Código de estado:', error.response.status);
                console.error('Respuesta del servidor:', error.response.data);

                // Mostrar un mensaje de error al usuario
                if (error.response.data && error.response.data.non_field_errors) {
                    alert(error.response.data.non_field_errors[0]);
                } else {
                    alert('Error en la autenticación. Por favor, verifica tus credenciales.');
                }
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor');
            } else {
                console.error('Error de configuración de la solicitud:', error.message);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await iniciarSesion()
        showLoading()
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

                                        <form onSubmit={handleSubmit}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 Titulo mb-0">Desarrollo Integral de la Familia</span>
                                            </div>

                                            <h5 className="etiquetas mb-2 pb-3" style={{ letterSpacing: '1px' }}>Iniciar sesión</h5>

                                            <div className="form-outline mb-3">
                                                <input type="text" id="username" className="form-control form-control-lg entrada"
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
                                                <button className="btn btn-guardar btn-lg btn-block" type='submit'>Entrar</button>
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