import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Contexto/AuthContext';

export function TablaMedicina() {
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

    return (
        <div className="container">
            <div className="">
                <label className="">Fecha</label>
                <input type="date" />

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
                        <tr>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                            <td className="">{ }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
