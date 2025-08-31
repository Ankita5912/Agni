import { memo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// TypeScript type for data props
type ChartDataItem = {
  name: string;
  value: number;
};

// Props accepted by the chart component
interface StatusPieChartProps {
  data: ChartDataItem[];
}

// Color palette
const COLORS = ["#146331ff", "#3e82d4ff", "#daa215ff", "#c90f0fff", "#a78bfa"];

const StatusPieChart: React.FC<StatusPieChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={60}
            // fill="#8884d8"
            label
          >
            {data.map((_entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(StatusPieChart);
