import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'
import { V_CrearEmpleado } from '../Views/Empleado/V_CrearEmpleado'
import { V_CrearUsuario } from '../Views/Empleado/V_CrearUsuario'
import { V_FichaTecnicaMedico } from '../Views/FormatoMedico/V_FichaTecnicaMedico'

export function Rutas() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />
                        <Route path='/crear_empleado' element={<V_CrearEmpleado />} />
                        <Route path='/crear_usuario' element={<V_CrearUsuario />} />
                        <Route path='/ficha_tecnica_medico' element={<V_FichaTecnicaMedico />} />                        
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}
