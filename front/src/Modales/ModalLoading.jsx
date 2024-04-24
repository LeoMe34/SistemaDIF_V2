import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const showLoading = () => {
  MySwal.fire({
    title: 'Cargando',
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 2000,
    onOpen: () => {
      MySwal.showLoading();
    }
  }).then((result) => {
    if (result.dismiss === 'timer') {
      console.log('closed by timer!!!!');
      MySwal.fire({ 
        title: 'Finished!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
};
