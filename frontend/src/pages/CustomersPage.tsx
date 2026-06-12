import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import { getCustomersAdvanced, type AdvancedCustomer } from "../api";
import CustomersTable from "../components/CustomersTable";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  out: { opacity: 0, y: -20 },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { type: "spring", damping: 25 } },
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdvancedCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCustomers(await getCustomersAdvanced());
      setLoading(false);
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
            Customer Directory
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 mt-1 text-sm"
          >
            Manage your client base and view their lifetime value.
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex gap-3">
          <button className="px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-main)] rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 text-white">
            <FontAwesomeIcon icon={faDownload} className="text-slate-400" />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white shadow-glow transition-all flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            Add Customer
          </button>
        </motion.div>
      </header>

      <motion.div variants={itemVariants}>
        {loading ? (
          <div className="h-64 flex items-center justify-center glass-card rounded-2xl">
            <div className="w-8 h-8 border-4 border-[var(--color-border-main)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
          </div>
        ) : (
          <CustomersTable customers={customers} />
        )}
      </motion.div>
    </motion.div>
  );
}
