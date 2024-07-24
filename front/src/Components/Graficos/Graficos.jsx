import React from 'react';
import GraficosEnfermeria from './GraficosEnfermeria';
import GraficosEnfermeriaPoblacion from './GraficoEnfermeriaPoblacion';
import { FaTeeth, FaUserDoctor } from "react-icons/fa6";
import { Link } from 'react-router-dom';
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
                <div className='areas mt-2 mb-2'>
                    <Link to={"/graficas_odonto"}>
                        <button className='areaButton m-3'><FaTeeth /> Odontologia</button>
                    </Link>
                    <Link to={"/graficas_med"}>
                        <button className='areaButton'><FaUserDoctor />Medicina</button>
                    </Link>
                </div>
            </div>

        </div>
    )

}
