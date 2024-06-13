import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaPacientePsico() {
    const { token } = useAuth();
    const [nombre, setNombre] = useState(null);
    const [detallesPacientes, setDetallesPacientes] = useState([]);
    const [fechaActual, setFechaActual] = useState('');

    const getNoEmpleado = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const nombre = response.data.user_info.nombre_empleado;
            setNombre(nombre);
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    };

    const getDetallesPaciente = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/pacientes_psicologia/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDetallesPacientes(response.data);
        } catch (error) {
            console.error('Error al obtener detalles del paciente:', error);
        }
    };

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    useEffect(() => {
        getNoEmpleado();
        getDetallesPaciente();
    }, [token]);

    return (
        <div className="container">
            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_recepcion">Recepcionista responsable: </label>
                <input type="text" id="nombre_recepcion" name="nombre_recepcion" className="entrada" value={nombre} readOnly />

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">No.Expediente</th>
                            <th className="etiqueta">CURP</th>
                            <th className="etiqueta">Nombre</th>
                            <th className="etiqueta">Edad</th>
                            <th className="etiqueta">Número telefónico</th>
                            <th className="etiqueta">Colonia</th>
                            <th className="etiqueta">Dirección</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detallesPacientes.map((paciente, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{paciente.no_expediente}</td>
                                <td className="etiqueta">{paciente.curp}</td>
                                <td className="etiqueta">{paciente.datosPersonalesPacient.nombre + " " + paciente.datosPersonalesPacient.apellidoP + " " + paciente.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{paciente.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{paciente.datosContactoPacient.telefono}</td>
                                <td className="etiqueta">{paciente.datosDireccionPacient.colonia}</td>
                                <td className="etiqueta">{paciente.datosDireccionPacient.direccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
