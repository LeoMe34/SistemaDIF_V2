
import { NavBarSimple } from "../../Partials/NavBarSimple"
export function FichaTecnicaPsicologia() {

    return (
        <div>
            <header>
                <NavBarSimple />
            </header>
            <div className='m-2'>
                <h3 className="subtitulo">Ficha técnica de psicología</h3>
            </div>

            <h3 className="subtitulo_2">Datos del paciente</h3>
            <div className="ml-10 container">
                <form>
                    <div className='row'>
                        <div className='mt-2 col'>
                            <label className='etiqueta' htmlFor="num_expediente">N° Expediente: </label>
                            <input className="entrada" id='num_expediente' name='num_expediente' type="text" readOnly />
                        </div>
                        <div className="mt-2 col">
                            <label className='mt-2 etiqueta' htmlFor="fecha">Fecha: </label>
                            <input className="entrada" id='fecha' name='fecha' type="text" readOnly />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="nombre">Nombre:</label>
                            <input className="entrada" id='nombre' name='nombre' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="ape_paterno">Apellido paterno:</label>
                            <input className="entrada" id='ape_paterno' name='ape_paterno' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="ape_materno">Apellido materno:</label>
                            <input className="entrada" id='ape_materno' name='ape_materno' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
                            <input className="entrada" id='fecha_nacimiento' name='fecha_nacimiento' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="edad">Edad:</label>
                            <input className="entrada" id='edad' name='edad' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="direccion">Dirección:</label>
                            <input className="entrada" id='direccion' name='direccion' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="ocupacion">Ocupación:</label>
                            <input className="entrada" id='ocupacion' name='ocupacion' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="escolaridad">Escolaridad:</label>
                            <input className="entrada" id='escolaridad' name='escolaridad' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="telefono">Teléfono:</label>
                            <input className="entrada" id='telefono' name='telefono' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="acompaña">Acompañante:</label>
                            <input className="entrada" id='acompaña' name='acompaña' type="text" />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="parentesco">Parentesco:</label>
                            <input className="entrada" id='parentesco' name='parentesco' type="text" />
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Datos del paciente</h3>
                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivo_consulta">Motivo de consulta</label>
                            <textarea id="motivo_consulta" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="antecedentes">Antecedentes</label>
                            <textarea id="antecedentes" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="impresion_diagnostica">Impresión diagnóstica</label>
                            <textarea id="impresion_diagnostica" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamiento">Tratamiento:</label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="sugerencias">Sugerencias y recomendaciones:</label>
                            <textarea id="sugerencias" placeholder="..." className="text-amplio" rows="10" cols="30" />
                        </div>
                    </div>

                    <div className="mt-5 mb-4 text-center">
                        <label className="etiqueta" htmlFor="psicologo">Psicólogo(A)</label>
                        <input className="datos_lectura" id='psicologo' name='psicologo' type="text" readOnly/>                        
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

