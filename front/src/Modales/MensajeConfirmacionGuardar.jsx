import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const mensajeConfirmacionGuardar = () => {

    MySwal.fire({
        title: "¿Estas seguro de guardar los registros",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("¡Se ha guardado con éxito!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
        }
    });

}