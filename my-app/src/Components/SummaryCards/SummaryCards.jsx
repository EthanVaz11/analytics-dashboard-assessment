"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../Charts/ui/card.jsx"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../Charts/ui/chart.jsx"

const SummaryCards = ({ data, totalVehiclez, totalModelz }) => {
  // Calculate total vehicles dynamically from data
  const totalVehicles = totalVehiclez;  // This will remain constant as the initial total
  const currentVehicles = data.length;  // This will change based on filtered data
  
  // Calculate unique models dynamically from data
  const totalModels = totalModelz;
  const uniqueModels = new Set(data.map((item) => item.model)).size;
  
  // Calculate max speed dynamically based on data
  const maxSpeed = Math.max(...data.map((item) => item.max_speed || 0));  // Max speed calculation
  
  // Calculate average electric range dynamically based on data
  const averageRange =
    data.reduce((sum, item) => sum + (item.electric_range || 0), 0) / currentVehicles || 0;

  const chartData = [{ 
    name: 'Summary', 
    total: currentVehicles, 
    maxTotal: totalVehicles, // Used for the total vehicles radial chart
    unique: uniqueModels, 
    maxUnique: totalModels,
    range: averageRange
  }];

  const chartConfig = {
    total: {
      label: "Total Vehicles",
      color: "hsl(var(--chart-1))",
    },
    unique: {
      label: "Unique Models",
      color: "hsl(var(--chart-2))",
    },
    range: {
      label: "Avg. Range",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row gauge-chart">
      {/* Total Vehicles Card */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Total Vehicles</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {currentVehicles.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Vehicles
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="total"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2"
              />
              {/* Radial bar for total vehicles (constant) */}
              <RadialBar
                dataKey="maxTotal"
                stackId="b"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2 opacity-50"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Unique Models Card */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Unique Models</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {uniqueModels.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Models
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="unique"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2"
              />
              {/* Radial bar for total vehicles (constant) */}
              <RadialBar
                dataKey="maxUnique"
                stackId="b"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2 opacity-50"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Average Electric Range Card */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Average Electric Range</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {averageRange.toFixed(2)} miles
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Range
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="range"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-3))"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCards;
