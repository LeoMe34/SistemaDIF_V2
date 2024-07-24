import React from 'react';
import { Link } from 'react-router-dom';
import { TbNurse } from "react-icons/tb";
import { FaTeeth } from "react-icons/fa6";
import GraficosMedFam from './GrafMedFamilia';


export function GraficoMed() {

    return (
        <div>
            <h2 className='subtitulo'>Medicina</h2>
            <GraficosMedFam />
            <h3 className='subtitulo_2'>Áreas Medicas</h3>
            <div>
                <Link to={"/graficas_grl"}>
                    <button className='areaButton'><TbNurse />Enfermeria</button>
                </Link>
                <Link to={"/graficas_odonto"}>
                    <button className='areaButton'><FaTeeth /> Odontologia</button>
                </Link>



            </div>

        </div>
    )

}