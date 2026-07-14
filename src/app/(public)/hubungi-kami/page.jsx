"use client";
import { useState, useEffect } from "react";
import FadeUp from "@/components/ui/FadeUp";
import CldImg from "@/components/shared/CldImg";

const getContactIcon = (type) => {
  const iconMap = {
    address: "/icons/map-pin.svg",
    phone: "/icons/phone.svg",
    email: "/icons/envelope.svg",
    general: "/icons/clock.svg",
  };
  return iconMap[type] || "/icons/clock.svg";
};

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <CldImg src={icon} alt="" className="w-5 h-5 brightness-0 invert" />
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-white/60 text-[11px] font-semibold font-['Plus_Jakarta_Sans'] uppercase tracking-wider">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function HubungiKamiPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSettled, setIsSettled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.contacts) setContacts(data.contacts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formStatus) setFormStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormStatus(null);

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan");
      }

      setFormStatus({ type: "success", text: data.message });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setFormStatus({ type: "error", text: err.message });
    } finally {
      setSending(false);
    }
  };

  const getContact = (type) => contacts.find((c) => c.type === type);
  const address = getContact("address");
  const phone = getContact("phone");
  const email = getContact("email");
  const general = getContact("general");

  if (loading) {
    return (
      <main className="relative w-full min-h-screen flex items-center justify-center bg-[#004282]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </main>
    );
  }

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#004282] pt-28 pb-16 px-6">
      
      <div className="absolute inset-0 z-0">
        <CldImg src="/hero-bg.svg" alt="Background Hubungi Kami" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#004282]/85"></div>
      </div>

      <div className="relative z-10 w-full max-w-[950px] flex flex-col items-center gap-8">
        
        <FadeUp delay={0.1} className="text-center flex flex-col gap-2">
          <h1 className="text-white text-4xl font-extrabold font-['Plus_Jakarta_Sans']">
            Hubungi Kami
          </h1>
          <p className="text-white/90 text-sm md:text-[15px] font-normal font-['Plus_Jakarta_Sans']">
            Mari diskusikan proyek masa depan Anda bersama tim ahli kami.
          </p>
        </FadeUp>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <FadeUp delay={0.2} className="w-full h-full">
            <div 
              className={`border border-white/20 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between transition-all duration-[2000ms] ease-out ${
                isSettled ? "bg-white/10 backdrop-blur-md" : "bg-white/5 backdrop-blur-none"
              }`}
              style={{ 
                WebkitBackdropFilter: isSettled ? "blur(12px)" : "blur(0px)",
                backdropFilter: isSettled ? "blur(8px)" : "blur(0px)"
              }}
            >
              <div>
                <h2 className="text-white text-xl font-bold font-['Plus_Jakarta_Sans'] mb-5">Kirimkan Pesan</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {formStatus && (
                    <div className={`px-4 py-3 rounded-lg text-sm font-medium ${
                      formStatus.type === "success"
                        ? "bg-green-500/20 text-green-300 border border-green-400/30"
                        : "bg-red-500/20 text-red-300 border border-red-400/30"
                    }`}>
                      {formStatus.text}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[13px] font-['Plus_Jakarta_Sans']">Nama Lengkap <span className="text-yellow-400">*</span></label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required
                        className="bg-transparent border border-white/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                        placeholder="Masukkan nama lengkap" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[13px] font-['Plus_Jakarta_Sans']">Alamat Email <span className="text-yellow-400">*</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required
                        className="bg-transparent border border-white/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                        placeholder="contoh@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[13px] font-['Plus_Jakarta_Sans']">Nomor Telepon</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className="bg-transparent border border-white/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                        placeholder="08xxx" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white text-[13px] font-['Plus_Jakarta_Sans']">Subjek</label>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange}
                        className="bg-transparent border border-white/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
                        placeholder="Judul pesan" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-[13px] font-['Plus_Jakarta_Sans']">Pesan</label>
                    <textarea rows="3" name="message" value={form.message} onChange={handleChange} required
                      className="bg-transparent border border-white/30 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/40"
                      placeholder="Tulis pesan Anda..."></textarea>
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-[#FFD700] hover:bg-[#F6CA00] text-[#004282] text-sm font-bold font-['Plus_Jakarta_Sans'] py-3 rounded-lg transition-colors mt-2 disabled:opacity-50 cursor-pointer">
                    {sending ? "Mengirim..." : "Kirim Pesan"}
                  </button>
                </form>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="w-full h-full">
            <div 
              className={`border border-white/20 rounded-2xl p-6 flex flex-col justify-center gap-5 shadow-xl h-full transition-all duration-[2000ms] ease-out ${
                isSettled ? "bg-white/10 backdrop-blur-md" : "bg-white/5 backdrop-blur-none"
              }`}
              style={{ 
                WebkitBackdropFilter: isSettled ? "blur(12px)" : "blur(0px)",
                backdropFilter: isSettled ? "blur(8px)" : "blur(0px)"
              }}
            >
              <h2 className="text-white text-xl font-bold font-['Plus_Jakarta_Sans']">Informasi Kontak</h2>
              
              <ContactItem icon={getContactIcon(address?.type)} title="Alamat">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(address?.value || "Jl. Karangrejo Barat No 09. RT. 02 RW. 02 (Kp. Pentul), Tinjomoyo, Semarang")}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white text-[14px] font-['Plus_Jakarta_Sans'] leading-relaxed transition-colors underline"
                >
                  {address?.value || "Jl Karangrejo Barat No 9. Tinjomoyo, KOTA SEMARANG"}
                </a>
              </ContactItem>
              
              <ContactItem icon={getContactIcon(phone?.type)} title="Telepon">
                <a href={`tel:${phone?.value?.replace(/\s/g, "") || "0248502010"}`} className="text-white/80 text-[14px] font-['Plus_Jakarta_Sans'] underline hover:text-white transition-colors">
                  {phone?.value || "024 8502010"}
                </a>
              </ContactItem>
              
              <ContactItem icon={getContactIcon(email?.type)} title="Email">
                <a href={`mailto:${email?.value || "info@ptsinarcerahsempurna.com"}`} className="text-white/80 text-[14px] font-['Plus_Jakarta_Sans'] underline hover:text-white transition-colors">
                  {email?.value || "info@ptsinarcerahsempurna.com"}
                </a>
              </ContactItem>
              
              <ContactItem icon={getContactIcon(general?.type)} title="Jam Operasional">
                <p className="text-white/80 text-[14px] font-['Plus_Jakarta_Sans'] whitespace-pre-line">
                  {general?.value || "Senin - Jumat: 08.00 - 17.00 WIB\nSabtu: 08.00 - 12.00 WIB"}
                </p>
              </ContactItem>
            </div>
          </FadeUp>

        </div>
      </div>
    </main>
  );
}