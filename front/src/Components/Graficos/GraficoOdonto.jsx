import React from 'react';
import { Link } from 'react-router-dom';
import { TbNurse } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import GrafOdontAnt from './GrafOdontAnt';
import GrafAntPP from './GrafOdontAntPP';
export function GraficoOdonto() {

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Graficos de odontología</li>
                    </ol>
                </nav>
            </div>

            <div className='container'>
                <h2 className='subtitulo'>Odontología</h2>
                <GrafOdontAnt />
                <GrafAntPP />
                <h3 className='subtitulo_2'>Áreas Medicas</h3>

                <div className='center col'>
                    <Link to={"/graficas_grl"}>
                        <button className='areaButton m-3'><TbNurse />Enfermeria</button>
                    </Link>
                    <Link to={"/graficas_med"}>
                        <button className='areaButton'><FaUserDoctor />Medicina</button>
                    </Link>

                </div>
            </div>

        </div>
    )
}