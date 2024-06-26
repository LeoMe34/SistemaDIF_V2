import React, { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { FaFileMedical, FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';

const isLoginPage = window.location.pathname === '/'


export function MenuNave() {
    const { token } = useAuth()
    const [idUser, setIdUser] = useState(null);
    const [userGroup, setUserGroup] = useState(null);

    useEffect(() => {
        const getIdUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const id_usuario = response.data.user_info.is_superuser
                setIdUser(id_usuario)
                const group_usuario = response.data.user_info.name
                setUserGroup(group_usuario)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();

    }, [token]);

    const logout = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/logout/", null, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    const removerNoExp = () => {
        console.log("si funciona")
        localStorage.removeItem("noExp")
    }


    return (

        <div className="menu">

            {linkArrayUser.map(({ photo, label, to }) => (
                <div className='logoContent' key={label}>
                    <NavLink to={to} className={({ isActive }) => `Link${isActive ? ` active` : ``}`}>
                        <div className='imgContent'>
                            {photo}
                        </div>
                        <div>
                            <span>{label}</span>
                        </div>
                    </NavLink>
                </div>
            ))}

            {/*
            <div className='logoContent'>
                <div className='imgContent'>
                    <img src="../Logos/cuenta.png" alt="user" className="" />
                </div>
                <h2>Usuario</h2>
            </div>*/}
            {idUser && (
                <div>
                    <h3 className="MenuNav">Administrador</h3>
                    {linkArrayAdmin.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label} >
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>)}

            {userGroup == "Enfermero" && (
                <div>
                    <h3 className="MenuNav">Enfermero</h3>
                    {linkArrayEnfermero.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>)}

            {userGroup == "Odontologo" && (
                <div >
                    <h3 className="MenuNav">Odontologo</h3>
                    {linkArrayOdontologo.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}


            {userGroup == "Medico" && (
                <div >
                    <h3 className="MenuNav">Medico</h3>
                    {linkArrayMedico.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`} onClick={removerNoExp}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}

            {userGroup == "Psicologo" && (
                <div >
                    <h3 className="MenuNav">Psicologo</h3>
                    {linkArrayPsico.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>

            )}

            {userGroup == "Nutriologo" && (
                <div >
                    <h3 className="MenuNav">Nutriologo</h3>
                    {linkArrayNutri.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>

            )}

            {userGroup == "oftalmologo" && (
                <div >
                    <h3 className="MenuNav">Oftalmólogo</h3>
                    {linkArrayOftal.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>

            )}

            {userGroup == "audiologo" && (
                <div >
                    <h3 className="MenuNav">Audiólogo</h3>
                    {linkArrayAudio.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>

            )}

            {userGroup == "Recepcion" && (
                <div >
                    <h3 className="MenuNav">Recepcionista</h3>
                    {linkArrayRecep.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}

            {userGroup == "recepcion_psico" && (
                <div >
                    <h3 className="MenuNav">Recepcionista</h3>
                    {linkArrayRecepPsico.map(({ icon, label, to }) => (
                        <div className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <div className='LinkIcon'>
                                    {icon}
                                    <div>
                                        <span>{label}</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}

            <div className='logoContent'>
                <NavLink to='/' onClick={logout} className={({ isActive }) => `Link${isActive ? ` active` : ``}`}>
                    <div className='imgContent'>
                        <IoIosLogOut />
                    </div>
                    <span>Cerrar Sesión</span>
                </NavLink>

            </div>

            {/* {linkArrayLogOut.map(({ icon, label, to }) => (
                <div className='LinkContainer' key={label}>
                    <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                        <div className='LinkIcon'>
                            {icon}
                            <div>
                                <span>{label}</span>
                            </div>
                        </div>
                    </NavLink>
                </div>
           ))*/
            }


        </div >
    )
}

const linkArrayUser = [
    {
        label: "Usuario",
        photo: <img src="../Logos/cuenta.png" alt="user" />,
        to: "/usuario"

    },
]


const linkArrayAdmin = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_administrador"

    },
    {
        label: "Crear Usuario",
        icon: <FaFileMedical />,
        to: "/crear_usuario"

    },
    {
        label: "Crear Empleado",
        icon: <FaFileMedical />,
        to: "/crear_empleado"

    },
]

const linkArrayRecep = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_recepcion_medica"

    },

    {
        label: "Crear Paciente",
        icon: <FaFileMedical />,
        to: "/crear_paciente"

    },

]

const linkArrayRecepPsico = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_recepcion_psicologia"

    },

    {
        label: "Crear Paciente",
        icon: <FaFileMedical />,
        to: "/crear_paciente_psicologia"

    },

]

const linkArrayEnfermero = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_enfermeria"

    },

    {
        label: "Ficha Enfermeria",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_enfermeria"

    },

]

const linkArrayOdontologo = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_odontologo"

    },

    {
        label: "Historial Dental",
        icon: <FaFileMedical />,
        to: "/historial_odontologico_p1"

    },
/*
    {
        label: "Nota Subsecuente",
        icon: <FaFileMedical />,
        to: "/nota_subs1"

    },
*/
    {
        label: "Nota Evolución",
        icon: <FaFileMedical />,
        to: "/nota_evo"

    },
    {
        label: "Ficha tecnica medica",
        icon: <FaFileMedical />,
        to: "/ficha_medica"

    },
]

const linkArrayMedico = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_medico",

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_medico",
    },

    {
        label: "Historial Clinico",
        icon: <FaFileMedical />,
        to: "/historial_clinico_p1",

    },

    {
        label: "Notas Medicas",
        icon: <FaFileMedical />,
        to: "/notas_medicas",

    },

    {
        label: "Receta",
        icon: <FaFileMedical />,
        to: "/receta",

    },

]

const linkArrayPsico = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_psicologia"

    },

    {
        label: "Ficha Psicologia",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_psicologia"

    },

]

const linkArrayNutri = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_nutricion"

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica"

    },

]

const linkArrayOftal = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_oftalmologo"

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica"

    },

]

const linkArrayAudio = [
    {
        label: "Home",
        icon: <FaHome />,
        to: "/home_audiologo"

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica"

    },

]
/*
const linkArrayLogOut = [

    {
        label: "Cerrar sesión",
        icon: <IoIosLogOut />,
        to: "/login",

    },

]*/

