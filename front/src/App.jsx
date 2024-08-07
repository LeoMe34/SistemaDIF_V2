import './App.css'
import { Footer } from './Partials/Footer'
//import { NavBarBusqueda } from './Partials/NavBarBusqueda';
import { Rutas } from './Routes/Rutas';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el archivo JavaScript de Bootstrap (con Popper.js)
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'react-hot-toast'
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate, useLocation  } from 'react-router-dom'
import { MenuNave } from "./Components/MenuNav/MenuNave"
import { NavBarSimple } from "./Partials/NavBarSimple"
import { AuthProvider, useAuth } from './Contexto/AuthContext';
import { NoExpedienteProvider } from './Contexto/NoExpedienteContext';
import { UsuarioIdProvider } from './Contexto/UsuarioIdContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UsuarioIdProvider>
          <NoExpedienteProvider>
            <AuthContent />
            <Footer />
            <Toaster />
          </NoExpedienteProvider>
        </UsuarioIdProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AuthContent() {
  const { token } = useAuth();
  const location = useLocation()
  const isLoginPage = location.pathname === '/';
  const isPageNotFound = location.pathname === '/404' || location.pathname === '*';

  return (
    <main>
      {/*{!isLoginPage && token && <NavBarSimple />}*/}
      <div className={isLoginPage || isPageNotFound || !token ? '' : 'sidebarState'}>
        {!isLoginPage && !isPageNotFound && token && <MenuNave />}
        <Rutas />
      </div>
    </main>
  );
}

export default App;