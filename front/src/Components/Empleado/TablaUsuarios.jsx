import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaUsuarios() {
    const { token } = useAuth()
    const [fecha, setFecha] = useState('')
    const [nombre, setNombre] = useState(null)
    const [detallesEmpleados, setDetalleEmpleado] = useState([])
    const navegador = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const empleadosPorPagina = 10; // Número de empleados por página

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

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFecha(formattedDate);
    }, []);

    const handleClick = (id) => {
        localStorage.setItem('idUsuario', id)
        navegador(`/usuario/${id}`);
    }

    useEffect(() => {
        getUsuario()
        getEmpleados();
    }, [token]);

    // Calcular los empleados para la página actual
    const indexOfLastEmpleado = currentPage * empleadosPorPagina;
    const indexOfFirstEmpleado = indexOfLastEmpleado - empleadosPorPagina;
    const empleadosActuales = detallesEmpleados.slice(indexOfFirstEmpleado, indexOfLastEmpleado);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">

            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fecha} readOnly />
                <label className="etiqueta" htmlFor="nombre_admin">Administrador</label>
                <input type="text" id="nombre_admin" name="nombre_admin" className="entrada" value={nombre} readOnly />
               
                <div className="pagination m-3 d-flex justify-content-end">
                    {Array.from({ length: Math.ceil(detallesEmpleados.length / empleadosPorPagina) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)} className="page-link">
                            {index + 1}
                        </button>
                    ))}
                </div>

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">No.Trabajador</th>
                            <th className="etiqueta">Nombre del empleado</th>
                            <th className="etiqueta">Cedula profesional</th>
                            <th className="etiqueta">Ocupación</th>
                            <th className="etiqueta">Teléfono</th>
                        </tr>
                    </thead>

                    <tbody>
                        {empleadosActuales.map((empleados, index) => (
                            <tr key={index} onClick={() => handleClick(empleados.usuario)}>
                                <td className="etiqueta">{empleados.no_trabajador}</td>
                                <td className="etiqueta">{empleados.nombre + " " + empleados.apellidoPaterno + " " + empleados.apellidoMaterno}</td>
                                <td className="etiqueta">{empleados.cedula_profesional}</td>
                                <td className="etiqueta">{empleados.ocupacion}</td>
                                <td className="etiqueta">{empleados.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination m-3">
                {Array.from({ length: Math.ceil(detallesEmpleados.length / empleadosPorPagina) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};
