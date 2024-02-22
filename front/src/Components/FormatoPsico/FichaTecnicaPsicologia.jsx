
export function FichaTecnicaPsicologia() {

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_psicologia">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Ficha técnica de psicología</li>
                    </ol>
                </nav>
            </div>

            <div className='m-2'>
                <h3 className="mt-4 mb-4 subtitulo">Ficha técnica de psicología</h3>
            </div>

            <h3 className="subtitulo_2">Datos del paciente</h3>
            <div className="ml-10 container">
                <form>
                    <div className='row'>
                        <div className=' col'>
                            <label className='etiqueta' htmlFor="num_expediente">N° Expediente: </label>
                            <input className="entrada" id='num_expediente' name='num_expediente' type="text" readOnly />
                        </div>
                        <div className=" col">
                            <label className=' etiqueta' htmlFor="fecha">Fecha: </label>
                            <input className="entrada" id='fecha' name='fecha' type="text" readOnly />
                        </div>

                    </div>

                    <div className='mb-4 row'>
                        <div className="mt-2 col">
                            <label className=' etiqueta' htmlFor="tipo_cons">Tipo de consulta: </label>
                            <select className="opciones" id='tipo_cons' name='tipo_cons' type="">
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">TDAH</option>
                                <option value="2">Duelo</option>
                                <option value="3">Problemas de pareja</option>
                                <option value="4">Ansiedad</option>
                                <option value="5">Problema conductual</option>
                                <option value="6">Transtorno depresivo</option>
                                <option value="7">Problema de aprendizaje</option>
                                <option value="8">Separación de padres</option>
                                <option value="9">Manejo de impulsos</option>
                                <option value="10">Abuso sexual</option>
                                <option value="11">Autoestima</option>
                                <option value="12">Audiencia</option>
                                <option value="13">Brigada</option>
                                <option value="14">Terapia grupal</option>
                                <option value="15">Otro</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className='mt-2 etiqueta' htmlFor="visita">Visita: </label>
                            <select className="opciones" id='visita' name='visita' type="">
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="1">Primera vez</option>
                                <option value="2">Subsecuente</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="curp">CURP</label>
                            <input className="entrada" id='curp' name='curp' type="text" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
                            <input className="entrada" id='fecha_nacimiento' name='fecha_nacimiento' type="text" />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="edad">Edad:</label>
                            <input className="entrada" id='edad' name='edad' type="text" />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
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

                    <div className="mt-2 mb-3 row">
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
                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="motivo_consulta">Motivo de consulta</label>
                            <textarea id="motivo_consulta" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="antecedentes">Antecedentes</label>
                            <textarea id="antecedentes" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-2 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="impresion_diagnostica">Impresión diagnóstica</label>
                            <textarea id="impresion_diagnostica" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="tratamiento">Tratamiento:</label>
                            <textarea id="tratamiento" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="sugerencias">Sugerencias y recomendaciones:</label>
                            <textarea id="sugerencias" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-2 mb-3 row">
                        <div className="col">
                            <label className="etiqueta" htmlFor="valoracion">Valoración PE:</label>
                            <textarea id="valoracion" placeholder="..." className="text-amplio" />
                        </div>
                    </div>

                    <div className="mt-5 mb-4 text-center">
                        <label className="etiqueta" htmlFor="psicologo">Psicólogo(A)</label>
                        <input className="datos_lectura" id='psicologo' name='psicologo' type="text" readOnly />

                        <label className="etiqueta" htmlFor="cedula_psi">Cédula</label>
                        <input className="datos_lectura" id='cedula_psi' name='cedula_psi' type="text" readOnly />
                    </div>

                    {/*Seccion del boton*/}
                    <div className="pt-1 mt-3 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

