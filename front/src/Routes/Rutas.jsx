import { Routes, Route } from 'react-router-dom'
import { V_Login } from '../Views/Sesion/V_Login'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'
import { V_CrearEmpleado } from '../Views/Empleado/V_CrearEmpleado'
import { V_CrearUsuario } from '../Views/Empleado/V_CrearUsuario'
import { V_FichaTecnicaMedico } from '../Views/FormatosCompartidos/V_FichaTecnicaMedico'

import { V_NotasMedicas } from '../Views/FormatoMedico/V_NotasMedicas'
import { V_FichaTecnicaPsiologia } from '../Views/FormatoPsico/V_FichaTecnicaPsicologia'
import { V_Antecedentes } from '../Views/FormatoOdonto/V_Antecedentes'
import { V_HistClinDent } from '../Views/FormatoOdonto/V_HistClinDent'
import { V_CrearPaciente } from '../Views/Paciente/V_CrearPaciente'
import { V_NotaSubsecuente } from '../Views/FormatoOdonto/V_NotaSubsecuente'
import { V_NotaEvolucion } from '../Views/FormatoOdonto/V_NotaEvolucion'
import { V_HomeAdmin } from '../Views/Homes/V_HomeAdmin'
import { V_HomeEnfermeria } from '../Views/Homes/V_HomeEnfermeria'
import { V_HomeMedico } from '../Views/Homes/V_HomeMedico'
import { V_HomeOdonto } from '../Views/Homes/V_HomeOdonto'
import { V_HomePsico } from '../Views/Homes/V_HomePsico'
import { V_Receta } from '../Views/FormatosCompartidos/V_Receta'
import { V_Usuario } from '../Views/Empleado/V_Usuario'
import { V_HomeRecepcionGral } from '../Views/Homes/V_HomeRecepcionGral'
import { V_HomeRecepcionPsico } from '../Views/Homes/V_HomeRecepcionPsico'
import { V_HomeNutricion } from '../Views/Homes/V_HomeNutricion'

import { V_HistoriaClinica1 } from '../Views/FormatoMedico/V_HistoriaClinica1'
import { V_HistoriaClinica2 } from '../Views/FormatoMedico/V_HistoriaClinica2'
import { V_HistoriaClinica3 } from '../Views/FormatoMedico/V_HistoriaClinica3'

import { V_CrearPacientePsico } from '../Views/Paciente/V_CrearPacientePsico'

import { ListaPacientes } from '../Components/Paciente/ListaPacientes'

import { V_HistorialOdonto1 } from '../Views/FormatoOdonto/V_HistorialOdonto1'
import { V_HistorialOdonto2 } from '../Views/FormatoOdonto/V_HistorialOdonto2'
import { V_HistorialOdonto3 } from '../Views/FormatoOdonto/V_HistorialOdonto3'

export function Rutas() {
    return (
        <div>
            <div>
                <Routes>
                    <Route path='/' element={<V_Login />} />
                    <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />
                    <Route path='/crear_empleado' element={<V_CrearEmpleado />} />
                    <Route path='/crear_usuario' element={<V_CrearUsuario />} />
                    <Route path='/ficha_tecnica_medico' element={<V_FichaTecnicaMedico />} />

                    <Route path='/notas_medicas' element={<V_NotasMedicas />} />
                    <Route path='/ficha_tecnica_psicologia' element={<V_FichaTecnicaPsiologia />} />
                    <Route path='/antecedente' element={<V_Antecedentes />} />
                    <Route path='/hist_dent' element={<V_HistClinDent />} />
                    <Route path='/crear_paciente' element={<V_CrearPaciente />} />
                    <Route path='/nota_subs' element={<V_NotaSubsecuente />} />
                    <Route path='/nota_evo' element={<V_NotaEvolucion />} />
                    <Route path='/receta' element={<V_Receta />} />
                    <Route path='/usuario' element={<V_Usuario />} />

                    <Route path='/home_administrador' element={<V_HomeAdmin />} />
                    <Route path='/home_enfermeria' element={<V_HomeEnfermeria />} />
                    <Route path='/home_medico' element={<V_HomeMedico />} />
                    <Route path='/home_odontologo' element={<V_HomeOdonto />} />
                    <Route path='/home_psicologia' element={<V_HomePsico />} />
                    <Route path='/home_recepcion_medica' element={<V_HomeRecepcionGral />} />
                    <Route path='/home_recepcion_psicologia' element={<V_HomeRecepcionPsico />} />
                    <Route path='/home_nutricion' element={<V_HomeNutricion />} />

                    <Route path='/pacientes' element={<ListaPacientes />} />
                    <Route path='/historial_clinico_p1' element={<V_HistoriaClinica1 />} />
                    <Route path='/historial_clinico_p2' element={<V_HistoriaClinica2 />} />
                    <Route path='/historial_clinico_p3' element={<V_HistoriaClinica3 />} />

                    <Route path='/crear_paciente_psicologia' element={<V_CrearPacientePsico />} />

                    <Route path='/historial_odontologico_p1' element={<V_HistorialOdonto1 />} />
                    <Route path='/historial_odontologico_p2' element={<V_HistorialOdonto2 />} />
                    <Route path='/historial_odontologico_p3' element={<V_HistorialOdonto3 />} />

                </Routes>
            </div>
        </div>
    )
}
