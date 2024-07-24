import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"
import generarPDF from "./HojaDiariaPDF";

export function TablaOdontologia() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [cedula, setCedula] = useState(null)
    const [historialOdonto, setHistorialOdonto] = useState([])
    const [detallesPacientes, setDetallesPacientes] = useState([])
    const [diagnosticos, setDiagnosticos] = useState([])
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

    const getHistorialOdonto = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/historial_odonto_home/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setHistorialOdonto(response.data)

            const numExp = response.data.map(historial => historial.paciente)
            const idHistorial = response.data.map(historial => historial.id)
            setDetallesPacientes([]) // Limpiar detalles de pacientes
            getDetallesPaciente(numExp)
            getNotaEvo(idHistorial)

        } catch (error) {
            console.error('Error al obtener las fichas técnicas:', error);
        }
    }

    const getNotaEvo = async (idHistoriales) => {
        try {
            const dnotaPromises = idHistoriales.map(async idHistorial => {
                const response = await axios.get(`http://127.0.0.1:8000/api/notas_evo_relacionadas/${idHistorial}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                return response.data;
            })

            const notas = await Promise.all(dnotaPromises);
            setDiagnosticos(notas) // Actualizar el estado de diagnosticos
            console.log(diagnosticos)
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
        if (referencia.referencia.referencia) {
            return "Sí"
        } else {
            return "No"
        }
    }

    const convertirEstudios = (estudios) => {
        if (estudios.referencia.estudios) {
            return "Sí"
        } else {
            return "No"
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getHistorialOdonto();
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <BusquedaPaciente isMostrarExp={true}></BusquedaPaciente>

            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_odonto">Nombre del odontólogo</label>
                <input type="text" id="nombre_odonto" name="nombre_odonto" className="entrada" value={nombre} readOnly />
                <label className="etiqueta" htmlFor="cedula">Cedula profesional</label>
                <input type="text" id="cedula" name="cedula" className="entrada" value={cedula} readOnly />
                <label className="etiqueta">Localidad sede: Coatzacoalcos</label>

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarPDF(nombre, cedula, historialOdonto, diagnosticos, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en PDF
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
                        {historialOdonto.map((historial, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{historial.paciente}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.sexo}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{convertirReferencia(historial)}</td>
                                <td className="etiqueta">{convertirEstudios(historial)}</td>
                                <td className="etiqueta">
                                    {diagnosticos[index]?.length > 0 ? diagnosticos[index][0].diagnostico : '-'}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
