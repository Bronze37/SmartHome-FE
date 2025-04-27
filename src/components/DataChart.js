import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import Chart from 'chart.js/auto';
import useLimitedArray from '../config/useLimitedArray';

function DataChart() {
    const [temp, setTemp] = useLimitedArray(10);
    const [humi, setHumi] = useLimitedArray(10);
    const [light, setLight] = useLimitedArray(10);
    const [label, setLabel] = useLimitedArray(10);
    const [db, setDb] = useLimitedArray(10);

    useEffect(() => {
        const socket = io('http://localhost:8688');

        socket.on('temp', (data_received) => {
            const nhietdo = data_received;
            setTemp(nhietdo);

            const currentTime = new Date().toLocaleTimeString();
            setLabel(currentTime);
        });

        socket.on('humi', (data_received) => {
            const doam = data_received;
            setHumi(doam);
        });

        socket.on('light', (data_received) => {
            const anhsang = data_received;
            setLight(anhsang);
        });
        socket.on('db', (data_received) => {
            const dobui = data_received;
            setDb(dobui);
        });
        // Clean up the socket when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    const chartData = {
        labels: label,
        datasets: [
            {
                label: 'Nhiệt độ',
                data: temp,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                yAxisID: 'y-left',
                lineTension: 0.3,
            },
            // {
            //     label: 'Độ bụi',
            //     data: db,
            //     borderColor: 'gray',
            //     backgroundColor: 'rgba(170, 170, 170, 0.2)',
            //     yAxisID: 'y-left',
            //     lineTension: 0.3,
            // },
            {
                label: 'Độ ẩm',
                data: humi,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                yAxisID: 'y-left',
                lineTension: 0.3,
            },
            {
                label: 'Ánh sáng',
                data: light,
                borderColor: 'yellow',
                backgroundColor: 'rgba(255, 255, 0, 0.2)',
                yAxisID: 'y-right',
                lineTension: 0.3,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Hệ thống IoT',
                },
            },
            'y-left': {
                type: 'linear',
                position: 'left',
                min: 0,
                max: 100,
                title: {
                    display: false,
                    text: 'Nhiệt độ và Độ ẩm',
                },
            },
            'y-right': {
                type: 'linear',
                position: 'right',
                min: 0,
                max: 500,
                title: {
                    display: false,
                    text: 'Ánh sáng',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center p-2">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default DataChart;