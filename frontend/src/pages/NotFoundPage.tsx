import { motion } from "framer-motion";
export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center mt-20"
    >
      <h1 className="text-6xl font-black text-indigo-500 tracking-tighter">
        404
      </h1>
      <p className="text-slate-400 mt-2">Page Not Found.</p>
    </motion.div>
  );
}
