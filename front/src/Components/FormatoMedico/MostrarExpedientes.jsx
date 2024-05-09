import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import { useNoExpediente } from '../../Contexto/NoExpedienteContext';
import { CardPaciente } from "../Paciente/CardPaciente";

export function MostrarExpedientes() {
    const { token } = useAuth();
    const { noExpediente } = useNoExpediente(); // Obtener noExpediente del contexto
    const [expedientes, setExpedientes] = useState([]);
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
    const navegador = useNavigate()

    const getExpedientes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fichas_por_paciente/${noExpediente}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
            setExpedientes(response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    }

    const toggleExpediente = (expedienteId) => {
        if (expedienteSeleccionado === expedienteId) {
            setExpedienteSeleccionado(null); // Si el expediente ya está seleccionado, lo cerramos
        } else {
            setExpedienteSeleccionado(expedienteId); // Si no, lo seleccionamos
        }
    }

    const handleEnfermeria = (fecha)  => {
        navegador(`/mostrar_expediente/${fecha}`)
    }

    useEffect(() => {
        if (noExpediente) {
            getExpedientes();
        }
    }, [noExpediente, token]);

    return (
        <div className="container">
            <div className="mt-3 expediente-container">
                <CardPaciente id={noExpediente}></CardPaciente>
                
                {expedientes.map(expediente => (
                    <div key={expediente.id} className="expediente-item">
                        <div className="expediente-info" onClick={() => toggleExpediente(expediente.id)}>
                            <i className={`bi bi-folder${expediente.id === expedienteSeleccionado ? "2-open" : ""} folder`}></i>
                            <p className="texto_1"> {expediente.fecha}</p>   
                        </div>
                        {expediente.id === expedienteSeleccionado && (
                            <div className="">
                                <p className="texto_2 cursor-pointer" onClick={() => handleEnfermeria(expediente.fecha)}>Ficha Tecnica Enfermeria</p>
                                <p className="texto_2">Ficha Tecnica Medica</p>
                                <p className="texto_2">Historial clinico</p>
                                <p className="texto_2">Recetas</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
