

export function AntPPatologicos() {
    return (
        <div>

            <div className="ml-101">
                <form >

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
                        <label className="etiqueta" htmlFor="tendMedi">Tendencia a medicamentos</label>
                        <select name="tendMedi" id="tendMedi" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/*Seccion del boton*/}
                    <div className="text-center">
                        <button type="submit" className="btn-guardar mx-2">
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}