import React from 'react';
import { Link } from 'react-router-dom';
import { TbNurse } from "react-icons/tb";
import { FaTeeth, FaUserDoctor } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { IoEarOutline } from "react-icons/io5";
import { RiPsychotherapyLine } from "react-icons/ri";



export function GraficoOft() {

    return (
        <div>
            <div className="mt-3 container">
                <nav className='ml-10' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_administrador">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Graficos de Oftalmología</li>
                    </ol>
                </nav>
            </div>

            <div className='container'>
                <h2 className='subtitulo'>Oftalmología</h2>

                <h3 className='subtitulo_2'>Áreas Medicas</h3>
                <div className='center col'>
                    <Link to={"/graficas_grl"}>
                        <button className='areaButton m-3'><TbNurse />Enfermeria</button>
                    </Link>
                    <Link to={"/graficas_odonto"}>
                        <button className='areaButton m-3'><FaTeeth /> Odontologia</button>
                    </Link>
                    <Link to={"/graficas_med"}>
                        <button className='areaButton m-3'><FaUserDoctor />Medicina</button>
                    </Link>
                    <Link to={"/graficas_psic"}>
                        <button className='areaButton m-3'>< RiPsychotherapyLine />Psicologia</button>
                    </Link>
                    <Link to={"/graficas_nutri"}>
                        <button className='areaButton m-3'>< GiFruitBowl />Nutriología</button>
                    </Link>
                    <Link to={"/graficas_aud"}>
                        <button className='areaButton m-3'>< IoEarOutline />Audiología</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}