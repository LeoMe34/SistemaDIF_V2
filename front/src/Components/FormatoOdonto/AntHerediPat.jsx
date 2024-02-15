{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { CardPaciente } from "../Paciente/CardPaciente"
import { MenuNave } from "../MenuNav/MenuNave"
export function AntHerediPat() {

    return (
        <div>
            {/*<header>
                <NavBarSimple />
    </header>*/}
            <div className='m-2'>
                <h3 className="subtitulo">Antecedentes Hereditarios Patologicos</h3>
                <CardPaciente />
            </div>

            <div className='ml-10 container'>

                <div className="row">

                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                        <select name="tubercolosis" id="tubercolosis" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="asma">Asma</label>
                        <select name="asma" id="asma" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>


                    <div className="col">
                        <label className="etiqueta" htmlFor="cardiovascular">Cardiovasculares</label>
                        <select name="cardiovascular" id="cardiovascular" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                        <select name="anestesicos" id="anestesicos" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                        <select name="alergicos" id="alergicos" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="traumaticoss">Traumaticos</label>
                        <select name="traumaticos" id="traumaticos" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="medicos">Medicos</label>
                        <select name="medicos" id="medicos" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tabaquismo">Tabaquismo</label>
                        <select name="tabaquismo" id="tabaquismo" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="alcoholismo">Alcoholismo</label>
                        <select name="alcoholismo" id="alcoholismo" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tendDrogas">Tendencia drogas</label>
                        <select name="tendDrogas" id="tendDrogas" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tendMedi">Medicamentos</label>
                        <select name="tendMedi" id="tendMedi" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                </div>

                {/*Seccion del boton*/}
                <div className="text-center">
                    <button type="submit" className="btn-guardar mx-2">
                        Siguiente
                    </button>
                </div>
            </div>
        </div >
    )
}