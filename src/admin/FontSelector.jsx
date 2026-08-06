import React, { useState } from 'react';

const FONTS = [
  { name: 'Inter', category: 'Sans-serif' },
  { name: 'Roboto', category: 'Sans-serif' },
  { name: 'Open Sans', category: 'Sans-serif' },
  { name: 'Montserrat', category: 'Sans-serif' },
  { name: 'Poppins', category: 'Sans-serif' },
  { name: 'Alexandria', category: 'Sans-serif' },
  { name: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' },
  { name: 'Lora', category: 'Serif' },
  { name: 'PT Serif', category: 'Serif' },
  { name: 'Dancing Script', category: 'Script' },
  { name: 'Pacifico', category: 'Script' },
  { name: 'Caveat', category: 'Script' },
  { name: 'Roboto Mono', category: 'Monospace' },
  { name: 'Fira Code', category: 'Monospace' },
  { name: 'Space Mono', category: 'Monospace' },
];

const CATEGORIES = ['Todas', 'Sans-serif', 'Serif', 'Script', 'Monospace'];

export default function FontSelector({ label, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('Todas');

  const filteredFonts = filter === 'Todas' 
    ? FONTS 
    : FONTS.filter(f => f.category === filter);

  // Extract base font name if there are fallbacks
  const displayValue = value ? value.split(',')[0].replace(/['"]/g, '') : 'Selecionar fonte';

  return (
    <div className="relative">
      <label className="block text-xs font-bold text-white/70 mb-1 uppercase tracking-wider">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0d0f08] text-white focus:outline-none focus:border-lime flex justify-between items-center text-left"
        style={{ fontFamily: displayValue }}
      >
        <span>{displayValue}</span>
        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 right-0 mt-2 bg-[#1a1c14] border border-white/10 rounded-xl shadow-xl overflow-hidden max-h-80 flex flex-col">
          {/* Categorias */}
          <div className="flex gap-2 p-3 overflow-x-auto border-b border-white/5 no-scrollbar shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === cat ? 'bg-lime text-near-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Lista de fontes */}
          <div className="overflow-y-auto p-2 flex-1">
            {filteredFonts.map(font => (
              <button
                key={font.name}
                onClick={() => {
                  onChange(`'${font.name}', ${font.category.toLowerCase()}`);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-white/5 flex items-center justify-between ${displayValue === font.name ? 'text-lime' : 'text-white'}`}
                style={{ fontFamily: `'${font.name}', ${font.category.toLowerCase()}` }}
              >
                <span className="text-lg">{font.name}</span>
                <span className="text-[10px] opacity-40 uppercase tracking-widest">{font.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
