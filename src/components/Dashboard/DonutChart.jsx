import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Title,
    ArcElement,
    Legend
} from 'chart.js';

// Register ChartJS modules
ChartJS.register(
    Tooltip,
    Title,
    ArcElement,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,  // Important to adapt to parent container size
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false
        }
    }
};

const DonutChart = ({ title, Icon, chartData }) => {
    return (
        <div className="flex flex-col w-full p-4 pb-6 bg-card text-card-foreground shadow-sm rounded-lg border h-96">
            <div className="flex flex-col space-y-1.5 p-2">
                <h3 className="whitespace-nowrap text-xl font-semibold leading-none tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">Total number of answers by day</p>
            </div>
            <div className="mt-2 h-full">
                <Doughnut options={options} data={chartData} />
            </div>
        </div>
    );
};

export default DonutChart;
