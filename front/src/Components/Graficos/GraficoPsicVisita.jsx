import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { useAuth } from '../../Contexto/AuthContext';
import generarExcelFTP from '../FormatoPsico/FichaTecPsicoExcel';

const GraficosPsicVisita = () => {
    const [chartData, setChartData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const { token } = useAuth();
    const [detallePaciente, setDetallePaciente] = useState([]);
    const [detallePsicologia, setDetallePsicologia] = useState([]);
    const [detalleFicha, setDetalleFicha] = useState([]);
    const [detalleHistorial, setDetalleHistorial] = useState([]);
    const [detalleNotas, setDetalleNotas] = useState([]);
    const [detalleRecetas, setDetalleRecetas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_grafPsico/', {
                    params: { month, year }
                });
                console.log('Response Data:', response.data);
                const servicioMap = {
                    1: 'Primera visita',
                    2: 'Subsecuente',
                };

                const serviceCounts = response.data.reduce((acc, item) => {
                    const serviceType = servicioMap[item.visita.tipo_visita];
                    if (serviceType) {
                        acc[serviceType] = (acc[serviceType] || 0) + 1;
                    }
                    return acc;
                }, {});

                const chartDataArray = Object.keys(serviceCounts).map(key => ({
                    name: key,
                    value: serviceCounts[key],
                }));

                console.log('Processed Chart Data:', chartDataArray);
                setChartData(chartDataArray);
            } catch (error) {
                console.error('Error en obtener los datos del grafico piscologia:', error);
            }
        };
        fetchData();
        getDetallesFichas();
    }, [month, year]);

    useEffect(() => {
        if (chartData.length === 0) {
            return;
        }

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        let option;

        if (chartType === 'bar') {
            option = {
                title: {
                    text: 'Tipos de visita en pacientes',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: chartData.map(item => item.name),
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: chartData.map(item => item.value),
                        type: 'bar',
                        itemStyle: {
                            color: function (params) {
                                const colorList = ['#FF6F61', '#6B5B95'];
                                return colorList[params.dataIndex % colorList.length];
                            },
                        },
                        label: {
                            show: showLabels,
                            position: 'top',
                            color: '#000',
                            fontSize: 12,
                            formatter: '{c}'
                        },
                    },
                ],
            };
        } else {
            option = {
                title: {
                    text: 'Tipos de visita en pacientes',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Tipo de visita',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        data: chartData.map(item => ({
                            value: item.value,
                            name: item.name,
                        })),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold',
                            },
                        },
                        itemStyle: {
                            color: (params) => {
                                const colorList = ['#FF7F50', '#87CEFA', '#32CD32'];
                                return colorList[params.dataIndex % colorList.length];
                            },
                        },
                        label: {
                            show: showLabels,
                            position: 'center',
                            formatter: '{b}: {c} ({d}%)',
                        },
                    },
                ],
            };
        }

        console.log('Chart Option:', option);
        myChart.setOption(option);
        setChartInstance(myChart);

        return () => {
            myChart.dispose();
        };
    }, [chartData, showLabels, chartType]);

    const handleDownload = () => {
        if (chartInstance) {
            const imgURL = chartInstance.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff',
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

    const getDetallesPaciente = async () => {
        try {
            const promises = detalleFicha.map(ficha => {
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
            console.log("AAAAA" + detalles)
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };

    const getDetallesPsicologia = async () => {
        try {
            const promises = detalleFicha.map(ficha => {
                const url = `http://127.0.0.1:8000/api/get_ficha_psicologia/${ficha.paciente}/${ficha.fecha}/`;
                return axios.get(url, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            });

            const responses = await Promise.all(promises);
            const detalles = responses.map(response => response.data);
            setDetallePsicologia(detalles);
            console.log("EEEE" + detalles)
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };

    const getDetallesFichas = async () => {
        try {
            const urlFichas = 'http://127.0.0.1:8000/api/get_fichaPsico_fecha/';
            const responseFichas = await axios.get(urlFichas, {
                params: { month, year },
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            const fichas = responseFichas.data;

            const fichasPsico = await Promise.all(fichas.map(async ficha => {
                const urlUsuario = `http://127.0.0.1:8000/api/get_empleado_group/${ficha.empleado}`;
                const responseUsuario = await axios.get(urlUsuario, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                const empleado = responseUsuario.data; // Asumiendo que solo hay un usuario que coincide con el noTrabajador
                console.log(responseUsuario.data)
                // Verificar si el empleado pertenece al grupo "Medico"

                if (empleado.groups && empleado.groups.includes('Psicologo')) {
                    return ficha;
                } else {
                    return null;
                }
            }));

            // Filtrar los resultados nulos
            const fichasPsicoFiltradas = fichasPsico.filter(ficha => ficha !== null);

            setDetalleFicha(fichasPsicoFiltradas);
            console.log("Fichas del Psicologo:", fichasPsicoFiltradas);
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };


    useEffect(() => {
        if (detalleFicha.length > 0) {
            getDetallesPaciente();
            getDetallesPsicologia();
        }
    }, [token, detalleFicha]);

    return (
        <div>

            <div>
                <button onClick={() => generarExcelFTP(detallePaciente, detalleFicha)} className='btn btn-guardar'>Descargar las fichas en excel</button>
            </div>

            <button onClick={handleDownload} className='graficButton'><IoMdDownload /></button>
            <button onClick={toggleLabels} className='graficButton'>
                {showLabels ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')} className='graficButton'>
                {chartType === 'bar' ? <FaChartPie /> : <MdBarChart />}
            </button>


            <div className='mt-2 mb-2 row'>
                <div className='col'>
                    <label htmlFor="month-select">Seleccionar mes:</label>
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


            <div id="main" style={{ width: '95%', height: '350px' }}></div>
        </div>
    );
};

export default GraficosPsicVisita;
