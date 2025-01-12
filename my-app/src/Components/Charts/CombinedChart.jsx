import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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

// Function to generate unique colors
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const CombinedChart = ({ data, selectedMake }) => {
  // Bar chart data: Counts of cars by make
  const makeCounts = data.reduce((acc, item) => {
    acc[item.make] = (acc[item.make] || 0) + 1;
    return acc;
  }, {});

  const makes = Object.keys(makeCounts);
  const makeColors = generateColors(makes.length);

  const barChartData = {
    labels: makes,
    datasets: [
      {
        label: 'Number of Cars',
        data: Object.values(makeCounts),
        backgroundColor: makeColors,
        borderColor: makeColors,
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data: CAFV eligibility for the selected make
  const filteredData = data.filter((item) => item.make === selectedMake);
  const cafvCounts = filteredData.reduce((acc, item) => {
    acc[item.clean_alternative_fuel_vehicle_cafv_eligibility] =
      (acc[item.clean_alternative_fuel_vehicle_cafv_eligibility] || 0) + 1;
    return acc;
  }, {});

  const pieColors = generateColors(Object.keys(cafvCounts).length);

  const pieChartData = {
    labels: Object.keys(cafvCounts),
    datasets: [
      {
        data: Object.values(cafvCounts),
        backgroundColor: pieColors,
        hoverBackgroundColor: pieColors,
      },
    ],
  };

  const barOptions = {
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

  const pieOptions = {
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
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {/* Bar Chart */}
      <div style={{ width: '100%', margin: '10px' }}>
        <h3>Bar Chart</h3>
        <Bar data={barChartData} options={barOptions} />
      </div>

      {/* Pie Chart: Show only if a make is selected */}
      {selectedMake && (
        <div style={{ width: '100%', margin: '10px' }}>
          <h3>Pie Chart - {selectedMake}</h3>
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      )}
    </div>
  );
};

export default CombinedChart;
