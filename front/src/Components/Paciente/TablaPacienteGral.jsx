import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaPacienteGral() {
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
            const response = await axios.get('http://127.0.0.1:8000/api/pacientes/', {
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
                <label className="">Fecha</label>
                <input type="date" value={fechaActual} readOnly />
                <label className="">Enfermero(a) responsable: </label>
                <input type="text" value={nombre} readOnly />

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="">No.Expediente</th>
                            <th className="">CURP</th>
                            <th className="">Nombre</th>
                            <th className="">Edad</th>
                            <th className="">Sexo</th>
                            <th className="">Número telefónico</th>
                            <th className="">Colonia</th>
                            <th className="">Dirección</th>
                            <th className="">Nacionalidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detallesPacientes.map((paciente, index) => (
                            <tr key={index}>
                                <td className="">{paciente.no_expediente}</td>
                                <td className="">{paciente.curp}</td>
                                <td className="">{paciente.datosPersonalesPacient.nombre + " " + paciente.datosPersonalesPacient.apellidoP + " " + paciente.datosPersonalesPacient.apellidoM}</td>
                                <td className="">{paciente.datosPersonalesPacient.edad}</td>
                                <td className="">{paciente.datosPersonalesPacient.sexo}</td>
                                <td className="">{paciente.datosContactoPacient.telefono}</td>
                                <td className="">{paciente.datosDireccionPacient.colonia}</td>
                                <td className="">{paciente.datosDireccionPacient.direccion}</td>
                                <td className="">{paciente.datosPersonalesPacient.nacionalidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
