
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const GraficosEnfermeria = () => {
    const [chartData, setChartData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [month, setMonth] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_graficosEnfermeria/', {
                    params: { month }
                });
                console.log('Response Data:', response.data);
                const servicioMap = {
                    1: 'Consulta',
                    2: 'Curación',
                    3: 'Retiro de puntos',
                    4: 'Aplicación de medicamentos',
                    5: 'DxTx'
                };

                // Procesar los datos para contar los pacientes por tipo de servicio
                const serviceCounts = response.data.reduce((acc, item) => {
                    const serviceType = servicioMap[item.servicio_enfermeria];
                    if (serviceType) {
                        acc[serviceType] = (acc[serviceType] || 0) + 1;
                    }
                    return acc;
                }, {});

                // Convertir el objeto en un array adecuado para ECharts
                const chartDataArray = Object.keys(serviceCounts).map(key => ({
                    name: key,
                    value: serviceCounts[key],
                }));

                console.log('Processed Chart Data:', chartDataArray);
                setChartData(chartDataArray);
            } catch (error) {
                console.error('Error en obtener los datos del grafico enfermeria:', error);
            }
        };
        fetchData();
    }, [month]);

    useEffect(() => {
        if (chartData.length === 0) {
            return; // No renderizar el gráfico si no hay datos
        }

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        let option;

        if (chartType == 'bar') {
            option = {
                title: {
                    text: 'Cantidad de Personas por servicio de enferemeria',
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
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1'];
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
                    text: 'Cantidad de Personas por servicio de enferemeria',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Tipo de servicio',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        data: chartData.map(item => ({
                            value: item.value,
                            name: item.name
                        })),

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
                                const colorList = ['#FF7F50', '#87CEFA', '#32CD32', '#FF6F61', '#6B5B95',];
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
    }, [chartData, showLabels, chartType]);

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

    return (
        <div>
            <button onClick={handleDownload} className='graficButton'><IoMdDownload /></button>
            <button onClick={toggleLabels} className='graficButton'>
                {showLabels ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')} className='graficButton'>
                {chartType === 'bar' ? <FaChartPie /> : <MdBarChart />}
            </button>
            <label htmlFor="month-select" >Seleccionar mes:</label>
            <select className="opciones" id="month-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Todos los meses</option>
                {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString('es-ES', { month: 'long' })}
                    </option>
                ))}
            </select>
            <div id="main" style={{ width: '95%', height: '350px' }}></div>
        </div>);
};

export default GraficosEnfermeria;
