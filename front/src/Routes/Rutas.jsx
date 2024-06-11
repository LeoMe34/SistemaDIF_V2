import { Routes, Route } from 'react-router-dom'
import { V_Login } from '../Views/Sesion/V_Login'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'
import { V_CrearEmpleado } from '../Views/Empleado/V_CrearEmpleado'
import { V_CrearUsuario } from '../Views/Empleado/V_CrearUsuario'
import { V_FichaTecnicaMedico } from '../Views/FormatoMedico/V_FichaTecnicaMedico'

import { V_NotasMedicas } from '../Views/FormatoMedico/V_NotasMedicas'
import { V_FichaTecnicaPsiologia } from '../Views/FormatoPsico/V_FichaTecnicaPsicologia'
import { V_Antecedentes } from '../Views/FormatoOdonto/V_Antecedentes'
import { V_HistClinDent } from '../Views/FormatoOdonto/V_HistClinDent'
import { V_CrearPaciente } from '../Views/Paciente/V_CrearPaciente'
import { V_NotaSubsecuente1 } from '../Views/FormatoOdonto/V_NotaSubsecuente1'
import { V_NotaSubsecuente2 } from '../Views/FormatoOdonto/V_NotaSubsecuente2'
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
import { V_HomeOftalmologo } from '../Views/Homes/V_HomeOftalmogo'
import { V_HomeAudiologo } from '../Views/Homes/V_HomeAudiologo'

import { V_HistoriaClinicaS } from '../Views/FormatoMedico/V_HistoriaClinica'
import { V_HistoriaClinica1 } from '../Views/FormatoMedico/V_HistoriaClinica1'
import { V_HistoriaClinica2 } from '../Views/FormatoMedico/V_HistoriaClinica2'
import { V_HistoriaClinica3 } from '../Views/FormatoMedico/V_HistoriaClinica3'

import { V_CrearPacientePsico } from '../Views/Paciente/V_CrearPacientePsico'
import { V_MostrarExpedientePsico } from '../Views/FormatoPsico/V_MostrarExpedientePsico'

import { ListaPacientes } from '../Components/Paciente/ListaPacientes'

import { V_HistorialOdonto1 } from '../Views/FormatoOdonto/V_HistorialOdonto1'
import { V_HistorialOdonto2 } from '../Views/FormatoOdonto/V_HistorialOdonto2'
import { V_HistorialOdonto3 } from '../Views/FormatoOdonto/V_HistorialOdonto3'
import { V_FichaMedicaO } from '../Views/FormatoOdonto/V_FichaMedicaO'

import { V_FichaTecnica } from '../Views/FormatoNutricion/V_FichaTecnica'
import { V_MostrarPaciente } from '../Views/Paciente/V_MostrarPacienteM'

import { V_MostrarUsuario } from '../Views/Empleado/V_MostrarUsuario'
import { V_MostrarExpedientes } from '../Views/FormatoMedico/V_MostrarExpedientes'
import { V_MostrarFichaEnfermeria } from '../Views/FormatoEnfermeria/V_MostrarFichaEnfermeria'
import { V_MostrarHistOdonto } from '../Views/FormatoOdonto/V_MostrarHistOdonto'
import { V_MostrarFichaTecnicaMedico } from '../Views/FormatoMedico/V_MostrarFichaTecnicaMedico'
import { V_MostrarNotaMedica } from '../Views/FormatoMedico/V_MostrarNotaMedica'
import { V_MostrarReceta } from '../Views/FormatoMedico/V_MostrarReceta'
import { V_MostrarNotaEvo } from '../Views/FormatoOdonto/V_MostrarNotaEvo'
import { V_MostrarFichaMedOdonto } from '../Views/FormatoOdonto/V_MostrarFichaMedOdonto'

import { V_MostrarFTP } from '../Views/FormatoPsico/V_MostrarFTP'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexto/AuthContext';

export function Rutas() {
    const { token } = useAuth()
    const [idUser, setIdUser] = useState(null);
    const [userGroup, setUserGroup] = useState(null);

    useEffect(() => {
        const getIdUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const id_usuario = response.data.user_info.is_superuser
                setIdUser(id_usuario)
                const group_usuario = response.data.user_info.name
                setUserGroup(group_usuario)
                console.log(response)
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();

    }, [token]);

    return (
        <div>
            <div>
                <Routes>
                    <Route path='/' element={<V_Login />} />
                    <Route path='/usuario' element={<V_Usuario />} />
                    <Route path='/pacientes' element={<ListaPacientes />} />

                    {idUser && (
                        <>
                            <Route path='/crear_empleado' element={<V_CrearEmpleado />} />
                            <Route path='/crear_usuario' element={<V_CrearUsuario />} />
                            <Route path='/home_administrador' element={<V_HomeAdmin />} />
                            <Route path='/usuario/:id' element={<V_MostrarUsuario />} />
                        </>
                    )}

                    {userGroup == "Enfermero" && (
                        <>
                            <Route path='/home_enfermeria' element={<V_HomeEnfermeria />} />,
                            <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />,
                            <Route path='/mostrar_expediente/:fecha' element={<V_MostrarFichaEnfermeria />} />
                        </>
                    )}

                    {userGroup == "Odontologo" && (
                        <>
                            <Route path='/home_odontologo' element={<V_HomeOdonto />} />,
                            <Route path='/historial_odontologico_p1' element={<V_HistorialOdonto1 />} />,
                            <Route path='/historial_odontologico_p2' element={<V_HistorialOdonto2 />} />,
                            <Route path='/historial_odontologico_p3' element={<V_HistorialOdonto3 />} />,
                            <Route path='/nota_subs1' element={<V_NotaSubsecuente1 />} />,
                            <Route path='/nota_subs2' element={<V_NotaSubsecuente2 />} />,
                            <Route path='/ficha_medica' element={<V_FichaMedicaO />} />,
                            <Route path='/nota_evo' element={<V_NotaEvolucion />} />,
                            <Route path='/mostrar_expediente' element={<V_MostrarExpedientes />} />,
                            <Route path='/mostrar_expediente/:fecha' element={<V_MostrarFichaEnfermeria />} />,
                            <Route path='/mostrar_expediente_HistO/:fecha' element={<V_MostrarHistOdonto />} />,
                            <Route path='/mostrar_nota_evo/:noExpediente/:fecha' element={<V_MostrarNotaEvo />} />,
                            <Route path='/mostrar_fichaMed_Odont/:noExpediente/:fecha' element={<V_MostrarFichaMedOdonto />} />,

                        </>
                    )}

                    {userGroup == "Medico" && (
                        <>
                            <Route path='/home_medico' element={<V_HomeMedico />} />,
                            <Route path='/ficha_tecnica_medico' element={<V_FichaTecnicaMedico />} />,
                            <Route path='/ficha_tecnica_medico/:fecha' element={<V_MostrarFichaTecnicaMedico />} />,
                            <Route path='/notas_medicas' element={<V_NotasMedicas />} />,
                            <Route path='/historial_clinico_p1' element={<V_HistoriaClinica1 />} />,
                            <Route path='/historial_clinico_p2' element={<V_HistoriaClinica2 />} />,
                            <Route path='/historial_clinico_p3' element={<V_HistoriaClinica3 />} />,
                            <Route path='/mostrar_expediente' element={<V_MostrarExpedientes />} />,
                            <Route path='/mostrar_expediente/:fecha' element={<V_MostrarFichaEnfermeria />} />,
                            <Route path='/historial_clinico/:noExpediente/:fecha' element={<V_HistoriaClinicaS />} />,
                            <Route path='/nota_medica/:noExpediente/:fecha' element={<V_MostrarNotaMedica />} />,
                            <Route path='/receta/:noExpediente/:fecha' element={<V_MostrarReceta />} />,
                            <Route path='/receta' element={<V_Receta />} />
                        </>
                    )}

                    {userGroup == "Psicologo" && (
                        <>
                            <Route path='/home_psicologia' element={<V_HomePsico />} />,
                            <Route path='/crear_paciente_psicologia' element={<V_CrearPacientePsico />} />,
                            <Route path='/ficha_tecnica_psicologia' element={<V_FichaTecnicaPsiologia />} />,
                            <Route path='/expediente_psicologia/:noExpediente/:fecha' element={<V_MostrarFTP />} />,
                            <Route path='/mostrar_expediente_psicologia' element={<V_MostrarExpedientePsico />} />,
                        </>
                    )}

                    {userGroup == "Nutriologo" && (
                        <>
                            <Route path='/ficha_tecnica' element={<V_FichaTecnica />} />,
                            <Route path='/home_nutricion' element={<V_HomeNutricion />} />
                        </>
                    )}

                    {userGroup == "oftalmologo" && (
                        <>
                            <Route path='/ficha_tecnica' element={<V_FichaTecnica />} />,
                            <Route path='/home_oftalmologo' element={<V_HomeOftalmologo />} />
                        </>
                    )}

                    {userGroup == "audiologo" && (
                        <>
                            <Route path='/ficha_tecnica' element={<V_FichaTecnica />} />,
                            <Route path='/home_audiologo' element={<V_HomeAudiologo />} />
                        </>
                    )}

                    {userGroup == "Recepcion" && (
                        <>
                            <Route path='/home_recepcion_medica' element={<V_HomeRecepcionGral />} />,
                            <Route path='/crear_paciente' element={<V_CrearPaciente />} />
                            <Route path='/mostrar_paciente/:noExpediente' element={<V_MostrarPaciente />} />
                        </>
                    )}

                    {userGroup == "recepcion_psico" && (
                        <>
                            <Route path='/crear_paciente_psicologia' element={<V_CrearPacientePsico />} />,
                            <Route path='/home_recepcion_psicologia' element={<V_HomeRecepcionPsico />} />
                        </>
                    )}
                    {/*<Route path='/antecedente' element={<V_Antecedentes />} />
                    <Route path='/hist_dent' element={<V_HistClinDent />} />*/}
                </Routes>
            </div>
        </div>
    )
}
