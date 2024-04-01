import React, { createContext, useContext, useState } from 'react';

const UsuarioIdContext = createContext();

export const useUsuarioId = () => useContext(UsuarioIdContext);

export const UsuarioIdProvider = ({ children }) => {
    const [usuarioId, setUsuarioId] = useState(null);
    return (
        <UsuarioIdContext.Provider value={{ usuarioId, setUsuarioId }}>
            {children}
        </UsuarioIdContext.Provider>
    );
};