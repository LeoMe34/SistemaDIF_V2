import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import BuscarPacientePsico from "../Paciente/BuscarPacientePsico";
import generarPDF from "./HojaDiariaPDF";
import generarExcel from "./HojaDiariaExcel";

export function TablaPsicologia() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [cedula, setCedula] = useState(null)
    const [fichalPsico, setFichaPsico] = useState([])
    const [detallesPacientes, setDetallesPacientes] = useState([])
    const [fechaActual, setFechaActual] = useState('')


    const getNoEmpleado = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            const nombre = response.data.user_info.nombre_empleado
            const cedula = response.data.user_info.cedula
            setNoEmpleado(no_Empleado)
            setNombre(nombre)
            setCedula(cedula)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    }

    const getFichaPsico = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ficha_psicologia_home/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setFichaPsico(response.data)

            const numExp = response.data.map(ficha => ficha.paciente)
            setDetallesPacientes([]) // Limpiar detalles de pacientes
            getDetallesPaciente(numExp)

        } catch (error) {
            console.error('Error al obtener las fichas técnicas:', error);
        }
    }

    const getDetallesPaciente = async (numExpedientes) => {
        try {
            const detallesPromises = numExpedientes.map(async expediente => {
                const response = await axios.get(`http://127.0.0.1:8000/api/detalle_paciente/${expediente}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                return response.data;
            });

            const detalles = await Promise.all(detallesPromises);
            setDetallesPacientes(detalles);
        } catch (error) {
            console.error('Error al obtener detalles del paciente:', error);
        }
    }

    const convertirConsulta = (consulta) => {
        switch (consulta) {
            case "1":
                return "TDAH";
            case "2":
                return "Duelo";
            case "3":
                return "Problemas de pareja";
            case "4":
                return "Ansiedad";
            case "5":
                return "Problema conductual";
            case "6":
                return "Transtorno depresivo";
            case "7":
                return "Problema de aprendizaje";
            case "8":
                return "Separación de padres";
            case "9":
                return "Manejo de impulsos";
            case "10":
                return "Abuso sexual";
            case "11":
                return "Autoestima";
            case "12":
                return "Audiencia";
            case "13":
                return "Brigada";
            case "14":
                return "Terapia grupal";
            default:
                return "Ninguno";
        }
    }

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const convertirVisita = (visita) => {
        switch (visita) {
            case "1":
                return "Primera vez";
            case "2":
                return "Subsecuente";
            default:
                return "Ninguno";
        }
    }

    useEffect(() => {
        getNoEmpleado()
        getFichaPsico()
    }, [token, noEmpleado])

    return (
        <div className="container">
            <BuscarPacientePsico isMostrarExp={true}></BuscarPacientePsico>
            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_psico">Psicólogo(a): </label>
                <input type="text" id="nombre_psico" name="nombre_psico" className="entrada" value={nombre} readOnly />
                <label className="etiqueta" htmlFor="cedula">Cedula profesional</label>
                <input type="text" id="cedula" name="cedula" className="entrada" value={cedula} readOnly />

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarPDF(nombre, cedula, fichalPsico, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en PDF
                </button>

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarExcel(nombre, cedula, fichalPsico, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en Excel
                </button>


                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">No.Expediente</th>
                            <th className="etiqueta">Nombre</th>
                            <th className="etiqueta">Edad</th>
                            <th className="etiqueta">Domicilio</th>
                            <th className="etiqueta">Teléfono</th>
                            <th className="etiqueta">Motivo de consulta</th>
                            <th className="etiqueta">Valoración</th>
                            <th className="etiqueta">Visita</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fichalPsico.map((ficha, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{ficha.paciente}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosDireccionPacient?.direccion + ", " + detallesPacientes[index]?.datosDireccionPacient?.colonia}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosContactoPacient?.telefono}</td>
                                <td className="etiqueta">{convertirConsulta(ficha.visita.tipo_consulta)}</td>
                                <td className="etiqueta">{ficha.tratamiento.valoracion}</td>
                                <td className="etiqueta">{convertirVisita(ficha.visita.tipo_visita)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
