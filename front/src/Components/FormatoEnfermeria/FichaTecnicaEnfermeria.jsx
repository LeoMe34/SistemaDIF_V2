import React from 'react';
import { CardPaciente } from '../Paciente/CardPaciente';
import { NavBarBusqueda } from '../../Partials/NavBarBusqueda';

export function FichaTecnicaEnfermeria() {
    return (
        <div>
            <header>
                <NavBarBusqueda />
            </header>
            <div className='m-2'>
                <CardPaciente />
            </div>

            <div>
                <label htmlFor="peso">Peso: </label>
                <label htmlFor="talla">Talla: </label>
                <label htmlFor="es_trabajador">Trabajador: </label>
            </div>
        </div>
    )
}