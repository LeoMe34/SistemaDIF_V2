import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';
import generarPDF from "./HojaDiariaPDF";
import generarExcel from "./HojaDiariaExcel";

export function TablaEnfermeria() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null)
    const [fichasTecnicas, setFichasTenicas] = useState([])
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
            setNoEmpleado(no_Empleado)
            setNombre(nombre)
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

            setDetallesPacientes([])
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

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFechaActual(formattedDate);
    }, []);

    const convertirServicio = (numeroServicio) => {
        switch (numeroServicio) {
            case "1":
                return "Consulta general";
            case "2":
                return "Curación";
            case "3":
                return "Retiro de puntos";
            case "4":
                return "Aplicación de medicamentos";
            case "5":
                return "DxTx";
        }
    }

    const convertirPoblacion = (ficha) => {
        if (ficha.datosDemograficos.embarazada) {
            return "Embarazada"
        }
        else if (ficha.datosDemograficos.discapacitado) {
            return "Discapacitado"
        }
        else if (ficha.datosDemograficos.adulto_mayor) {
            return "Adulto mayor"
        }
        else {
            return "Ninguna"
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getFichasTecnicas()
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_enfermero">Enfermero(a) responsable: </label>
                <input type="text" id="nombre_enfermero" name="nombre_enfermero" className="entrada" value={nombre} readOnly />

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarPDF(nombre, fichasTecnicas, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en PDF
                </button>

                <button className="ml-10 btn btn-guardar btn-lg btn-block"
                    onClick={() => generarExcel(nombre, fichasTecnicas, detallesPacientes, fechaActual)}>
                    Descargar hoja diaria en Excel
                </button>

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">No.Expediente</th>
                            <th className="etiqueta">Nombre</th>
                            <th className="etiqueta">Edad</th>
                            <th className="etiqueta">Servicio</th>
                            <th className="etiqueta">Población</th>
                            <th className="etiqueta">Nacionalidad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fichasTecnicas.map((ficha, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{ficha.paciente}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{convertirServicio(ficha.servicio_enfermeria)}</td>
                                <td className="etiqueta">{convertirPoblacion(ficha)}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nacionalidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
