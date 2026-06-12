import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faDollarSign,
  faUsers,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { type Stats } from "../api";

interface DashboardStatsProps {
  stats: Stats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
    >
      {[
        {
          label: "Total Revenue",
          value: `$${stats.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          icon: faDollarSign,
          color: "text-blue-400",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
        },
        {
          label: "Total Orders",
          value: stats.total_orders,
          icon: faShoppingCart,
          color: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
        },
        {
          label: "Customers",
          value: stats.total_customers,
          icon: faUsers,
          color: "text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
        },
        {
          label: "Stock Value",
          value: `$${stats.total_value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          icon: faBox,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
          border: "border-purple-500/20",
        },
      ].map((stat) => (
        <motion.div
          key={stat.label}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            },
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[var(--color-bg-card)] p-6 rounded-2xl shadow-premium border border-[var(--color-border-main)] flex items-center group overflow-hidden relative"
        >
          <div
            className={`absolute -right-2 -top-2 p-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 ${stat.color}`}
          >
            <FontAwesomeIcon icon={stat.icon} size="6x" />
          </div>
          <div
            className={`p-4 ${stat.bg} rounded-xl mr-5 group-hover:scale-110 transition-transform duration-300 border ${stat.border}`}
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className={stat.color}
              size="lg"
            />
          </div>
          <div>
            <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-white tracking-tight leading-none">
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;
