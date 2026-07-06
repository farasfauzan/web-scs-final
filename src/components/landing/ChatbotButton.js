// src/components/landing/ChatbotButton.jsx
'use client';
import { useState } from 'react';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Box Dialog Chat (Hanya Muncul jika diklik) */}
      {isOpen && (
        <div className="w-[360px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 mb-4 flex flex-col overflow-hidden transition-all duration-300">
          {/* Header Biru Gelap sesuai Mockup */}
          <div className="bg-[#001433] p-4 text-white flex justify-between items-center border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center text-slate-900 font-bold text-lg">
                🤖
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide">SCS AI</h3>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Bantuan Cerdas SCS</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-lg transition">✕</button>
          </div>
          
          {/* Alur Chat Dialog */}
          <div className="flex-grow p-4 bg-[#F8F9FA] overflow-y-auto space-y-4 text-xs md:text-sm">
            <div className="bg-white text-slate-800 p-3 rounded-xl border border-slate-200 max-w-[85%] shadow-sm">
              Halo, ada yang bisa kami bantu?
            </div>
            
            <div className="bg-[#001433] text-white p-3 rounded-xl max-w-[85%] self-end ml-auto shadow-sm">
              Bisa berikan detail lokasi kantor dan kontak utama PT Sinar Cerah Sempurna?
            </div>

            <div className="bg-white text-slate-800 p-3 rounded-xl border border-slate-200 max-w-[85%] shadow-sm leading-relaxed">
              Tentu, ini adalah hasil dari permintaanmu:<br/>
              <strong>Nama :</strong> PT Sinar Cerah Sempurna.<br/>
              <strong>Lokasi :</strong> Jl. Karangrejo Barat No 09, Semarang.<br/>
              <strong>Kontak :</strong> 0812-XXXX-XXXX.
            </div>
          </div>

          {/* Kolom Input Text Bawah */}
          <div className="p-3 bg-white border-t flex gap-2 items-center">
            <input 
              type="text" 
              placeholder="Tanyakan SCS AI..." 
              className="w-full bg-[#EFF1F3] p-3 text-xs rounded-xl outline-none border border-transparent focus:border-slate-300"
            />
            <button className="text-[#002388] hover:scale-110 p-2 transition">
              🚀
            </button>
          </div>
        </div>
      )}

      {/* Tombol Pemicu Bulat Warna Kuning sesuai Gambar */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#FFD700] text-slate-950 rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#e6c200] hover:scale-105 transition-all duration-300 active:scale-95"
      >
        {isOpen ? (
          <span className="text-lg font-bold">✕</span>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </button>
    </div>
  );
}