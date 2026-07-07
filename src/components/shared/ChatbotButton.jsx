"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Jendela Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden mb-4 flex flex-col justify-between"
          >
            {/* Header Jendela Chatbot */}
            <div className="bg-sky-950 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">SCS AI - Bantuan Cerdas</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-400 font-bold text-lg">&times;</button>
            </div>

            {/* Area Pesan */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 text-xs bg-zinc-50">
              <div className="bg-white border border-neutral-200 p-3 rounded-xl max-w-[85%] text-stone-800">
                Halo, ada yang bisa kami bantu?
              </div>
            </div>

            {/* Input Pesan */}
            <div className="p-3 border-t border-neutral-200 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Tanyakan SCS AI..." 
                className="flex-grow border border-neutral-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-sky-950"
              />
              <button className="bg-sky-950 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-sky-900">
                Kirim
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Utama Chatbot */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-400 hover:bg-yellow-500 text-sky-950 p-4 rounded-full shadow-xl transition-all duration-200 focus:outline-none group active:scale-95"
        aria-label="Chatbot AI"
      >
        <svg className="w-7 h-7 fill-current transform group-hover:rotate-12 transition-transform duration-200" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
          <circle cx="8" cy="9" r="1.5"/>
          <circle cx="16" cy="9" r="1.5"/>
          <path d="M11.5 11h1v2h-1z"/>
        </svg>
      </button>
    </div>
  );
}