import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faExclamationCircle,
  faEllipsisVertical,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { type Product } from "../api";

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="glass-card rounded-2xl shadow-premium overflow-hidden flex flex-col h-full">
      <div className="px-6 py-5 border-b border-[var(--color-border-main)] flex justify-between items-center bg-white/5">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Inventory
        </h2>
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.1)]">
          {products.length} Items
        </span>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-main)] bg-white/5">
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-widest text-xs">
                Product Info
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-widest text-xs">
                Pricing
              </th>
              <th className="px-6 py-4 text-left font-bold text-[var(--color-text-muted)] uppercase tracking-widest text-xs">
                Availability
              </th>
              <th className="px-6 py-4 text-right font-bold text-[var(--color-text-muted)] uppercase tracking-widest text-xs w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-tr from-slate-800 to-slate-700 border border-[var(--color-border-main)] rounded-lg flex items-center justify-center text-slate-300 font-bold group-hover:from-indigo-600 group-hover:to-blue-500 group-hover:text-white transition-all shadow-sm">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] max-w-xs truncate">
                          {product.description || "No description provided"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-white">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        product.stock > 10
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                          : product.stock > 0
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(product.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Product"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </motion.button>
                      <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-16 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-4xl text-slate-700 mb-2"
                    />
                    <h3 className="text-lg font-bold text-white mb-1">
                      Your catalog is empty
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Start building your inventory by adding your first
                      product.
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
};

export default ProductList;
