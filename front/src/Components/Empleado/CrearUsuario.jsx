{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../Contexto/AuthContext';
import { toast } from 'react-hot-toast'
import { mensajeConfirmacionGuardar } from '../../Modales/MensajeConfirmacionGuardar';

export function CrearUsuario() {
    const [usuario, setUsuario] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [contrasenia, setContrasenia] = useState('')
    const [correo, setCorreo] = useState('')
    const navegador = useNavigate()
    const { token } = useAuth()

    const registrarUsuario = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar/"
            const respuesta = await axios.post(url, {
                username: usuario,
                password: contrasenia,
                email: correo
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(contrasenia)
            const datosUsuario = respuesta.data.user_info;
            if ('username' in datosUsuario) {
                console.log("Usuario registrado correctamente");
                navegador("/crear_empleado");
            } else {
                console.log("Usuario duplicado");
            }
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    const getUsuarios = async () => {
        try {
            const url = "http://127.0.0.1:8000/api/get_all_usuarios/"
            const respuesta = await axios.get(url,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            console.log(respuesta.data)
            setUsuarios(respuesta.data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        getUsuarios()
    }, [token]);

    const validarNoTrabajador = (noTrabajador) => {
        const noTrabajadorRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9\s.-]{1,50}$/

        return noTrabajadorRegex.test(noTrabajador)
    }

    const validarEmail = (email) => {
        const emailRegex = /^[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9_.+-]+@[A-Za-zÁÉÍÓÚáéíóúü0-9]+\.[A-Za-zÁÉÍÓÚáéíóúü0-9]+$/
        return emailRegex.test(email)
    }

    const validarContrasenia = (contrasenia) => {
        //El .* permite cualquier número de caracteres antes del dígito.        
        const contraseniaRegex = /^(?=.*[0-9])[A-Za-zÁÉÍÓÚáéíóúüñÑ0-9@.+\-_]{8,150}$/
        return contraseniaRegex.test(contrasenia)
    }


    const enviar = handleSubmit(async () => {
        const noTrabajadorValido = validarNoTrabajador(usuario)
        const correoValido = validarEmail(correo)
        const contraseniaValida = validarContrasenia(contrasenia)
        let correoDuplicado = usuarios.some((u) => u.email === correo)
        let usuarioDuplicado = usuarios.some((u) => u.username == usuario)

        if (!noTrabajadorValido) {
            toast.error("Ese caracter no esta permitido")
        } else if (usuarioDuplicado) {
            toast.error("Ese número de trabajador ya está registrado en el sitema")
        } else if (!correoValido) {
            toast.error("El correo no es valido")
        } else if (correoDuplicado) {
            toast.error("El correo electrónico ya está registrado en el sitema")
        } else if (!contraseniaValida) {
            toast.error("La contraseña debe tener al menos 8 caracteres")
        }
        else {
            try {
                mensajeConfirmacionGuardar('l usuario', null, navegador, () => {
                    registrarUsuario()
                    localStorage.setItem('noTrabajador', JSON.stringify(usuario));
                    toast.success("Usuario registrado con éxito")
                })
            } catch (error) {
                console.error('Error al registrar empleado:', error);
            }
        }
    })

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_recepcion">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\crear_empleado">
                                Crear empleado
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Registrar usuario</li>
                    </ol>
                </nav>
            </div>

            <div className="ml-10 container mt-3">
                <form onSubmit={enviar}>
                    <h3 className="titulo">Registrar usuario</h3>

                    <div className='row'>
                        <div className='mt-3 mb-2 col'>
                            <label className="etiqueta" htmlFor="usuario">No.Trabajador
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="usuario" type="text" className="entrada"
                                onChange={(e) => setUsuario(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-3 mb-2 col'>
                            <label className="etiqueta" htmlFor="email">Correo electrónico
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="email" type="text" placeholder="Correo electrónico" className="entrada"
                                onChange={(e) => setCorreo(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mt-3 mb-2 col'>
                            <label className="etiqueta" htmlFor="contrasenia">Contraseña
                                <span className='etiqueta_obligatoria'>*</span>
                            </label>
                            <input id="contrasenia" type="password" placeholder="Contraseña" className="entrada"
                                onChange={(e) => setContrasenia(e.target.value)} />
                        </div>
                    </div>

                    <div className="pt-1 mt-2 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}