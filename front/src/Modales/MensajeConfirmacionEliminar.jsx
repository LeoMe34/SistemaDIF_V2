import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const mensajeConfirmacionEliminar = () => {
    MySwal.fire({
        title: "¿Estas seguro de eliminarlo?",
        text: "Una vez eliminado no se podrá recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Eliminado con éxito!",
                text: "Tu registro fue eliminado",
                icon: "success"
            });
        }
    });
}