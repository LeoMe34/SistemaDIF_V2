import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

export const MensajeReceta = (navegador) => {
    MySwal.fire({
        title: "¿Quieres generar una receta",
        showDenyButton: true,        
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        if (result.isConfirmed) {
            navegador('/receta')
        } else if (result.isDenied) {
            navegador('/home_medico')
        }
    });

}