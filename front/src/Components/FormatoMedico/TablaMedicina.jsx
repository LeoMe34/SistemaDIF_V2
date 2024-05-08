import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"

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
            const cedula = response.data.user_info.cedula_profesional
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

    const getFechaActual = () => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // Formateamos la fecha como 'YYYY-MM-DD'
        setFechaActual(formattedDate);
    }

    const convertirReferencia = (referencia) => {
        if (referencia.referenciaMed.referencia) {
            return "Sí"
        } else {
            return "No"
        }
    }

    const convertirEstudios= (estudio) => {
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
        getFechaActual()
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <BusquedaPaciente isMostrarExp={true}></BusquedaPaciente>
            <div className="">
                <label className="">Fecha</label>
                <input type="date" value={fechaActual} readOnly/>
                <label className="">Nombre del medico</label>
                <input type="text" value={nombre} readOnly/>
                <label className="">Cedula profesional</label>
                <input type="text" value={cedula} readOnly/>
                <label className="">Localidad sede: Coatzacoalcos</label>


                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="">Nombre</th>
                            <th className="">No.Expediente</th>
                            <th className="">Sexo</th>
                            <th className="">Edad</th>
                            <th className="">Referencia</th>
                            <th className="">Estudios externos</th>
                            <th className="">Diagnóstico </th>
                        </tr>
                    </thead>

                    <tbody>
                        {historialClinico.map((historial, index) => (
                            <tr key={index}>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="">{historial.no_expediente.no_expediente}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.sexo}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="">{convertirReferencia(historial)}</td>
                                <td className="">{convertirEstudios(historial.estudiosExter.estudios)}</td>
                                <td className="">{historial.diagnostico.diagnostico}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
