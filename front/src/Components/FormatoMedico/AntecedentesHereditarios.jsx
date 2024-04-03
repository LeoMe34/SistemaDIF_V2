{/*import { NavBarSimple } from "../../Partials/NavBarSimple"*/ }

export function AntecedentesHereditarios() {

    return (
        <div>
            <h3 className='subtitulo_2'>Hereditarios y familiares</h3>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <label className="etiqueta" htmlFor="diabetes">Diabetes</label>
                        <select name="diabetes" id="diabetes" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="hipertension">Hipertensión</label>
                        <select name="hipertension" id="hipertension" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="cancer">Cancer</label>
                        <select name="cancer" id="cancer" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="etiqueta" htmlFor="tubercolosis">Cardiopatia Isquémica</label>
                        <select name="tubercolosis" id="tubercolosis" className="opciones" type="">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="True">Si</option>
                            <option value="False">No</option>
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
                        <label className="etiqueta" htmlFor="par_cardiopatia">Parentesco</label>
                        <textarea name="par_cardiopatia" id="par_cardiopatia" className="text-amplio"></textarea>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="col">
                    <label className='form-check-label etiqueta' htmlFor="otros">Otros</label>
                    <textarea name="otros" id="otros" className="text-amplio"></textarea>

                </div>
            </div>

        </div >
    )
}