import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the Chart.js components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,  // Important to adapt to parent container size
  plugins: {
    legend: {
      display: false // Do not display legend
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
    }
  },
  elements: {
    line: {
      tension: 0.4 // Moderately curved line
    }
  }
};

const LineChart = ({ data }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md h-96" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-xl font-semibold leading-none tracking-tight">Curved Line Chart</h3>
        <p className="text-sm text-muted-foreground">Total number of answers by day</p>
      </div>
      <div className="px-4 pb-6 h-72">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
