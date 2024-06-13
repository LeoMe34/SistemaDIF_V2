import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaAudiologo() {
    const { token } = useAuth()
    const [noEmpleado, setNoEmpleado] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [cedula, setCedula] = useState(null)
    const [detallesPacientes, setDetallesPacientes] = useState([])
    const [fichasMedicas, setFichasMedicas] = useState([])
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
            const cedula = response.data.user_info.cedula
            setNoEmpleado(no_Empleado)
            setNombre(nombre)
            setCedula(cedula)
            console.log(response)
        } catch (error) {
            console.error('Error al obtener ID de empleado:', error);
        }
    }

    const getFichasMedicas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ficha_medica/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            console.log(response.data)
            setFichasMedicas(response.data)

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

    const convertirReferencia = (referencia, lugarReferencia) => {
        if (referencia === "1") {
            return lugarReferencia;
        } else if (referencia === "2") {
            return "No";
        } else {
            return ""; // Manejar otros casos si es necesario
        }
    }


    const convertirVisita = (visita) => {
        switch (visita) {
            case "1":
                return "Primera vez"
            case "2":
                return "Subsecuente"
        }
    }

    useEffect(() => {
        getNoEmpleado();
        getFichasMedicas()
    }, [token, noEmpleado]);

    return (
        <div className="container">
            <div className="">
                <label className="etiqueta" htmlFor="fecha_hoy">Fecha</label>
                <input type="date" id="fecha_hoy" name="fecha_hoy" className="entrada" value={fechaActual} readOnly />
                <label className="etiqueta" htmlFor="nombre_audi">Nombre del audiólogo</label>
                <input type="text" id="nombre_audi" name="nombre_audi" className="entrada" value={nombre} readOnly />
                <label className="etiqueta" htmlFor="cedula">Cedula profesional</label>
                <input type="text" id="cedula" name="cedula" className="entrada" value={cedula} readOnly />

                <table className="mt-3 table table-bordered border-dark table-hover">
                    <thead className="">
                        <tr className="">
                            <th className="etiqueta">No.Expediente</th>
                            <th className="etiqueta">Nombre</th>
                            <th className="etiqueta">Visita</th>
                            <th className="etiqueta">Referencia</th>
                            <th className="etiqueta">Sexo</th>
                            <th className="etiqueta">Edad</th>
                            <th className="etiqueta">Diagnóstico</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fichasMedicas.map((ficha, index) => (
                            <tr key={index}>
                                <td className="etiqueta">{ficha.paciente}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.nombre + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoP + " " + detallesPacientes[index]?.datosPersonalesPacient.apellidoM}</td>
                                <td className="etiqueta">{convertirVisita(ficha.extras.visita)}</td>
                                <td className="etiqueta">{convertirReferencia(ficha.extras.referencia, ficha.extras.lugar_referencia)}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.sexo}</td>
                                <td className="etiqueta">{detallesPacientes[index]?.datosPersonalesPacient.edad}</td>
                                <td className="etiqueta">{ficha.diagnostico}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
