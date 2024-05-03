import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

const MySwal = withReactContent(Swal)

export const cambiarContrasenia = (token, onSuccess) => {

    MySwal.fire({
        title: "Ingresa tu contraseña actual",
        input: "password",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Enviar",
        showLoaderOnConfirm: true,
        preConfirm: async (password) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/validar_contrasenia/', { password }, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                return response.data;
            } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Contraseña correcta",
                icon: "success"
            })
            if (onSuccess) onSuccess();
        }
    });
}
