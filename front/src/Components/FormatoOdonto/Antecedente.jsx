import { CardPaciente } from "../Paciente/CardPaciente"
import { MenuNave } from "../MenuNav/MenuNave"
export function Antecedente() {

    return (
        <div>
            {/*<header>
                <NavBarSimple />
    </header>*/}
            <div className='m-2'>
                <h2 className="subtitulo">Antecedentes Hereditarios Patologicos</h2>
                <CardPaciente />
            </div>

            <div className='ml-10 container'>

                <div className="row">
                    <h3 className="subtitulo">Antecedentes Hereditarios Patologicos</h3>

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
                    {<div className="col">
                        <label className="etiqueta" htmlFor="tendMedi">---</label>
                        <select name="tendMedi" id="tendMedi" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>}
                </div>
            </div>
            {/*SECCION DE LOS ANTECEDENTES PERSONALES PATOLOGICOS*/}
            <div className="ml-10 container ">
                <form className="row">

                    <h3 className="subtitulo">Antecedentes Personales Patologicos</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones"
                        >
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tubercolosis">Tubercolosis Pulmonar</label>
                        <select name="tubercolosis" id="tubercolosis" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="transfusiones">Transfusiones</label>
                        <select name="transfusiones" id="transfusiones" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>


                    <div className="col">
                        <label className="etiqueta" htmlFor="quirurgicos">Quirurgicos</label>
                        <select name="quirurgicos" id="quirurgicos" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="anestesicos">Anestesicos</label>
                        <select name="anestesicos" id="anestesicos" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="alergicos">Alergicos</label>
                        <select name="alergicos" id="alergicos" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="traumaticoss">Traumaticos</label>
                        <select name="traumaticos" id="traumaticos" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="medicos">Medicos</label>
                        <select name="medicos" id="medicos" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tabaquismo">Tabaquismo</label>
                        <select name="tabaquismo" id="tabaquismo" className="opciones"
                            onChange={(e) => setOcupacion(e.target.value)}>
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="alcoholismo">Alcoholismo</label>
                        <select name="alcoholismo" id="alcoholismo" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tendDrogas">Tendencia a drogas</label>
                        <select name="tendDrogas" id="tendDrogas" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="tendMedi">Medicamentos</label>
                        <select name="tendMedi" id="tendMedi" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>


                </form>
            </div>
            {/*SECCION DE LOS ANTECEDENTES PERSONALES NO PATO*/}
            <div className="ml-10 container">
                <form >

                    <h3 className="subtitulo">Antecedentes Personales No Patologicos</h3>

                    <div className="col">
                        <label className="etiqueta" htmlFor="vacuna">Vacunas</label>
                        <input id="vacuna" type="text" placeholder="Vacunas aplicadas" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="alimentacion">Alimentación</label>
                        <input id="alimentacion" type="text" placeholder="Alimentación" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="fauna">Fauna nociva</label>
                        <input id="fauna" type="text" placeholder="Fauna nociva" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="vivienda">Vivienda</label>
                        <input id="vivienda" type="text" placeholder="Vivivenda" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="higiene">Higiene personal</label>
                        <input id="higiene" type="text" placeholder="Higiene del paciente" className="entrada"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="etiqueta" htmlFor="habi">Habitación</label>
                        <input id="habi" type="text" placeholder="Habitación" className="entrada"
                        />
                    </div>
                </form>
            </div>

            {/*Seccion del boton*/}
            <div className="text-center">
                <button type="submit" className="btn-guardar mx-2">
                    Guardar
                </button>
            </div>
        </div >
    )
}