{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }
import { MenuNave } from "../MenuNav/MenuNave"
export function AntHerediPat() {

    return (
        <div>
            <div className="container">
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
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_diabetes">Parentesco</label>
                        <textarea name="par_diabetes" id="par_diabetes" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_hipertension">Parentesco</label>
                        <textarea name="par_hipertension" id="par_hipertension" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cancer">Parentesco</label>
                        <textarea name="par_cancer" id="par_cancer" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_tubercolosis">Parentesco</label>
                        <textarea name="par_tubercolosis" id="par_tubercolosis" className="text-amplio"></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
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
                        <label className="etiqueta" htmlFor="epilepsia">Epilepsia</label>
                        <select name="epilepsia" id="epilepsia" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_asma">Parentesco</label>
                        <textarea name="par_asma" id="par_asma" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_cardiovascular">Parentesco</label>
                        <textarea name="par_cardiovascular" id="par_cardiovascular" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_epilepsia">Parentesco</label>
                        <textarea name="par_epilepsia" id="par_epilepsia" className="text-amplio"></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="col">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input caja_opciones" type="checkbox" id='otros' name='otros' />
                        <label className='form-check-label etiqueta' htmlFor="otros">Otros</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="antecedente">Antecedente</label>
                        <textarea name="antecedente" id="antecedente" className="text-amplio"></textarea>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="par_antecedente">Parentesco</label>
                        <textarea name="par_antecedente" id="par_antecedente" className="text-amplio"></textarea>
                    </div>
                </div>

            </div>

        </div >
    )
}