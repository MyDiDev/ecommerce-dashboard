import { type Order } from "../api";
import { motion } from "framer-motion";

export default function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl shadow-premium border border-[var(--color-border-main)] h-full">
      <h3 className="text-lg font-bold text-white mb-6 tracking-tight">
        Recent Orders
      </h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-300 font-bold text-sm">
                {order.customer.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-200">
                  {order.customer.name}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="font-bold text-slate-200">
              ${order.total_amount.toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
