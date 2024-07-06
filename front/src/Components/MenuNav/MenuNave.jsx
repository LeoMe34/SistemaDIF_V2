import React, { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import { RiPsychotherapyFill } from "react-icons/ri";
import { TbNurse } from "react-icons/tb";
import { FaFileMedical, FaHospitalUser, FaNotesMedical } from "react-icons/fa";
import { FaUserDoctor, FaUser, FaHouseMedical, FaBriefcaseMedical, FaTeeth } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { BsFileBarGraphFill } from "react-icons/bs";

const isLoginPage = window.location.pathname === '/'


export function MenuNave() {
    const { token, logout } = useAuth()
    const [idUser, setIdUser] = useState(null);
    const [userGroup, setUserGroup] = useState(null);
    const setNoExpediente = useNoExpediente()
    const navigate = useNavigate();


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

    const handleLogout = async () => {
        try {
            await logout(); // Usa la función de logout proporcionada por el contexto
            // setNoExpediente("");  Limpia el contexto de NoExpediente si es necesario
            navigate('/'); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    if (!token) {
        return null; // Si no hay token, no renderizar el menú
    }
    const removerNoExp = () => {
        localStorage.removeItem("noExp")
        setNoExpediente("")
    }

    return (

        <div className="menu">

            {linkArrayUser.map(({ icon, to }) => (
                <div className='logoContent' key={icon}>
                    <NavLink to={to} className={({ isActive }) => `Link${isActive ? ` active` : ``}`}>
                        <div className='LinkIconProfile'>
                            {icon}
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
                        <li className='LinkContainer' key={label} >
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>)}

            {userGroup == "Enfermero" && (
                <div>
                    <h3 className="MenuNav">Enfermero</h3>
                    {linkArrayEnfermero.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>)}

            {userGroup == "Odontologo" && (
                <div >
                    <h3 className="MenuNav">Odontologo</h3>
                    {linkArrayOdontologo.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`} onClick={removerNoExp}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>
            )}


            {userGroup == "Medico" && (
                <div >
                    <h3 className="MenuNav">Medico</h3>
                    {linkArrayMedico.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`} onClick={removerNoExp}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>
            )}

            {userGroup == "Psicologo" && (
                <div >
                    <h3 className="MenuNav">Psicologo</h3>
                    {linkArrayPsico.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>

            )}

            {userGroup == "Nutriologo" && (
                <div >
                    <h3 className="MenuNav">Nutriologo</h3>
                    {linkArrayNutri.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>

            )}

            {userGroup == "oftalmologo" && (
                <div >
                    <h3 className="MenuNav">Oftalmólogo</h3>
                    {linkArrayOftal.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>

            )}

            {userGroup == "audiologo" && (
                <div >
                    <h3 className="MenuNav">Audiólogo</h3>
                    {linkArrayAudio.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>

            )}

            {userGroup == "Recepcion" && (
                <div >
                    <h3 className="MenuNav">Recepcionista</h3>
                    {linkArrayRecep.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>
            )}

            {userGroup == "recepcion_psico" && (
                <div >
                    <h3 className="MenuNav">Recepcionista</h3>
                    {linkArrayRecepPsico.map(({ icon, label, to }) => (
                        <li className='LinkContainer' key={label}>
                            <NavLink to={to} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                                <a className='LinkIcon'>
                                    {icon}
                                    <span>{label}</span>
                                </a>
                            </NavLink>
                        </li>
                    ))}
                </div>
            )}

            {linkArrayExit.map(({ label, icon }) => (
                <div className='LinkContainer' key={label}>
                    <NavLink to='/' onClick={handleLogout} className={({ isActive }) => `Links${isActive ? ` active` : ``}`}>
                        <div className='LinkIcon'>
                            {icon}
                            <span>{label}</span>
                        </div>
                    </NavLink>
                </div>
            ))}


        </div >
    )
}

const linkArrayUser = [
    {
        icon: <HiUserCircle />,
        to: "/usuario"

    },
]

const linkArrayExit = [
    {
        label: "Cerrar sesión",
        icon: <IoIosLogOut />,

    },
]


const linkArrayAdmin = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_administrador"

    },
    {
        label: "Crear Usuario",
        icon: <FaUserDoctor />,
        to: "/crear_usuario"

    },
    {
        label: "Crear Empleado",
        icon: <FaUser />,
        to: "/crear_empleado"

    },
    {
        label: "Graficas",
        icon: <BsFileBarGraphFill />,
        to: "/graficas_grl"

    },
]

const linkArrayRecep = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_recepcion_medica"

    },

    {
        label: "Crear Paciente",
        icon: <FaHospitalUser />,
        to: "/crear_paciente"

    },

]

const linkArrayRecepPsico = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_recepcion_psicologia"

    },

    {
        label: "Crear Paciente",
        icon: <FaHospitalUser />,
        to: "/crear_paciente_psicologia"

    },

]

const linkArrayEnfermero = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_enfermeria"

    },

    {
        label: "Ficha Enfermeria",
        icon: <TbNurse />,
        to: "/ficha_tecnica_enfermeria"

    },

]

const linkArrayOdontologo = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_odontologo"

    },

    {
        label: "Historial Dental",
        icon: <FaTeeth />,
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
        icon: <FaNotesMedical />,
        to: "/nota_evo"

    },
    {
        label: "Ficha medica",
        icon: <FaFileMedical />,
        to: "/ficha_medica"

    },
]

const linkArrayMedico = [
    {
        label: "Inicio",
        icon: <FaHouseMedical />,
        to: "/home_medico",

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_medico",
    },

    {
        label: "Historial Clinico",
        icon: < FaBriefcaseMedical />,
        to: "/historial_clinico_p1",

    },

    {
        label: "Notas Medicas",
        icon: <FaNotesMedical />,
        to: "/notas_medicas",

    },

    {
        label: "Receta Medica",
        icon: <GiMedicines />,
        to: "/receta",

    },

]

const linkArrayPsico = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
        to: "/home_psicologia"

    },

    {
        label: "Ficha Psicologia",
        icon: <RiPsychotherapyFill />,
        to: "/ficha_tecnica_psicologia"

    },

]

const linkArrayNutri = [
    {
        label: "Home",
        icon: <FaHouseMedical />,
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
        icon: <FaHouseMedical />,
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
        icon: <FaHouseMedical />,
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

