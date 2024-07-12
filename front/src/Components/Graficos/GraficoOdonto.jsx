import React from 'react';
import { Link } from 'react-router-dom';
import { TbNurse } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import GrafOdontAnt from './GrafOdontAnt';
import GrafAntPP from './GrafOdontAntPP';
export function GraficoOdonto() {

    return (
        <div>
            <h2 className='subtitulo'>Odontología</h2>
            <GrafOdontAnt />
            <GrafAntPP />
            <h3 className='subtitulo_2'>Áreas Medicas</h3>
            <div>
                <Link to={"/graficas_grl"}>
                    <button className='areaButton'><TbNurse />Enfermeria</button>
                </Link>
                <Link to={"/graficas_med"}>
                    <button className='areaButton'><FaUserDoctor />Medicina</button>
                </Link>

            </div>
        </div>
    )
}