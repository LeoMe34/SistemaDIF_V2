import './App.css'
import { Footer } from './Partials/Footer'
import { NavBarSimple } from './Partials/NavBarSimple';
import { NavBarBusqueda } from './Partials/NavBarBusqueda';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el archivo JavaScript de Bootstrap (con Popper.js)
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <NavBarBusqueda/>
      <NavBarSimple/>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
