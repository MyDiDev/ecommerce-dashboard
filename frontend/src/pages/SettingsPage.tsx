import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function SettingsPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <h1 className="text-3xl font-black text-white tracking-tighter">Settings</h1>
      <p className="text-slate-400 mt-2">This is a placeholder for the settings page.</p>
    </motion.div>
  );
}
