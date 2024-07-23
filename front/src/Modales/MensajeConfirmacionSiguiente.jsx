import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)

export const mensajeConfirmacionSiguiente = (tipoDato, rol, navegador, callback) => {
    MySwal.fire({
        title: "¿Estas seguro de continuar?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("¡Se ha guardado con éxito!", "", "success").then(() => {
                if (callback) callback();
                switch (tipoDato) {
                    case 'antecedentes':
                        if (rol === "Medico") {
                            navegador("/historial_clinico_p2")
                        } else if (rol === "Odontologo") {
                            navegador("/historial_odontologico_p2")
                        }
                        break;
                    case 'diagnostico':
                        if (rol === "Medico") {
                            navegador("/historial_clinico_p3")
                        } else if (rol === "Odontologo") {
                            navegador("/historial_odontologico_p3")
                        }
                        break;
                }
            })
        } else if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
        }
    });

}