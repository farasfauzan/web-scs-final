"use client";
import { motion } from "framer-motion";

export default function PublicTemplate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="w-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
