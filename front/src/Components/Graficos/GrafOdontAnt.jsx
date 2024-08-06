import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { useAuth } from '../../Contexto/AuthContext';
import generarExcelHCO from '../ExcelAdmin/HistorialOdontoExcel';
import generarExcelNE from '../ExcelAdmin/NotaEvolucionExcel';

const GrafOdontAnt = () => {
    const [data, setData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const { token } = useAuth();
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [detalleEnfermeria, setDetalleEnfermeria] = useState([]);
    const [detalleHistorial, setDetalleHistorial] = useState([]);
    const [detalleNota, setDetalleNota] = useState([]);
    const [detalleFicha, setDetalleFicha] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};
                if (month) params.month = month;
                if (year) params.year = year;

                const response = await axios.get('http://127.0.0.1:8000/api/get_graficosOdontAntH/', { params });
                setData(response.data);
            } catch (error) {
                console.error('Error en obtener los datos del grafico odonto:', error);
            }
        };

        setData([]);  // Limpia los datos anteriores
        fetchData();
        getHistorialOdonto();
    }, [month, year]);

    useEffect(() => {
        if (data.length === 0) {
            return; // No renderizar el gráfico si no hay datos
        }

        const chartDom = document.getElementById('graficoAntH');
        const myChart = echarts.init(chartDom);
        let option;

        if (chartType === 'bar') {
            option = {
                title: {
                    text: 'Cantidad de Personas con Antecedentes hereditarios',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                xAxis: {
                    type: 'category',
                    data: ['Diabetes', 'Hipertensión', 'Tuberculosis', 'Cancer', 'Cardiovascular', 'Asma', 'Epilepsia'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [data.diabetes_true, data.hipert_true, data.tuber_true, data.cancer_true, data.cardio_true, data.asma_true, data.epilepsia_true],
                        type: 'bar',
                        itemStyle: {
                            color: function (params) {
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B', '#FF7F50', '#87CEFA', '#32CD32', '#92A8D1'];
                                return colorList[params.dataIndex % colorList.length];
                            },
                        },
                        label: {
                            show: showLabels,
                            position: 'top',
                            color: '#000',
                            fontSize: 12,
                            formatter: '{c}' // Muestra el valor directamente
                        },
                    },
                ],
            };
        } else {
            option = {
                title: {
                    text: 'Cantidad de Personas con Antecedentes hereditarios',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Pacientes',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        data: [
                            { value: data.diabetes_true, name: 'Diabetes' },
                            { value: data.hipert_true, name: 'Hipertensión' },
                            { value: data.tuber_true, name: 'Tuberculosis' },
                            { value: data.cancer_true, name: 'Cancer' },
                            { value: data.cardio_true, name: 'Cardiovascular' },
                            { value: data.asma_true, name: 'Asma' },
                            { value: data.epilepsia_true, name: 'Epilepsia' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        itemStyle: {
                            color: (params) => {
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B', '#FF7F50', '#87CEFA', '#32CD32', '#92A8D1'];
                                return colorList[params.dataIndex];
                            }
                        },
                        label: {
                            show: showLabels,
                            position: 'center',
                            formatter: '{b}: {c} ({d}%)'
                        }
                    }
                ]
            };
        }

        console.log('Chart Option:', option);
        myChart.setOption(option);
        setChartInstance(myChart);

        return () => {
            myChart.dispose();
        };
    }, [data, showLabels, chartType]);

    const handleDownload = () => {
        if (chartInstance) {
            const imgURL = chartInstance.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            const link = document.createElement('a');
            link.href = imgURL;
            link.download = 'chart.png';
            link.click();
        }
    };

    const toggleLabels = () => {
        setShowLabels(prevShowLabels => !prevShowLabels);
    };

    const getHistorialOdonto = async () => {
        try {
            const params = {};
            if (month) params.month = month;
            if (year) params.year = year;

            const response = await axios.get('http://127.0.0.1:8000/api/get_historial_odonto_fecha/', {
                params: { month, year },
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setDetalleHistorial(response.data);
            console.log("Historial:", response.data);
        } catch (error) {
            console.error('Ocurrió un error al obtener el historial odontológico:', error);
        }
    };

    const getDetallesPaciente = async () => {
        try {
            const promises = detalleHistorial.map(ficha => {
                const url = `http://127.0.0.1:8000/api/detalle_paciente/${ficha.paciente}`;
                return axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            });

            const responses = await Promise.all(promises);
            const detalles = responses.map(response => response.data);
            setDetallePaciente(detalles);
            console.log("Detalles Paciente:", detalles);
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };

    const getDetallesEnfermeria = async () => {
        try {
            const promises = detalleHistorial.map(ficha => {
                const url = `http://127.0.0.1:8000/api/get_ficha_enfermeria/${ficha.paciente}/${ficha.fecha_elaboracion}/`;
                return axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            });

            const responses = await Promise.all(promises);
            const detalles = responses.map(response => response.data);
            setDetalleEnfermeria(detalles);
            console.log("Detalles Enfermería:", detalles);
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };

    const getDetallesNotas = async () => {
        try {
            const url = `http://127.0.0.1:8000/api/get_nota_odonto_fecha/`;
            const responses = await axios.get(url, {
                params: { month, year },
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setDetalleNota(responses.data);
            console.log("Detalles Notas:", detalles);
        } catch (error) {
            console.error('Ocurrió un error al obtener las notas de evolución:', error);
        }
    };


    const getDetallesFichas = async () => {
        try {
            const promises = detalleNota.map(nota => {
                const url = `http://127.0.0.1:8000/api/get_fichaMed_Odonto/${nota.id}`;
                return axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            });

            const responses = await Promise.all(promises);
            const detalles = responses.map(response => response.data);
            setDetalleFicha(detalles);
            console.log("Detalles Fichas:", detalles);
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };

    useEffect(() => {
        if (detalleHistorial.length > 0) {
            getDetallesPaciente();
            getDetallesEnfermeria();
            getDetallesNotas();
        }
    }, [token, detalleHistorial]);

    useEffect(() => {
        if (detalleNota.length > 0) {
            getDetallesFichas();
        }
    }, [token, detalleNota]);

    return (
        <div>
            <div>
                <button onClick={() => generarExcelHCO(detallePaciente, detalleHistorial, detalleEnfermeria)} className='btn btn-guardar m-2'>Descargar historiales odontologicos</button>
                <button onClick={() => generarExcelNE(detallePaciente, detalleNota, detalleHistorial)} className='btn btn-guardar m-2'>Descargar notas de evolucion</button>
            </div>

            <button onClick={handleDownload} className='graficButton'><IoMdDownload /></button>
            <button onClick={toggleLabels} className='graficButton'>
                {showLabels ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')} className='graficButton'>
                {chartType === 'bar' ? <FaChartPie /> : <MdBarChart />}
            </button>
            <div className='row'>
                <div className='col'>
                    <label htmlFor="month-select" >Seleccionar mes:</label>
                    <select className="opciones" id="month-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Todos los meses</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col'>
                    <label htmlFor="year-select">Seleccionar año:</label>
                    <select className="opciones" id="year-select" value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">Todos los años</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={2020 + i}>
                                {2020 + i}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div id="graficoAntH" style={{ width: '95%', height: '350px' }}></div>
        </div>
    );
};

export default GrafOdontAnt;
