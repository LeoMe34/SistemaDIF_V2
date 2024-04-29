import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

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
            const cedula = response.data.user_info.cedula_profesional
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

    const getFechaActual = () => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // Formateamos la fecha como 'YYYY-MM-DD'
        setFechaActual(formattedDate);
    }

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
        getFechaActual()
    }, [token, noEmpleado])

    return (
        <div className="container">
            <div className="">
                <label className="">Fecha</label>
                <input type="date" value={fechaActual} readOnly/>
                <label className="">Psicólogo(a): </label>
                <input type="text" value={nombre} readOnly/>
                <label className="">Cedula profesional</label>
                <input type="text" value={cedula} readOnly/>


                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="">No.Expediente</th>
                            <th className="">Nombre</th>
                            <th className="">Edad</th>
                            <th className="">Domicilio</th>
                            <th className="">Teléfono</th>
                            <th className="">Motivo de consulta</th>
                            <th className="">Valoración</th>
                            <th className="">Visita</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fichalPsico.map((ficha, index) => (
                            <tr key={index}>
                                <td className="">{ficha.paciente}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="">{detallesPacientes[index]?.datosDireccionPacient?.direccion + ", " + detallesPacientes[index]?.datosDireccionPacient?.colonia}</td>
                                <td className="">{detallesPacientes[index]?.datosContactoPacient?.telefono}</td>
                                <td className="">{convertirConsulta(ficha.visita.tipo_consulta)}</td>
                                <td className="">{ficha.tratamiento.valoracion}</td>
                                <td className="">{convertirVisita(ficha.visita.tipo_visita)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
