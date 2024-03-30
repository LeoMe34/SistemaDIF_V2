// NoExpedienteContext.js

import React, { createContext, useContext, useState } from 'react';

const NoExpedienteContext = createContext();

export const useNoExpediente = () => useContext(NoExpedienteContext);

export const NoExpedienteProvider = ({ children }) => {
  const [noExpediente, setNoExpediente] = useState(null);

  return (
    <NoExpedienteContext.Provider value={{ noExpediente, setNoExpediente }}>
      {children}
    </NoExpedienteContext.Provider>
  );
};
