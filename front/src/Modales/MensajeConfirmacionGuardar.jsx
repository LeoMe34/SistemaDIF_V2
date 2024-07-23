import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)

export const mensajeConfirmacionGuardar = (tipoDato, rol, navegador, callback) => {
    MySwal.fire({
        title: `¿Estas seguro de guardar los datos de${tipoDato}?`,
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("¡Se ha guardado con éxito!", "", "success").then(() => {
                if (callback) callback();
                switch (tipoDato) {
                    case ' la ficha tecnica':
                        if (rol === "Enfermero") {
                            navegador("/home_enfermeria")
                        } else if (rol === "Medico") {
                            navegador("/historial_clinico_p1")
                        } else if (rol === "Nutriologo") {
                            navegador("/home_nutricion")
                        } else if (rol === "audiologo") {
                            navegador("/home_audiologo")
                        } else if (rol === "oftalmologo") {
                            navegador("/home_oftalmologo")
                        } else if (rol === "Odontologo") {
                            navegador("/home_odontologo")
                        } else if (rol === "Psicologo") {
                            navegador("/home_psicologia")
                        }
                        break;
                    case 'l historial':
                        if (rol === "Medico") {
                            navegador("/notas_medicas")
                        } else if (rol === "Odontologo") {
                            navegador("/nota_evo")
                        }
                        break;
                    case ' la nota':
                        if (rol === "Odontologo") {
                            navegador("/ficha_medica")
                        }
                        break;
                    case ' la receta':
                        if (rol === "Medico") {
                            navegador("/home_medico")
                        }
                        break;
                    case 'l paciente':
                        if (rol === "Recepcion") {
                            navegador("/home_recepcion_medica")
                        } else if (rol === "recepcion_psico") {
                            navegador("/home_recepcion_psicologia")
                        }
                        break;
                    case 'l empleado':
                        navegador("/home_administrador")
                        break;
                    case 'l usuario':
                        navegador("/crear_empleado")
                        break;
                }
            })
        } else if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
        }
    });

}