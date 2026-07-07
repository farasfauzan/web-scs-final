"use client";

export default function SearchBar({ onSearch }) {
  return (
    <div className="bg-white rounded-full shadow-lg p-2 flex mx-auto w-full max-w-2xl relative">
      <input 
        type="text" 
        placeholder="Cari Berita..." 
        className="bg-transparent rounded-full pl-6 pr-12 py-3 w-full text-base font-sans focus:outline-none"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <button className="absolute right-3 top-2.5 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-sky-950 hover:bg-yellow-500 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
}