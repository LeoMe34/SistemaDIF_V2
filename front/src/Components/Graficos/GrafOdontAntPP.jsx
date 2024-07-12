
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash, FaChartPie } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { left } from '@popperjs/core';

const GrafAntPP = () => {
    const [data, setData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);
    const [chartType, setChartType] = useState('bar');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_graficosOdontAntPP/');
                setData(response.data);
            } catch (error) {
                console.error('Error en obtener los datos del grafico odonto:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) {
            return; // No renderizar el gráfico si no hay datos
        }

        const chartDom = document.getElementById('graficoAntPP');
        const myChart = echarts.init(chartDom);
        let option;

        if (chartType === 'bar') {
            option = {
                title: {
                    text: 'Cantidad de Personas con Antecedentes personales patologicos',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                xAxis: {
                    type: 'category',
                    data: ['Diabetes', 'Hipertensión', 'Tuberculosis', 'Cancer', 'Transfusión', 'Quirurgicos', 'Anestesicos', 'Alergicos', 'Trauma',],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [data.diabetes_true, data.hipert_true, data.tuber_true, data.cancer_true, data.trans_true, data.quirurgicos_true, data.anestesicos_true, data.alergicos_true, data.trauma_true],
                        type: 'bar',
                        itemStyle: {
                            color: function (params) {
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B', '#FF7F50', '#87CEFA', '#32CD32', '#92A8D1', '#8BE932', '#C43423 '];
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
                    text: 'Cantidad de Personas con Antecedentes personales patologicos',
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
                            { value: data.trans_true, name: 'Transfusión' },
                            { value: data.quirurgicos_true, name: 'Quirurgicos' },
                            { value: data.anestesicos_true, name: 'Anestesicos' },
                            { value: data.alergicos_true, name: 'Alergicos' },
                            { value: data.trauma_true, name: 'Trauma' },
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
                                const colorList = ['#FF6F61', '#6B5B95', '#88B04B', '#FF7F50', '#87CEFA', '#32CD32', '#92A8D1', '#8BE932', '#C43423'];
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

    return (
        <div>
            <button onClick={handleDownload} className='graficButton'><IoMdDownload /></button>
            <button onClick={toggleLabels} className='graficButton'>
                {showLabels ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')} className='graficButton'>
                {chartType === 'bar' ? <FaChartPie /> : <MdBarChart />}
            </button>
            <div id="graficoAntPP" style={{ width: '95%', height: '350px' }}></div>
        </div>);
};

export default GrafAntPP;
