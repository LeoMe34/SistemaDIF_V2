import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaMedicina() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [historialClinico, setHistorialCLinico] = useState([])
    const [noExpediente, setNoExpediente] = useState([])

    const getNoEmpleado = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const no_Empleado = response.data.user_info.no_trabajador
            setNoEmpleado(no_Empleado)
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

            const historial = response.data
            const numExp = historial.map(historial => historial.paciente)

            setNoExpediente(numExp)

        } catch (error) {
            console.error('Error al obtener las fichas técnicas:', error);
        }
    }

    const getDetallesPaciente = async () => {
        try {
            const updatedHistorialClinico = await Promise.all(
                noExpediente.map(async expediente => {
                    const response = await axios.get(`http://127.0.0.1:8000/api/detalle_paciente/${expediente}`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    });
                    const pacienteData = response.data; // Ajustar según la estructura de los datos de tu API
                    return {
                        ...historialClinico.find(historial => historial.paciente === expediente), // Mantener las propiedades anteriores
                        nombre: pacienteData.datosPersonalesPacient.nombre + " " + pacienteData.datosPersonalesPacient.apellidoP
                            + " " + pacienteData.datosPersonalesPacient.apellidoM,
                        edad: pacienteData.datosPersonalesPacient.edad,
                        sexo: pacienteData.datosPersonalesPacient.sexo
                    };
                })
            );
            setHistorialCLinico(updatedHistorialClinico);
        } catch (error) {
            console.error('Error al obtener detalles del paciente:', error);
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getHistorialClinico()
    }, [token, noEmpleado]);

    useEffect(() => {
        if (noExpediente.length > 0) {
            getDetallesPaciente();
        }
    }, [noExpediente]);

    return (
        <div className="container">
            <div className="">
                <label className="">Fecha</label>
                <input type="date" />
                <label className="">Nombre del medico</label>
                <input type="text" />
                <label className="">Cedula profesional</label>
                <input type="text" />
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
                        {historialClinico.map(historial => (
                            <tr key={historial.id}>
                                <td className="">{historial.nombre}</td>
                                <td className="">{historial.paciente}</td>
                                <td className="">{historial.sexo}</td>
                                <td className="">{historial.edad}</td>
                                <td className="">{historial.referenciaMed.referencia}</td>
                                <td className="">{historial.estudiosExter.estudios}</td>
                                <td className="">{historial.diagnostico.diagnostico}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
