import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { useAuth } from '../../Contexto/AuthContext';
import generarExcelFTP from '../FormatoPsico/FichaTecPsicoExcel';

const GraficosPsicConsulta = () => {
    const [chartData, setChartData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_grafPsico/', {
                    params: { month, year }
                });
                console.log('Response Data:', response.data);
                const servicioMap = {
                    1: 'TDAH',
                    2: 'Duelo',
                    3: 'Problemas de pareja',
                    4: 'Ansiedad',
                    5: 'Problema conductual',
                    6: 'Transtorno depresivo',
                    7: 'Problema de aprendizaje',
                    8: 'Separación de padres',
                    9: 'Manejo de impulsos',
                    10: 'Abuso sexual',
                    11: 'Autoestima',
                    12: 'Audiencia',
                    13: 'Brigada',
                    14: 'Terapia grupal',
                    15: 'Otro',
                };

                const serviceCounts = response.data.reduce((acc, item) => {
                    const serviceType = servicioMap[item.visita.tipo_consulta];
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
    }, [month, year]);

    useEffect(() => {
        if (chartData.length === 0) {
            return;
        }

        const chartDom = document.getElementById('psicConlt');
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
                                const colorList = ['#FF6F61', '#6B5B95', '#20B2AA', '#FF7F50', '#87CEFA', '#32CD32',
                                    '#9370DB', '#1E90FF', '#6A5ACD', '#8B008B', '#FF6347', '#228B22', '#F4A460',
                                    '#008080', '#40E0D0'];
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
                    top: '7%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Tipo de visita',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '60%'],
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
                                const colorList = ['#FF6F61', '#6B5B95', '#20B2AA', '#FF7F50', '#87CEFA', '#32CD32',
                                    '#9370DB', '#1E90FF', '#6A5ACD', '#8B008B', '#FF6347', '#228B22', '#F4A460',
                                    '#008080', '#40E0D0'];
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

    return (
        <div>
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


            <div id="psicConlt" style={{ width: '95%', height: '350px' }}></div>
        </div>
    );
};

export default GraficosPsicConsulta;
