import { type AdvancedCustomer } from "../api";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEnvelope,
  faUserFriends,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CustomersTable({
  customers,
}: {
  customers: AdvancedCustomer[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="glass-card rounded-2xl shadow-premium overflow-hidden flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-main)] bg-white/5">
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Customer
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Contact
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)]">
                Joined
              </th>
              <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)]">
                Orders
              </th>
              <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)]">
                Lifetime Value
              </th>
              <th className="px-6 py-4 text-center font-bold text-[var(--color-text-muted)] w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {paginatedCustomers.map((customer, index) => (
              <motion.tr
                key={customer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-glow flex items-center justify-center text-white font-bold text-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {customer.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        ID: {customer.id.toString().padStart(4, "0")}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[10px]"
                    />
                    <span>{customer.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                  {new Date(customer.join_date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-md bg-white/5 border border-[var(--color-border-main)] font-mono text-slate-300">
                    {customer.order_count}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-black text-emerald-400 tracking-tight">
                    $
                    {customer.total_spent.toLocaleString(undefined, {
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
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      className="text-4xl text-slate-700 mb-2"
                    />
                    <p className="font-medium text-slate-400">
                      No customers found
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
