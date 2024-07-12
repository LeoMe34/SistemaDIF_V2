import React from 'react';
import GraficosEnfermeria from './GraficosEnfermeria';
import GraficosEnfermeriaPoblacion from './GraficoEnfermeriaPoblacion';
import { FaTeeth, FaUserDoctor } from "react-icons/fa6";
import { Link } from 'react-router-dom';
export function GraficosAreas() {

    return (
        <div>
            <h2 className='subtitulo'>Enfermeria</h2>
            <GraficosEnfermeria />
            <GraficosEnfermeriaPoblacion />

            <h3 className='subtitulo_2'>Áreas Medicas</h3>
            <div className='areas'>
                <Link to={"/graficas_odonto"}>
                    <button className='areaButton'><FaTeeth /> Odontologia</button>
                </Link>
                <Link to={"/graficas_med"}>
                    <button className='areaButton'><FaUserDoctor />Medicina</button>
                </Link>



            </div>
        </div>
    )

}
