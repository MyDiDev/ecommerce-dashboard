import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full w-full py-20">
      <motion.div
        style={{
          width: 50,
          height: 50,
          border: "5px solid #222",
          borderTop: "5px solid #6366f1",
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
    </div>
  );
}
