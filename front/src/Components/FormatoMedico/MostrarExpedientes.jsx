import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';

export function MostrarExpedientes() {
    const { token } = useAuth()
    const { noExpediente } = useNoExpediente(); // Obtener noExpediente del contexto
    const [expedientes, setExpedientes] = useState([])

    const getExpedientes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fichas_por_paciente/${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setExpedientes(response.data)
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    }

    useEffect(() => {
        if (noExpediente) {
            getExpedientes();
        }
    }, [noExpediente, token]);

    return (
        <div className="container">
            <div className="mt-3 expediente-container">
                {expedientes.map(expediente => (
                    <div key={expediente.id} className="expediente-item">
                        <Link to={`/mostrar_expediente/${expediente.fecha}`}>
                            <i className="bi bi-folder folder"> </i>
                            <p className="texto_1"> {expediente.fecha}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
