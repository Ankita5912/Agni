import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ProjectData {
  heading: string;
  startDate: Date;
  deadline: Date;
}

interface Props {
  data: ProjectData[];
}

export default function LineChart2({ data }: Props) {
  const today = new Date();

  const chartData = data.map((project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.deadline);

    const daysToStart = Math.round(
      (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysToEnd = Math.round(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const durationInDays = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      name: project.heading,
      daysToStart,
      daysToEnd,
      durationInDays,
    };
  });

  return (
    <ResponsiveContainer width="90%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "durationInDays") return [`${value} days`, "Duration"];
            if (name === "daysToStart")
              return [`${value} days`, "Days to Start"];
            if (name === "daysToEnd")
              return [`${value} days`, "Days to Deadline"];
            return [value, name];
          }}
        />
        <div className="my-2">
          <Legend layout="horizontal" verticalAlign="top" />
        </div>

        <Line
          type="monotone"
          dataKey="daysToStart"
          stroke="#8884d8"
          name="Days to Start"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="daysToEnd"
          stroke="#82ca9d"
          name="Days to Deadline"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="durationInDays"
          stroke="#ffc658"
          name="Duration (Days)"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
