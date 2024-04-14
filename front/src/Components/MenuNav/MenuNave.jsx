import React, { useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { FaFileMedical, FaRegUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { useAuth } from '../../Contexto/AuthContext';
import axios from 'axios';

const isLoginPage = window.location.pathname === '/'


export function MenuNave() {
    const { token } = useAuth()
    const [idUser, setIdUser] = useState(null);

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
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();
    }, [token]);

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
                <Collapsible trigger="Crear" >
                    {linkArray.map(({ icon, label, to }) => (
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
                </Collapsible>)}

            <Collapsible trigger="Fichas Tecnicas" >
                {linkArray02.map(({ icon, label, to }) => (
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
            </Collapsible>

            <Collapsible trigger="Historial clinico" >
                {linkArray03.map(({ icon, label, to }) => (
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
            </Collapsible>

            <Collapsible trigger="Notas" >
                {linkArray04.map(({ icon, label, to }) => (
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
            </Collapsible>

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


const linkArray = [

    {
        label: "Crear Empleado",
        icon: <FaFileMedical />,
        to: "/crear_empleado"

    },
    {
        label: "Crear Usuario",
        icon: <FaFileMedical />,
        to: "/crear_usuario"

    },
    {
        label: "Crear Paciente",
        icon: <FaFileMedical />,
        to: "/crear_paciente"

    },

]

const linkArray02 = [
    {
        label: "Ficha Enfermeria",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_enfermeria"

    },

    {
        label: "Ficha Medico",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_medico"

    },

    {
        label: "Ficha Psicologia",
        icon: <FaFileMedical />,
        to: "/ficha_tecnica_psicologia"

    },

]

const linkArray03 = [

    {
        label: "Historial Clinico",
        icon: <FaFileMedical />,
        to: "/historia_clinica_simplificada"

    },

    {
        label: "Antecedente",
        icon: <FaFileMedical />,
        to: "/antecedente"

    },
    {
        label: "Historial Dental",
        icon: <FaFileMedical />,
        to: "/hist_dent"

    },
]

const linkArray04 = [

    {
        label: "Notas Medicas",
        icon: <FaFileMedical />,
        to: "/notas_medicas"

    },
    {
        label: "Nota Subsecuente",
        icon: <FaFileMedical />,
        to: "/nota_subs"

    },
    {
        label: "Nota Evolución",
        icon: <FaFileMedical />,
        to: "/nota_evo"

    },
    {
        label: "Receta",
        icon: <FaFileMedical />,
        to: "/receta"

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

