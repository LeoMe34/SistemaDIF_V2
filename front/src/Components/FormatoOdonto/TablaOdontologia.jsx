import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import BusquedaPaciente from "../Paciente/BuscarPaciente"


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
            const cedula = response.data.user_info.cedula_profesional
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

    const getFechaActual = () => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // Formateamos la fecha como 'YYYY-MM-DD'
        setFechaActual(formattedDate);
    }

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
        getFechaActual()
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <BusquedaPaciente isMostrarExp={true}></BusquedaPaciente>

            <div className="">
                <label className="">Fecha</label>
                <input type="date" value={fechaActual} readOnly />
                <label className="">Nombre del medico</label>
                <input type="text" value={nombre} readOnly />
                <label className="">Cedula profesional</label>
                <input type="text" value={cedula} readOnly />
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
                        {historialOdonto.map((historial, index) => (
                            <tr key={index}>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="">{historial.paciente}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.sexo}</td>
                                <td className="">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="">{convertirReferencia(historial)}</td>
                                <td className="">{convertirEstudios(historial)}</td>
                                <td className="">
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
