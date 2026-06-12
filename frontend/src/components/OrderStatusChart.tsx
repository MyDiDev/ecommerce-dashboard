import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getOrderDistribution, type OrderDistribution } from "../api";

export default function OrderStatusChart() {
  const [data, setData] = useState<OrderDistribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const summary = await getOrderDistribution();
      setData(summary);
    };
    fetchData();
  }, []);

  const COLORS = ["#22C55E", "#F59E0B", "#3B82F6"]; // Success, Warning, Primary

  return (
    <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl shadow-premium border border-[var(--color-border-main)] h-auto flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
        Order Status
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border-main)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-premium)",
              }}
              itemStyle={{ color: "#fff", fontWeight: "900" }}
              formatter={(value) => [`${value}%`, "Orders"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                color: "var(--color-text-muted)",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
