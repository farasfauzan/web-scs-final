"use client";
import { motion } from "framer-motion";

export default function PublicTemplate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
