<<<<<<< HEAD
import { CardPaciente } from "../Paciente/CardPaciente"
import { AntHerediPat } from "./AntHerediPat"
import { AntPersoPato } from "./AntPersoPato"
import { AntPPatologicos } from "./AntPPatologicos"

export function Antecedente() {

    return (
        <div>

            <div className='m-2'>
                <CardPaciente />
            </div>
            <h2 className='subtitulo'>Antecedentes</h2>
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
            <div className="text-center">
                <button type="submit" className="btn-guardar mx-2">
                    Guardar
                </button>
            </div>
        </div >
    )
=======
import { CardPaciente } from "../Paciente/CardPaciente"
import { AntHerediPat } from "./AntHerediPat"
import { AntPersoPato } from "./AntPersoPato"
import { AntPPatologicos } from "./AntPPatologicos"

export function Antecedente() {

    return (
        <div>

            <div className='m-2'>
                <CardPaciente />
            </div>
            <h2 className='subtitulo'>Antecedentes</h2>
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
            <div className="text-center">
                <button type="submit" className="btn-guardar mx-2">
                    Guardar
                </button>
            </div>
        </div >
    )
>>>>>>> e20854e26730605aecd55f0a552a082b4e2f3de5
}