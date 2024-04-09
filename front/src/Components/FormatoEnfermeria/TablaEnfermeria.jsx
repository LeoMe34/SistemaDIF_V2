import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaEnfermeria() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [fichasTecnicas, setFichasTenicas] = useState([])
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

    const getFichasTecnicas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/fichas_home/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setFichasTenicas(response.data)

            const fichas = response.data
            const numExp = fichas.map(ficha => ficha.paciente)

            setNoExpediente(numExp)

        } catch (error) {
            console.error('Error al obtener las fichas técnicas:', error);
        }
    }

    const getDetallesPaciente = async () => {
        try {
            const updatedFichasTecnicas = await Promise.all(
                noExpediente.map(async expediente => {
                    const response = await axios.get(`http://127.0.0.1:8000/api/detalle_paciente/${expediente}`, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    });
                    const pacienteData = response.data; // Ajustar según la estructura de los datos de tu API
                    return {
                        ...fichasTecnicas.find(ficha => ficha.paciente === expediente), // Mantener las propiedades anteriores
                        nombre: pacienteData.datosPersonalesPacient.nombre,
                        nacionalidad: pacienteData.datosPersonalesPacient.nacionalidad
                    };
                })
            );
            setFichasTenicas(updatedFichasTecnicas);
        } catch (error) {
            console.error('Error al obtener detalles del paciente:', error);
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getFichasTecnicas()
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

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="">No.Expediente</th>
                            <th className="">Nombre</th>
                            <th className="">Servicio</th>
                            <th className="">Atención</th>
                            <th className="">Población</th>
                            <th className="">Nacionalidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fichasTecnicas.map(ficha => (
                            <tr key={ficha.id}>
                                <td className="">{ficha.paciente}</td>
                                <td className="">{ficha.nombre}</td>
                                <td className="">{ficha.servicio_enfermeria}</td>
                                <td className="">{ficha.datosDemograficos.embarazada}</td>
                                <td className="">{ficha.poblacion}</td>
                                <td className="">{ficha.nacionalidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
