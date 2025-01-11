import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register required components for the chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart before creating a new one
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new ChartJS(chartRef.current, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // Custom colors
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
