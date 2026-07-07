export const metadata = {
  title: "Hubungi Kami",
};

export default function HubungiKamiPage() {
  return (
    <div className="w-full bg-sky-950 min-h-screen relative flex items-center justify-center pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: `url('[https://placehold.co/1440x900](https://placehold.co/1440x900)')` }} />
      
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 flex flex-col gap-12 mt-10">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-sans">Hubungi Kami</h1>
          <p className="text-zinc-300 font-sans">Mari diskusikan proyek masa depan Anda bersama tim ahli kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Kirim Pesan */}
          <div className="border border-white/20 rounded-3xl p-8 backdrop-blur-md bg-sky-950/40">
            <h2 className="text-2xl font-bold text-white mb-6 font-sans">Kirimkan Pesan</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-sans">Nama Lengkap <span className="text-red-400">*</span></label>
                  <input type="text" className="bg-transparent border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-sans">Alamat Email <span className="text-red-400">*</span></label>
                  <input type="email" className="bg-transparent border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-sans">Nomor Telepon</label>
                  <input type="tel" className="bg-transparent border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-sans">Subjek</label>
                  <input type="text" className="bg-transparent border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-sans">Pesan</label>
                <textarea rows={5} className="bg-transparent border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-bold py-4 rounded-xl mt-4 transition-colors">
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="border border-white/20 rounded-3xl p-8 backdrop-blur-md bg-sky-950/40">
            <h2 className="text-2xl font-bold text-white mb-8 font-sans">Informasi Kontak</h2>
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-white font-bold font-sans mb-1">Alamat</h4>
                <p className="text-zinc-300 text-sm font-sans leading-relaxed">Jl Karangrejo Barat No 9. Tinjomoyo, KOTA SEMARANG</p>
              </div>
              <div>
                <h4 className="text-white font-bold font-sans mb-1">Telepon</h4>
                <a href="tel:0248502010" className="text-zinc-300 hover:text-yellow-400 text-sm font-sans underline underline-offset-4 transition-colors">024 8502010</a>
              </div>
              <div>
                <h4 className="text-white font-bold font-sans mb-1">Email</h4>
                <a href="mailto:info@ptsinarcerahsempurna.com" className="text-zinc-300 hover:text-yellow-400 text-sm font-sans underline underline-offset-4 transition-colors">info@ptsinarcerahsempurna.com</a>
              </div>
              <div>
                <h4 className="text-white font-bold font-sans mb-1">Jam Operasional</h4>
                <p className="text-zinc-300 text-sm font-sans leading-relaxed">Senin - Jumat: 08.00 - 17.00 WIB<br/>Sabtu: 08.00 - 12.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}