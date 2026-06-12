import { type Order } from "../api";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faCircleCheck,
  faClock,
  faTruckFast,
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[10px]" />{" "}
            Completed
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
            <FontAwesomeIcon icon={faTruckFast} className="text-[10px]" />{" "}
            Shipped
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
            <FontAwesomeIcon icon={faClock} className="text-[10px]" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-premium overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-main)] bg-white/5">
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Order ID
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Customer
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Date
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Status
              </th>
              <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)]">
                Total
              </th>
              <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {paginatedOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-slate-300">
                    #{order.id.toString().padStart(5, "0")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-[var(--color-border-main)] flex items-center justify-center text-xs font-bold text-slate-300 shadow-sm">
                      {order.customer.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {order.customer.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                  {new Date(order.order_date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(order?.status || "Pending")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-bold text-white">
                    $
                    {order.total_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </td>
              </motion.tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-4xl text-slate-700 mb-2"
                    />
                    <p className="font-medium text-slate-400">
                      No orders found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border-main)] bg-white/5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />{" "}
            Previous
          </button>
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            Page <span className="text-white">{currentPage}</span> of{" "}
            <span className="text-white">{totalPages}</span>
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            Next <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}
