import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getTopProducts, type TopProduct } from "../api";

export default function TopProductsChart() {
  const [data, setData] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const summary = await getTopProducts();
      setData(summary);
    };
    fetchData();
  }, []);

  const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F43F5E", "#F59E0B"];

  return (
    <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl shadow-premium border border-[var(--color-border-main)] h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
        Top Selling Products
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--color-text-muted)",
                fontSize: 12,
                fontWeight: "bold",
              }}
              width={120}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                backgroundColor: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border-main)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-premium)",
              }}
              labelStyle={{
                fontWeight: "bold",
                color: "var(--color-text-muted)",
                marginBottom: "4px",
              }}
              itemStyle={{ color: "#fff", fontWeight: "900" }}
              formatter={(value) => [`${value} units`, "Sold"]}
            />
            <Bar dataKey="sold" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
