import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const counts = data.reduce((acc, item) => {
    const state = item.State; // Assuming `State` is the key you want to count occurrences of
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Number of Vehicles',
        data: Object.values(counts),
        backgroundColor: '#3498db', // Color for the bars
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
