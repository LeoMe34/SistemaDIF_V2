import { Routes, Route } from 'react-router-dom'
import { V_Login } from '../Views/Sesion/V_Login'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'
import { V_CrearEmpleado } from '../Views/Empleado/V_CrearEmpleado'
import { V_CrearUsuario } from '../Views/Empleado/V_CrearUsuario'
import { V_FichaTecnicaMedico } from '../Views/FormatosCompartidos/V_FichaTecnicaMedico'
import { V_HistoriaClinica } from '../Views/FormatoMedico/V_HistoriaClinica'
import { V_NotasMedicas } from '../Views/FormatoMedico/V_NotasMedicas'
import { V_FichaTecnicaPsiologia } from '../Views/FormatoPsico/V_FichaTecnicaPsicologia'
import { V_AntHerPat } from '../Views/FormatoOdonto/V_AntHerPat'
import { V_AntPerPato } from '../Views/FormatoOdonto/V_AntPerPato'
import { V_Antecedentes } from '../Views/FormatoOdonto/V_Antecedentes'
import { V_HistClinDent } from '../Views/FormatoOdonto/V_HistClinDent'
import { V_CrearPaciente } from '../Views/Paciente/V_CrearPaciente'
import { V_NotaSubsecuente } from '../Views/FormatoOdonto/V_NotaSubsecuente'
import { V_NotaEvolucion } from '../Views/FormatoOdonto/V_NotaEvolucion'

export function Rutas() {
    return (
        <div>
            <div>
                <Routes>
<<<<<<< HEAD
                    <Route path='/login' element={<V_Login />} />
=======
                    <Route path='/' element={<V_Login />} />
>>>>>>> e20854e26730605aecd55f0a552a082b4e2f3de5
                    <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />
                    <Route path='/crear_empleado' element={<V_CrearEmpleado />} />
                    <Route path='/crear_usuario' element={<V_CrearUsuario />} />
                    <Route path='/ficha_tecnica_medico' element={<V_FichaTecnicaMedico />} />
                    <Route path='/historia_clinica_simplificada' element={<V_HistoriaClinica />} />
                    <Route path='/notas_medicas' element={<V_NotasMedicas />} />
                    <Route path='/ficha_tecnica_psicologia' element={<V_FichaTecnicaPsiologia />} />
                    <Route path='/antecedente' element={<V_Antecedentes />} />
                    <Route path='/hist_dent' element={<V_HistClinDent />} />
                    <Route path='/crear_paciente' element={<V_CrearPaciente />} />
                    <Route path='/nota_subs' element={<V_NotaSubsecuente />} />
                    <Route path='/nota_evo' element={<V_NotaEvolucion />} />
<<<<<<< HEAD
=======


>>>>>>> e20854e26730605aecd55f0a552a082b4e2f3de5
                </Routes>
            </div>
        </div>
    )
}
