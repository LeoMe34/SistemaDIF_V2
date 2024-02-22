
export function CrearPaciente() {
    return (
        <div>
            <h3 className="mt-4 mb-4 titulo">Paciente nuevo</h3>
            <form >
                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="curp">CURP</label>
                            <input id="curp" type="text" placeholder="CURP" className="entrada" />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                            <input id="fechaNacimiento" type="date" placeholder="dd/mm/aaaa" className="entrada" />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="edad">Edad</label>
                            <input id="edad" type="text" className="entrada" readOnly />
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" placeholder="Nombre" className="entrada" />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoP">Apellido paterno</label>
                            <input id="apellidoP" type="text" placeholder="Apellido paterno" className="entrada" />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="apellidoM">Apellido materno</label>
                            <input id="apellidoM" type="text" placeholder="Apellido materno" className="entrada" />
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="noExpediente">Número de expediente</label>
                            <input id="noExpediente" type="text" className="entrada" readOnly />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="sexo">Sexo</label>
                            <select name="sexo" id="sexo" className="opciones">
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="hombre">Masculino</option>
                                <option value="mujer">Femenino</option>
                            </select>
                        </div>

                        {/*Aun falta que desglose la opción de otra */}
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="nacionalidad">Nacionalidad</label>
                            <select name="nacionalidad" id="nacionalidad" className="opciones">
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="mexico">Mexicana</option>
                                <option value="otra">Otra</option>
                            </select>

                            {/*mostrarOtraNacion && <div className="mb-5">
                        <label className="form-label etiqueta" htmlFor="otra_nacionalidad">Otra</label>
                        <input id="otra_nacionalidad" type="text" placeholder="Nacionalidad" className="entrada"/>
    </div>*/}
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="estadoCivil">Estado civil</label>
                            <select name="estadoCivil" id="estadoCivil" className="opciones">
                                <option value="" disabled selected>Elija la opción</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="viudo">Viudo</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="union_libre">Unión libre</option>
                            </select>
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="numeroTelefonico">Número telefónico</label>
                            <input id="numeroTelefonico" type="text" placeholder="Número telefónico" className="entrada" />
                        </div>

                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="correo">Correo electrónico</label>
                            <input id="correo" type="text" placeholder="Correo electrónico" className="entrada" />
                        </div>
                    </div>
                </div>

                <div className="ml-10 mt-2 container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="ocupacion">Ocupación</label>
                            <textarea id="ocupacion" placeholder="Ocupación" className="text-amplio"></textarea>
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="colonia">Colonia</label>
                            <textarea id="colonia" type="text" placeholder="Colonia" className="entrada" />
                        </div>
                        <div className="col">
                            <label className="form-label etiqueta" htmlFor="direccion">Direccción</label>
                            <textarea id="direccion" placeholder="Calle, No.Externo o Interno, CP" className="entrada" />
                        </div>
                    </div>
                </div>

                <div className="pt-1 mt-3 mb-3 text-center">
                    <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                </div>

            </form>

        </div>
    )
}