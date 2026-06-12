import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStats, getOrders, type Stats, type Order } from "../api";
import DashboardStats from "../components/DashboardStats";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrders";
import TopProductsChart from "../components/TopProductsChart";
import OrderStatusChart from "../components/OrderStatusChart";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  out: { opacity: 0, y: -20 },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25 },
  },
};

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, ordersData] = await Promise.all([
          getStats(),
          getOrders(),
        ]);
        setStats(statsData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="space-y-8"
    >
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-white tracking-tight"
          >
            Overview
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 mt-1 text-sm"
          >
            Monitor your store's performance and recent activity.
          </motion.p>
        </div>
      </header>

      {loading || !stats ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[var(--color-border-main)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <motion.div variants={itemVariants}>
            <DashboardStats stats={stats} />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="xl:col-span-2">
              <RevenueChart />
            </motion.div>
            <motion.div variants={itemVariants}>
              <OrderStatusChart />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="xl:col-span-1">
              <TopProductsChart />
            </motion.div>
            <motion.div variants={itemVariants} className="xl:col-span-2">
              <RecentOrders orders={orders.slice(0, 5)} />
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
