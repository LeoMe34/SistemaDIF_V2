import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FichaTecnicaEnfermeria } from '../Components/FormatoEnfermeria/FichaTecnicaEnfermeria'

export function Rutas() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/ficha_tecnica_enfermeria' element={<FichaTecnicaEnfermeria />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}
