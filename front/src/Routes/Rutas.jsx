import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'
import { V_CrearEmpleado } from '../Views/Empleado/V_CrearEmpleado'
import { V_CrearUsuario } from '../Views/Empleado/V_CrearUsuario'
import { V_FichaTecnicaMedico } from '../Views/FormatoMedico/V_FichaTecnicaMedico'
import { V_AntHerPat } from '../Views/FormatoOdonto/V_AntHerPat'
import { V_AntPerPato } from '../Views/FormatoOdonto/V_AntPerPato'
import { V_Antecedentes } from '../Views/FormatoOdonto/V_Antecedentes'
import { V_HistClinDent } from '../Views/FormatoOdonto/V_HistClinDent'

export function Rutas() {
    return (
        <div>


            <div>
                <Routes>
                    <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />
                    <Route path='/crear_empleado' element={<V_CrearEmpleado />} />
                    <Route path='/crear_usuario' element={<V_CrearUsuario />} />
                    <Route path='/ficha_tecnica_medico' element={<V_FichaTecnicaMedico />} />
                    <Route path='/ant_her_pat' element={<V_AntHerPat />} />
                    <Route path='/ant_pers_pat' element={<V_AntPerPato />} />
                    <Route path='/antecedente' element={<V_Antecedentes />} />
                    <Route path='/hist_dent' element={<V_HistClinDent />} />


                </Routes>
            </div>

        </div>
    )
}
