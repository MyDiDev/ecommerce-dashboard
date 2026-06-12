import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRevenueSummary, type RevenueSummary } from "../api";

export default function RevenueChart() {
  const [data, setData] = useState<RevenueSummary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const summary = await getRevenueSummary();
      setData(summary);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl shadow-premium border border-[var(--color-border-main)] h-full flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
        Revenue{" "}
        <span className="text-[var(--color-text-muted)] text-sm font-medium ml-2">
          (Last 30 Days)
        </span>
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip
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
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
