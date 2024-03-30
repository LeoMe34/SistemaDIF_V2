import { useNavigate } from 'react-router-dom'

export function PacienteIndividual({ paciente }) {

    const navegador = useNavigate()

    //Lo que se mostrara por cada paciente
    return (
        <div className='datos-busqueda mb-2'
        /*onClick = {() =>{
            navegador('/paciente/' + paciente.id)
        }}*/
        >
            {/*Datos ue se muestran del paciente*/}
            <h1>{paciente.nombre} {paciente.apellido_paterno} {paciente.apellido_materno}</h1>
            <p>{paciente.no_expediente}</p>
            <p>{paciente.curp}</p>

            {paciente.id && <button className='btn-ver mx-1' onClick={async () => {
                navegador('/ver_paciente/' + paciente.id)}}>
                Ver
            </button>}

            {/*<buscar el paciente para editarlo o eliminarlo*/}
            {paciente.id && <button className='btn-editar mx-1' onClick={async () => {
                navegador('/modificar_paciente/' + paciente.id)
            }}>
                Editar
            </button>}

            {/*Para eliminar */}
            {paciente.id && <button className="btn-eliminar mx-1" onClick={async () => {
                const aceptado = window.confirm('¿Estas seguro de eliminar el registro?')
            }}>
                Eliminar
            </button>}
        </div>
    )
}