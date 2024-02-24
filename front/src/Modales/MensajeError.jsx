import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const mensajeError = () => {
    MySwal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Revisa los campos nuevamente"    
    });
}