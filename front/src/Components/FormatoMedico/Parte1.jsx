import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import BusquedaPaciente from "../Paciente/BuscarPaciente"

export function Parte1() {
    const navegador = useNavigate()    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { noExpediente } = useNoExpediente()    

    const enviar = handleSubmit(async data => {
        const datosCompletos = { ...data, noExpediente };

        localStorage.setItem('datos', JSON.stringify(datosCompletos));

        navegador('/historial_clinico_p2');
    });

    return (
        <div>
            <div className="mt-3 ml-10 container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item custom-link">
                            <a href="\home_medico">
                                <i className="bi bi-house-fill color-icono"></i>&nbsp;Home
                            </a>
                        </li>
                        <li className="breadcrumb-item custom-link" aria-current="page">
                            <a href="\ficha_tecnica_medico">
                                Ficha técnica de consulta médica
                            </a>
                        </li>
                        <li className="breadcrumb-item pag-actual" aria-current="page">Historia Clínica Simplificada</li>
                    </ol>
                </nav>
            </div>

            <div>
                <h3 className='subtitulo'>Historia Clínica Simplificada</h3>
                <BusquedaPaciente></BusquedaPaciente>

                <form onSubmit={enviar}>
                    <div className='ml-10 container'>
                        <div className='ml-10 mb-3'>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/*Se podria hacer que desde que incie sesion ponga en que consultorio esta 
                            para que ya no tenga que estar llenandolo */}
                                <label className='etiqueta' htmlFor="num_consultorio">N° consultorio: </label>
                                <input className="entrada" id='num_consultorio' name='num_consultorio' type="text"
                                    {...register("no_consultorio", { required: true })} />
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="fecha">Fecha:</label>
                                <input className="entrada" id='fecha' name='fecha' type="date"
                                    {...register("fecha", { required: true })} />
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="referencia">Referencia:</label>
                                <select className="opciones" id='referencia' name='referencia' type=""
                                    {...register("referencia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value={true}>Si</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="lugar">Lugar de referencia:</label>
                                <input className="entrada" id='lugar' name='lugar' type="text"
                                    {...register("lugar", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className='ml-10 container'>
                        <h4 className='subtitulo_2'> Información familiar</h4>
                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="tipo_familia">Tipo de familia: </label>
                                <select className="opciones" id='tipo_familia' name='tipo_familia' type=""
                                    {...register("tipo_familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">Nuclear</option>
                                    <option value="1">Extensa</option>
                                    <option value="2">Compuesta</option>
                                </select>

                            </div>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="rol_madre">Rol de madre: </label>
                                <select className="opciones" id='rol_madre' name='rol_madre' type=""
                                    {...register("rol_madre", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">No aplica</option>
                                    <option value="1">E-M</option>
                                    <option value="2">E-C</option>
                                    <option value="3">E-SD</option>
                                </select>
                            </div>
                        </div>

                        <h4 className='subtitulo_2'>Familiar responsable del paciente </h4>

                        <div className='row'>
                            <div className='col'>
                                <label className='etiqueta' htmlFor="familia">Familia:</label>
                                <select className="opciones" id='familia' name='familia' type=""
                                    {...register("familia", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="1">1</option>
                                    <option value="d">D</option>
                                </select>
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="disfuncional">Disfuncionales familiares:</label>
                                <select className="opciones" id='disfuncional' name='disfuncional' type=""
                                    {...register("disfuncional", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="informante">Informante: </label>
                                <input className="entrada" id='informante' name='informante' type="text"
                                    {...register("informante", { required: true })} />
                            </div>

                            <div className='col'>
                                <label className='etiqueta' htmlFor="estudios">Estudios externo: </label>
                                <select className="opciones" id='estudios' name='estudios' type=""
                                    {...register("estudios", { required: true })}>
                                    <option value="" selected disabled>Elija una opción</option>
                                    <option value="0">Ninguno</option>
                                    <option value="1">Laboratorios</option>
                                    <option value="2">Ultrasonido</option>
                                    <option value="3">Tomografía</option>
                                    <option value="4">Rayos X</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>

                    <div className="text-center">
                        <div className="pt-1 mb-3 text-center">
                            <button className="btn btn-guardar btn-lg btn-block">Siguiente</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}