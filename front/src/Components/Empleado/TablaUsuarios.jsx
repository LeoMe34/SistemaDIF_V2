import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaUsuarios() {
    const { token } = useAuth()
    const [fecha, setFecha] = useState('')
    const [nombre, setNombre] = useState(null)
    const [detallesEmpleados, setDetalleEmpleado] = useState([])

    const getUsuario = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const nombre = response.data.user_info.nombre_empleado
            setNombre(nombre)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    }

    const getEmpleados = async () => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/api/get_todos_empleados/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response)
            setDetalleEmpleado(response.data)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    }

    const getFechaActual = () => {
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // Formateamos la fecha como 'YYYY-MM-DD'
        setFecha(formattedDate);
    }

    useEffect(() => {
        getUsuario()
        getEmpleados();
        getFechaActual()
    }, [token]);

    return (
        <div className="container">
            <div className="">
                <label className="">Fecha</label>
                <input type="date" value={fecha} />
                <label className="">Administrador</label>
                <input type="text" value={nombre} readOnly />

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="">No.Trabajador</th>                            
                            <th className="">Nombre del empleado</th>
                            <th className="">Cedula profesional</th>
                            <th className="">Ocupación</th>
                            <th className="">Teléfono</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detallesEmpleados.map((empleados, index) => (
                            <tr key={index} >
                                <td className="">{empleados.no_trabajador}</td>                                
                                <td className="">{empleados.nombre + " " + empleados.apellidoPaterno + " " + empleados.apellidoMaterno}</td>                                
                                <td className="">{empleados.cedula_profesional}</td>
                                <td className="">{empleados.ocupacion}</td>
                                <td className="">{empleados.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
