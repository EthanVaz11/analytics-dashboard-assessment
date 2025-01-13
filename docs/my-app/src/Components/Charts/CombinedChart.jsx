"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../Charts/ui/card.jsx";  // Assuming these Card components are available

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
    <div className="charts-wrapper flex flex-col gap-6 md:flex-row justify-between">
      {/* Bar Chart Card */}
      <Card className="flex flex-col w-full md:w-[48%] shadow-lg rounded-lg overflow-hidden bar-chart-card">
        <CardHeader className="pb-0 bg-gray-200">
          <CardTitle className="text-xl font-semibold text-center">Bar Chart: Vehicle Make Count</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center pb-0">
          <BarChart
            width={600}  // Larger width for better visual alignment
            height={350}  // Increased height for more space
            data={barChartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 70, bottom: 20 }}  // Adjusted left margin
          >
            <YAxis
              type="category"
              dataKey="make"
              tickLine={false}
              axisLine={false}
              angle={-45}  // Rotates the labels for better readability
              textAnchor="end"
              tick={{ fontSize: 12 }}  // Adjusted font size for better fit
            />
            <XAxis type="number" />
            <Tooltip />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          Total Make 
        </CardFooter>
      </Card>

      {/* Pie Chart Card */}
      <Card className="flex flex-col w-full md:w-[48%] shadow-lg rounded-lg overflow-hidden pie-chart-card">
        <CardHeader className="pb-0 bg-gray-200">
          <CardTitle className="text-xl font-semibold text-center">
            Pie Chart: CAFV Eligibility for {selectedMake || 'All Makes'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center pb-0 pie-chart">
          <PieChart width={350} height={350}>
            <Pie
              data={pieChartData.length > 0 ? pieChartData : [{ eligibility: 'No Data', count: 1, color: '#888' }]}  // Display default if no data
              dataKey="count"
              nameKey="eligibility"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieChartData.length > 0
                ? pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                : null}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          CAFV eligibility distribution for the selected make.
        </CardFooter>
      </Card>
    </div>
  );
};

export default CombinedChart;
