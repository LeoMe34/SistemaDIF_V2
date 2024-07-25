import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";

const GraficosEnfermeriaPoblacion = () => {
    const [data, setData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_graficosEnfPob/', {
                    params: { month, year }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error en obtener los datos del grafico enfermeria:', error);
            }
        };
        fetchData();
    }, [month, year]);

    useEffect(() => {
        if (!data.embarazada_true && !data.adultoM_true && !data.discapacitado_true) {
            return; // No renderizar el gráfico si no hay datos
        }

        const chartDom = document.getElementById('graficoPoblacion');
        const myChart = echarts.init(chartDom);
        let option;

        if (chartType === 'bar') {
            option = {
                title: {
                    text: 'Cantidad de Personas por tipo de población',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                xAxis: {
                    type: 'category',
                    data: ['Embarazada', 'Adulto Mayor', 'Discapacitado'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [data.embarazada_true, data.adultoM_true, data.discapacitado_true],
                        type: 'bar',
                        itemStyle: {
                            color: function (params) {
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B'];
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
                    text: 'Conteo de Población',
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
                        name: 'Población',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        data: [
                            { value: data.embarazada_true, name: 'Embarazada' },
                            { value: data.adultoM_true, name: 'Adulto Mayor' },
                            { value: data.discapacitado_true, name: 'Discapacitado' }
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
                                const colorList = ['#FF7F50', '#87CEFA', '#32CD32'];
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

    return (
        <div>
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
            <div id="graficoPoblacion" style={{ width: '95%', height: '350px' }}></div>
        </div>
    );
};

export default GraficosEnfermeriaPoblacion;
