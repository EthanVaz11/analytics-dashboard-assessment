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

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Generate unique colors for charts
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const CombinedChart = ({ data, selectedMake }) => {
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
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14, // Adjusted size for better readability
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
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
    maintainAspectRatio: false, // Allows the chart to be more flexible in size
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14, // Adjusted size for better readability
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
  };

  return (
    <div className="charts-wrapper">
      {/* Bar Chart */}
      {!selectedMake && (
        <div className="chart-container">
          <h3>Bar Chart</h3>
          <Bar data={barChartData} options={barOptions} />
        </div>
      )}

      {/* Pie Chart */}
      {selectedMake && (
        <div className="chart-container">
          <h3>Pie Chart - {selectedMake}</h3>
          <div className="pie-chart-container">
            <Pie data={pieChartData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedChart;
