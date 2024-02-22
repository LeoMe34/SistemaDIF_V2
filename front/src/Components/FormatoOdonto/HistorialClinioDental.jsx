{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }

export function HistorialClinicoDental() {

    return (
        <div>
            {/*<header>
                <NavBarBusqueda />
    </header>*/}
            <div className="ml-10 container">
                <form className="row">

                    <h2 className="titulo">Historial clinico dental</h2>
                    {/*-----------------------------------------------------------------------*/}
                    <div className="col">
                        <label className="etiqueta" htmlFor="ref">Referencia</label>
                        <select name="ref" id="ref" className="opciones">
                            <option value="" disabled selected>Elija la opción</option>
                            <option value="opcion01">Si</option>
                            <option value="opcion02">No</option>
                        </select>
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="lugarRef">Lugar de referencia</label>
                        <input id="lugarRef" type="text" placeholder="Lugar de referencia" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="fechaDoc">Fecha de ultima Doc.</label>
                        <input id="fechaDoc" type="date" placeholder="aaaa/mm/dd" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="planiFami">Planificación familiar</label>
                        <input id="planiFami" type="text" placeholder="Planificación" className="entrada" />
                    </div>

                    <div className="col">
                        <label className="etiqueta" htmlFor="estGab">Estudios gabinete</label>
                        <input id="estGab" type="text" placeholder="Estudios" className="entrada" />
                    </div>

                    <div className="">
                        <label className="etiqueta" htmlFor="padecimiento">Padecimiento actual</label>
                        <textarea id="padecimiento" placeholder="Padecimiento" className="entrada" rows="10" cols="50" />
                    </div>

                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className="col">
                        <label className="etiqueta" htmlFor="habitos">Habitos exteriores</label>
                        <textarea id="habitos" type="text" placeholder="Habitos" className="entrada" rows="10" cols="30" />
                    </div>
                    {/*-----------------------------------------------------------------------*/}

                    <h3 className="subtitulo">Cabeza y cuello</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="labio">Labios</label>
                            <textarea id="labio" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="mucosa">Mucosa oral</label>
                            <textarea id="mucosa" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="encias">Encias</label>
                            <textarea id="encia" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="lengua">Lengua</label>
                            <textarea id="lengua" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorB">Paladar blando</label>
                            <textarea id="paladorB" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorD">Paladar duro</label>
                            <textarea id="paladorD" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cuello">Cuello</label>
                            <textarea id="cuello" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>
                    {/*-----------------------------------------------------------------------*/}


                    <h3 className="subtitulo">Interrogatorio por aparatos y sistema</h3>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="respi">Respiratorio</label>
                            <textarea id="respi" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="digestivo">Digestivo</label>
                            <textarea id="digestivo" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="neuro">Neurológico</label>
                            <textarea id="neuro" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>

                    </div>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cardio">Cardiovasculares</label>
                            <textarea id="cardio" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="musco">Muscoesqueleto</label>
                            <textarea id="musco" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <h2 className="subtitulo">Odontograma</h2>

                    <div className="odontoContent">
                        <img src="../Logos/Odontograma.png" alt="odontoG" className="" />

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