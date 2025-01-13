"use client"

import React from "react"
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"

const chartData = [
  { browser: "Chrome", visitors: 275 },
  { browser: "Safari", visitors: 200 },
  { browser: "Firefox", visitors: 187 },
  { browser: "Edge", visitors: 173 },
  { browser: "Other", visitors: 90 },
]

const SimpleBarChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Browser Visitors</h3>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
      >
        <YAxis
          type="category"
          dataKey="browser"
          tickLine={false}
          axisLine={false}
        />
        <XAxis type="number" />
        <Tooltip />
        <Bar dataKey="visitors" fill="#3498DB" radius={5} />
      </BarChart>
    </div>
  )
}

export default SimpleBarChart
