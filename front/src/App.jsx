import './App.css'
import { Footer } from './Partials/Footer'



//import { NavBarSimple } from './Partials/NavBarSimple';
//import { NavBarBusqueda } from './Partials/NavBarBusqueda';

import { Rutas } from './Routes/Rutas';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el archivo JavaScript de Bootstrap (con Popper.js)
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'react-hot-toast'
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuNave } from "./Components/MenuNav/MenuNave"
import { NavBarSimple } from "./Partials/NavBarSimple"


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBarSimple />
        <main className='sidebarState'>
          <MenuNave />
          <Rutas />
        </main>
        <footer>
          <Footer />
        </footer>

      </BrowserRouter>
    </>

  )
}


export default App
{/*
    <div>
      <header>
        {/*<NavBarBusqueda />
        <NavBarSimple />}
      </header>

      <div>
        <Rutas>
        </Rutas>
      </div>

      <footer>
        <Footer />
      </footer>

      </div>*/}
