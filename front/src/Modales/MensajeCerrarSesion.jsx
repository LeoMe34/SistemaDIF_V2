import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)

export const mensajeCerrarSesion = (token) => {
    const navegador = useNavigate();

    MySwal.fire({
        title: "¿Estás seguro de cerrar sesión?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // Realizar la solicitud de cierre de sesión a la API
                const url = "http://127.0.0.1:8000/api/logout/"
                await axios.post(url, {}, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                MySwal.fire("Se ha cerrado la sesión", "", "success");
                navegador("/")

            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                MySwal.fire("Hubo un error al cerrar la sesión", "", "error");
            }
        }
    })
};



