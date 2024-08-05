import React from 'react';
import GraficosEnfermeria from './GraficosEnfermeria';
import GraficosEnfermeriaPoblacion from './GraficoEnfermeriaPoblacion';
import { FaTeeth, FaUserDoctor } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { RiPsychotherapyLine } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { SlEyeglass } from "react-icons/sl";
import { IoEarOutline } from "react-icons/io5";
export function GraficosAreas() {

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Graficos de enfermeria</li>
                    </ol>
                </nav>
            </div>
            <div className="container">
                <h2 className='subtitulo'>Enfermeria</h2>
                <GraficosEnfermeria />
                <GraficosEnfermeriaPoblacion />
                <h3 className='subtitulo_2'>Áreas Medicas</h3>
                <div className='center col'>
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
                    <Link to={"/graficas_oft"}>
                        <button className='areaButton m-3'>< SlEyeglass />Oftalmología</button>
                    </Link>
                    <Link to={"/graficas_aud"}>
                        <button className='areaButton m-3'>< IoEarOutline />Audiología</button>
                    </Link>
                </div>
            </div>

        </div>
    )

}
