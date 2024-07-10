import React from 'react';
import GraficosEnfermeria from './GraficosEnfermeria';
import GraficosEnfermeriaPoblacion from './GraficoEnfermeriaPoblacion';
export function GraficosAreas() {

    return (
        <div>
            <h2 className='subtitulo'>Enfermeria</h2>
            <GraficosEnfermeria />
            <GraficosEnfermeriaPoblacion />
        </div>
    )

}
