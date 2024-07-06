
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

const GraficosEnfermeria = () => {
    const [chartData, setChartData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);
    const [showLabels, setShowLabels] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_graficosEnfermeria/');
                console.log('Response Data:', response.data);
                const servicioMap = {
                    1: 'Consulta General',
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
    }, []);

    useEffect(() => {
        if (chartData.length === 0) {
            return; // No renderizar el gráfico si no hay datos
        }

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: 'Cantidad de Personas por servicio de enferemeria',
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

        console.log('Chart Option:', option);
        myChart.setOption(option);
        setChartInstance(myChart);

        return () => {
            myChart.dispose();
        };
    }, [chartData, showLabels]);

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
            <div id="main" style={{ width: '110%', height: '450px' }}></div>
        </div>);
};

export default GraficosEnfermeria;
