import { CardPaciente } from "../Paciente/CardPaciente"
import { AntHerediPat } from "./AntHerediPat"
import { AntPersoPato } from "./AntPersoPato"
import { AntPPatologicos } from "./AntPPatologicos"

export function Antecedente() {

    return (
        <div>
            <h2 className='subtitulo'>Antecedentes</h2>

            <div className='ml-10 mt-3 mb-2 container'>
                <CardPaciente />
            </div>

            <div className='ml-10 container'>
                <h3 className="subtitulo">Antecedentes Hereditarios Patologicos</h3>
                <AntHerediPat />
            </div>
            <div className='ml-10 container'>
                <h3 className="subtitulo">Antecedentes Personales Patologicos</h3>
                <AntPPatologicos />
            </div>
            <div className='ml-10 container'>
                <h3 className="subtitulo">Antecedentes Personales No Patologicos</h3>
                <AntPersoPato />
            </div>

            {/*Seccion del boton*/}
            <div className="pt-1 mb-3 text-center">
                <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
            </div>
        </div >
    )
}