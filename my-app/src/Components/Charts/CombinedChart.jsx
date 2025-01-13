"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from "recharts";

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
  // Compute the data for the Bar Chart
  const makeCounts = data.reduce((acc, item) => {
    acc[item.make] = (acc[item.make] || 0) + 1;
    return acc;
  }, {});

  const makes = Object.keys(makeCounts);
  const makeColors = generateColors(makes.length);

  // Recharts BarChart data format
  const barChartData = makes.map((make, index) => ({
    make,
    count: makeCounts[make],
    color: makeColors[index],
  }));

  // Compute the data for the Pie Chart
  const filteredData = data.filter((item) => item.make);
  const cafvCounts = filteredData.reduce((acc, item) => {
    acc[item.clean_alternative_fuel_vehicle_cafv_eligibility] =
      (acc[item.clean_alternative_fuel_vehicle_cafv_eligibility] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(cafvCounts).map((key, index) => ({
    eligibility: key,
    count: cafvCounts[key],
    color: generateColors(Object.keys(cafvCounts).length)[index],
  }));

  return (
    <div className="charts-wrapper">
      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Bar Chart</h3>
        <BarChart
          width={500}
          height={300}
          data={barChartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
        >
          <YAxis
            type="category"
            dataKey="make"
            tickLine={false}
            axisLine={false}
          />
          <XAxis type="number" />
          <Tooltip />
          <Bar
            dataKey="count"
            fill={makeColors[0]} // Default color if no color mapping is needed
            radius={[5, 5, 0, 0]}
          >
            {barChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Pie Chart */}
      {selectedMake && (
        <div className="chart-container">
          <h3>Pie Chart - {selectedMake}</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="eligibility"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default CombinedChart;
