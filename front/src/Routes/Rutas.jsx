import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { V_FichaTecnicaEnfermeria } from '../Views/FormatoEnfermeria/V_FichaTecnicaEnfermeria'

export function Rutas() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/ficha_tecnica_enfermeria' element={<V_FichaTecnicaEnfermeria />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}
