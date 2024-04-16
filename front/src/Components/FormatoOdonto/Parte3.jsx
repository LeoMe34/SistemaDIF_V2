{/*import { NavBarBusqueda } from "../../Partials/NavBarBusqueda"*/ }
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Contexto/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"

export function Parte3() {
    const navegador = useNavigate()
    const { token } = useAuth()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()    
    const [antecedentes, setAntecedentes] = useState(null);
    const [historialO, setHistorialO] = useState(null);
    const [noEmpleado, setNoEmpleado] = useState(null);


    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            setNoEmpleado(no_Empleado)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    const registrarHistOdonto = async (data) => {
        try {
            const url = "http://127.0.0.1:8000/api/registrar_histOdonto/"
            const respuesta = await axios.post(url, {
                fecha_elaboracion: historialO.fechaElaboracion,
                "referencia": {
                    referencia: historialO.referencia,
                    referencia_lugar: historialO.referenciaLugar,
                    subsecuente: historialO.subsecuente,
                    citado: historialO.citado,
                    estudios: historialO.estudios
                },
                "aparatosSistemas": {
                    respiratorio: data.respiratorio,
                    digestivo: data.digestivo,
                    neuro: data.neuro,
                    cardioV: data.cardioV,
                    muscoes: data.muscoes
                },
                padecimiento_actual: historialO.padecimiento,
                habitos_exteriores: data.habitos_ext,
                "cabeza": {
                    labios: data.labios,
                    mucosa: data.mucosa,
                    encias: data.encias,
                    lengua: data.lengua,
                    paladar_blando: data.paladar_blando,
                    paladar_duro: data.paladar_duro
                },
                "antHerediPato": {
                    diabetesH: antecedentes.diabetesH,
                    hipertH: antecedentes.hipertH,
                    tuberculoH: antecedentes.tuberculoH,
                    cancerH: antecedentes.cancerH,
                    cardioH: antecedentes.cardioH,
                    asmaH: antecedentes.asmaH,
                    epilepsiaH: antecedentes.epilepsiaH,
                    diabetes_parentesco: antecedentes.diabetesParentesco,
                    hipert_parentesco: antecedentes.hipertParentesco,
                    tuberculo_parentesco: antecedentes.tuberculoParentesco,
                    cancer_parentesco: antecedentes.cancerParentesco,
                    cardio_parentesco: antecedentes.cardioParentesco,
                    asma_parentesco: antecedentes.asmaParentesco,
                    epilepsia_parentesco: antecedentes.epilepsiaParentesco,

                },
                "antPersonPato": {
                    diabetes: antecedentes.diabetes,
                    hipert: antecedentes.hipert,
                    tuberculo: antecedentes.tuberculo,
                    cancer: antecedentes.cancer,
                    transfusion: antecedentes.transfusion,
                    quirurgicos: antecedentes.quirurgicos,
                    anestesicos: antecedentes.anestesicos,
                    alergicos: antecedentes.alergicos,
                    trauma: antecedentes.trauma
                },
                "personNoPato": {
                    vacuna: antecedentes.vacuna,
                    alimentacion: antecedentes.alimentacion,
                    fauna_nociva: antecedentes.fauna_nociva,
                    vivienda: antecedentes.vivienda,
                    adicciones: antecedentes.adicciones
                },
                "antGinecob": {
                    fecha_ultima_regla: antecedentes.fecha_ultima_regla,
                    fecha_ult_doc: antecedentes.fecha_ult_doc,
                    planificacion_fam: antecedentes.planificacion_fam
                },
                cuello_odont: data.cuello,
                paciente: historialO.noExpediente,
                empleado: noEmpleado
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.error("Ocurrió un error", error);
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('antecedentes');
        const storeData2 = localStorage.getItem('historialO')
        if (storedData && storeData2) {
            setAntecedentes(JSON.parse(storedData));
            setHistorialO(JSON.parse(storeData2))
        }
    }, []);

    useEffect(() => {        
        getNoEmpleado();
    }, [token]);

    const enviar = handleSubmit(async data => {
        registrarHistOdonto(data)
        navegador('/nota_subs1')
    })

    return (
        <div>
            <div className="ml-10 container">
                <form className="row" onSubmit={enviar}>
                    <h3 className="subtitulo">Exploración fisica</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="habitos">Habitos exteriores</label>
                            <textarea id="habitos" type="text" placeholder="Habitos" className="entrada" rows="10" cols="30"
                                {...register("habitos_ext", { required: true })} />
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Cabeza y cuello</h3>

                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="labio">Labios</label>
                            <input id="labio" type="text" placeholder="Revisión de labios" className="entrada"
                                {...register("labios", { required: true })} />
                        </div>

                        <div className="col">
                            <label className="etiqueta" htmlFor="mucosa">Mucosa oral</label>
                            <input id="mucosa" type="text" placeholder="Revisión de mucosa oral" className="entrada"
                                {...register("mucosa", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="encias">Encias</label>
                            <input id="encia" type="text" placeholder="Revisión de encias" className="entrada"
                                {...register("encias", { required: true })} />
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="lengua">Lengua</label>
                            <input id="lengua" type="text" placeholder="Revisión de lengua" className="entrada"
                                {...register("lengua", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorB">Paladar blando</label>
                            <input id="paladorB" type="text" placeholder="Revisión de palador blando" className="entrada"
                                {...register("paladar_blando", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="paladorD">Paladar duro</label>
                            <input id="paladorD" type="text" placeholder="Revisión de palador duro" className="entrada"
                                {...register("paladar_duro", { required: true })} />
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cuello">Cuello</label>
                            <input id="cuello" type="text" placeholder="Revisión de cuello" className="entrada"
                                {...register("cuello", { required: true })} />
                        </div>
                    </div>

                    <h3 className="subtitulo_2">Interrogatorio por aparatos y sistema</h3>
                    <div className='row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="respi">Respiratorio</label>
                            <input id="respi" type="text" placeholder="Sistema respiratorio" className="entrada"
                                {...register("respiratorio", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="digestivo">Digestivo</label>
                            <input id="digestivo" type="text" placeholder="Sistema digestivo" className="entrada"
                                {...register("digestivo", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="neuro">Neurológico</label>
                            <input id="neuro" type="text" placeholder="Sistema neurológico" className="entrada"
                                {...register("neuro", { required: true })} />
                        </div>
                    </div>

                    <div className='mt-3 row'>
                        <div className="col">
                            <label className="etiqueta" htmlFor="cardio">Cardiovasculares</label>
                            <input id="cardio" type="text" placeholder="Cardiovasculares" className="entrada"
                                {...register("cardioV", { required: true })} />
                        </div>
                        <div className="col">
                            <label className="etiqueta" htmlFor="musco">Muscoesqueleto</label>
                            <input id="musco" type="text" placeholder="Muscoesqueleto" className="entrada"
                                {...register("muscoes", { required: true })} />
                        </div>
                        <div className='col'></div>
                    </div>                

                    {/*Seccion del boton*/}
                    <div className="pt-1 mb-3 text-center">
                        <button className="btn btn-guardar btn-lg btn-block">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}