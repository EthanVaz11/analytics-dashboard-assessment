import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const makeCounts = data.reduce((acc, item) => {
    acc[item.make] = (acc[item.make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(makeCounts),
    datasets: [
      {
        label: 'Number of Cars',
        data: Object.values(makeCounts),
        backgroundColor: '#3498DB',
        borderColor: '#2980B9',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
