"use client";

import { useState } from "react";

export default function ProjectFilter({ categories, onFilter }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (onFilter) onFilter(cat);
  };

  return (
    <div className="bg-white rounded-full shadow-lg p-2 flex overflow-x-auto mx-auto max-w-4xl scrollbar-hide">
      {categories.map((cat, idx) => (
        <button 
          key={idx}
          onClick={() => handleCategoryClick(cat)}
          className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold font-sans transition-colors ${
            activeCategory === cat ? "bg-sky-900 text-white shadow-md" : "text-neutral-500 hover:bg-neutral-100"
          }`}
        >
          {cat}
        </button>
      ))}
      <div className="relative ml-auto hidden md:block">
        <input 
          type="text" 
          placeholder="Cari..." 
          className="bg-neutral-100 rounded-full pl-4 pr-10 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-sky-900 w-48"
        />
        <svg className="w-5 h-5 text-neutral-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}