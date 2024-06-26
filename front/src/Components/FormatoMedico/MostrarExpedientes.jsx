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
    const navegador = useNavigate();
    const [userGroup, setUserGroup] = useState(null);
    const [fichaMedica, setFichaMedica] = useState(null);
    const [fichaMedicaOdonto, setFichaMedicaOdonto] = useState(null);
    const [historiaClinica, setHistoriaClinica] = useState(null);
    const [historiaOdonto, setHistoriaOdonto] = useState(null);
    const [notaMedica, setNotaMedica] = useState(null);
    const [notaEvolucion, setNotaEvolucion] = useState(null);
    const [receta, setReceta] = useState(null);

    useEffect(() => {
        const getIdUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                const group_usuario = response.data.user_info.name;
                setUserGroup(group_usuario);
                console.log(response);
            } catch (error) {
                console.error('Error al obtener ID de empleado:', error);
            }
        };
        getIdUser();

    }, [token]);

    const getExpedientes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/fichas_por_paciente/${noExpediente}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setExpedientes(response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const toggleExpediente = (expediente) => {
        if (expedienteSeleccionado === expediente.id) {
            // Si el expediente ya está seleccionado, lo cerramos
            setExpedienteSeleccionado(null);
            setFichaMedica(null);
            setHistoriaClinica(null);
            setNotaMedica(null);
            setReceta(null);
            setHistoriaOdonto(null);
            setNotaEvolucion(null);
            setFichaMedicaOdonto(null);
        } else {
            // Si no, lo seleccionamos
            setExpedienteSeleccionado(expediente.id);
            if (userGroup === "Medico") {
                getFichasMedicas(expediente.fecha);
            } else if (userGroup === "Odontologo") {
                getHistoriaOdonto(expediente.fecha);
            }
            // Restablecemos los estados para asegurarnos de que se actualicen correctamente
            setFichaMedica(null);
            setHistoriaClinica(null);
            setNotaMedica(null);
            setReceta(null);
            setHistoriaOdonto(null);
            setNotaEvolucion(null);
            setFichaMedicaOdonto(null);
        }
    };


    //Medicina
    const getFichasMedicas = async (fecha) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_ficha_medica/${noExpediente}/${fecha}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaMedica(response.data);
            console.log('Datos de ficha médica:', response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const getHistoriaClinica = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_historia_clinica/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setHistoriaClinica(response.data);
            console.log('Datos del historial clínico:', response.data);
        } catch (error) {
            console.error('Error al obtener el historial clínico:', error);
        }
    };

    const getNotaMedica = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_detalles_NM/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setNotaMedica(response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    const getReceta = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_receta/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setReceta(response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    //Odonto
    const getHistoriaOdonto = async (fecha) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_hist_odonto/${noExpediente}/${fecha}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setHistoriaOdonto(response.data);
            console.log('Datos del historial odontologico:', response.data);
        } catch (error) {
            console.error('Error al obtener el historial clínico:', error);
        }
    };

    const getNotaEvolucion = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/notas_evo_relacionadas/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setNotaEvolucion(response.data[0]);
            console.log('Datos del historial odontologico:', response.data);
        } catch (error) {
            console.error('Error al obtener la nota médica:', error);
        }
    };

    const getFichasMedicasOdonto = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_fichaMed_Odonto/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setFichaMedicaOdonto(response.data);
            console.log('Datos de ficha médica:', response.data);
        } catch (error) {
            console.error('Error al obtener ID del historial médico:', error);
        }
    };

    const handleEnfermeria = (fecha) => {
        navegador(`/mostrar_expediente/${fecha}`);
    };

    const handleFichaMedica = (fecha) => {
        navegador(`/ficha_tecnica_medico/${fecha}`);
    };

    const handleHistorialMedico = (fecha) => {
        navegador(`/historial_clinico/${noExpediente}/${fecha}`);
    };

    const handleNotaMedica = (fecha) => {
        navegador(`/nota_medica/${noExpediente}/${fecha}`);
    };

    const handleReceta = (fecha) => {
        navegador(`/receta/${noExpediente}/${fecha}`);
    };

    const handleOdonto = (fecha) => {
        navegador(`/mostrar_expediente_HistO/${fecha}`);
    };

    const handleOdontoNotEvo = (fecha) => {
        navegador(`/mostrar_nota_evo/${noExpediente}/${fecha}`);
    };

    const handleOdontoFichMed = (fecha) => {
        navegador(`/mostrar_fichaMed_Odont/${noExpediente}/${fecha}`);
    };

    useEffect(() => {
        if (noExpediente) {
            getExpedientes();
            console.log("1")
        }
    }, [noExpediente, token]);

    useEffect(() => {
        if (userGroup === "Medico" && fichaMedica?.id) {
            getHistoriaClinica(fichaMedica.id);
            console.log("2")
        }
    }, [fichaMedica]);

    useEffect(() => {
        if (userGroup === "Odontologo" && historiaOdonto?.id) {
            getNotaEvolucion(historiaOdonto.id);
        }
    }, [historiaOdonto]);

    useEffect(() => {
        if (userGroup === "Medico" && historiaClinica?.id) {
            getNotaMedica(historiaClinica.id);
            console.log("4")
        }
    }, [historiaClinica]);

    useEffect(() => {
        if (userGroup === "Odontologo" && notaEvolucion?.id) {
            getFichasMedicasOdonto(notaEvolucion.id);
            console.log("5")
        }
    }, [notaEvolucion]);

    useEffect(() => {
        if (userGroup === "Medico" && notaMedica?.id) {
            getReceta(notaMedica.id);
            console.log("6")
        }
    }, [notaMedica]);

    return (
        <div className="container">
            <div className="mt-3 expediente-container">
                <CardPaciente id={noExpediente}></CardPaciente>

                {expedientes.map(expediente => (
                    <div key={expediente.id} className="expediente-item">
                        <div className="expediente-info" onClick={() => toggleExpediente(expediente)}>
                            <i className={`bi bi-folder${expediente.id === expedienteSeleccionado ? "2-open" : ""} folder cursor-pointer`}></i>
                            <p className="texto_1 cursor-pointer"> {expediente.fecha}</p>
                        </div>
                        {expediente.id === expedienteSeleccionado && (
                            <div className="">
                                {userGroup == "Medico" && fichaMedica && (
                                    <>
                                        <p className="texto_2 cursor-pointer" onClick={() => handleEnfermeria(expediente.fecha)}>Ficha Tecnica Enfermeria</p>
                                        {fichaMedica && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleFichaMedica(expediente.fecha)}>Ficha Tecnica Medica</p>
                                        )}
                                        {historiaClinica && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleHistorialMedico(expediente.fecha)}>Historial clinico</p>
                                        )}
                                        {notaMedica && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleNotaMedica(expediente.fecha)}>Nota Medica</p>
                                        )}
                                        {receta && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleReceta(expediente.fecha)}>Recetas</p>
                                        )}
                                    </>)}
                                {userGroup == "Odontologo" && historiaOdonto && (
                                    <>
                                        <p className="texto_2 cursor-pointer" onClick={() => handleEnfermeria(expediente.fecha)}>Ficha Tecnica Enfermeria</p>
                                        {historiaOdonto && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleOdonto(expediente.fecha)}>Historial clinico dental</p>
                                        )}
                                        {notaEvolucion && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleOdontoNotEvo(expediente.fecha)}>Nota evolucion</p>
                                        )}
                                        {fichaMedicaOdonto && (
                                            <p className="texto_2 cursor-pointer" onClick={() => handleOdontoFichMed(expediente.fecha)}>Ficha tecnica medicina</p>
                                        )}
                                    </>)}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
