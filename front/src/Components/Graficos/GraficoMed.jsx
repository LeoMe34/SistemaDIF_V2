import React from 'react';
import { Link } from 'react-router-dom';
import { TbNurse } from "react-icons/tb";
import { FaTeeth } from "react-icons/fa6";
import GraficosMedFam from './GrafMedFamilia';


export function GraficoMed() {

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
                        <li className="breadcrumb-item pag-actual" aria-current="page">Graficos de Medicina</li>
                    </ol>
                </nav>
            </div>

            <div className='container'>
                <h2 className='subtitulo'>Medicina</h2>
                <GraficosMedFam />
                <h3 className='subtitulo_2'>Áreas Medicas</h3>
                <div className='mt-2 mb-2'>
                    <Link to={"/graficas_grl"}>
                        <button className='areaButton m-3'><TbNurse />Enfermeria</button>
                    </Link>
                    <Link to={"/graficas_odonto"}>
                        <button className='areaButton'><FaTeeth /> Odontologia</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}