// src/components/ui/chart.jsx
import { Tooltip, ResponsiveContainer } from 'recharts';

const ChartContainer = ({ children, className }) => (
  <div className={`flex justify-center ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
);

const ChartTooltip = ({ cursor, content }) => (
  <Tooltip cursor={cursor} content={content} />
);

const ChartTooltipContent = ({ payload, label }) => {
  return (
    <div className="bg-white p-2 shadow-md rounded-lg">
      <p className="font-semibold">{label}</p>
      <ul>
        {payload.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}: </strong>
            {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ChartContainer, ChartTooltip, ChartTooltipContent };
