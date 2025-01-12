import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


const PieChart = ({ data }) => {
  const makeCounts = data.reduce((acc, item) => {
    acc[item.make] = (acc[item.make] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(makeCounts),
    datasets: [
      {
        data: Object.values(makeCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#3498DB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#3498DB'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
