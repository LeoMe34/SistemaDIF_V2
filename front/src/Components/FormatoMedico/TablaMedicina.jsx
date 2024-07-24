import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import generarPDF from "./HojaDiariaPDF";
import generarExcel from "./HojaDiariaExcel";

export function TablaMedicina() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [cedula, setCedula] = useState(null)
    const [historialClinico, setHistorialCLinico] = useState([])
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
    };

    const getHistorialClinico = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/historial_clinico_home/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setHistorialCLinico(response.data)

            const numExp = response.data.map(historial => historial.no_expediente.no_expediente)
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

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const convertirReferencia = (referencia) => {
        if (referencia.referenciaMed.referencia) {
            return "Sí"
        } else {
            return "No"
        }
    }

    const convertirEstudios = (estudio) => {
        switch (estudio) {
            case "0":
                return "Ninguno";
            case "1":
                return "Laboratorios";
            case "2":
                return "Ultrasonido";
            case "3":
                return "Tomografía";
            case "4":
                return "Rayos X";
            default:
                return "Ninguno";
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getHistorialClinico();
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <BusquedaPaciente isMostrarExp={true}></BusquedaPaciente>
            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_medico">Nombre del medico</label>
                <input type="text" id="nombre_medico" name="nombre_medico" className="entrada" value={nombre} readOnly />
                <label className="etiqueta" htmlFor="cedula">Cedula profesional</label>
                <input type="text" id="cedula" name="cedula" className="entrada" value={cedula} readOnly />
                <label className="etiqueta">Localidad sede: Coatzacoalcos</label>

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarPDF(nombre, cedula, historialClinico, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en PDF
                </button>

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarExcel(nombre, cedula, historialClinico, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en Excel
                </button>

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">Nombre</th>
                            <th className="etiqueta">No.Expediente</th>
                            <th className="etiqueta">Sexo</th>
                            <th className="etiqueta">Edad</th>
                            <th className="etiqueta">Referencia</th>
                            <th className="etiqueta">Estudios externos</th>
                            <th className="etiqueta">Diagnóstico </th>
                        </tr>
                    </thead>

                    <tbody>
                        {historialClinico.map((historial, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{historial.no_expediente.no_expediente}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.sexo}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{convertirReferencia(historial)}</td>
                                <td className="etiqueta">{convertirEstudios(historial.estudiosExter.estudios)}</td>
                                <td className="etiqueta">{historial.diagnostico.diagnostico}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
