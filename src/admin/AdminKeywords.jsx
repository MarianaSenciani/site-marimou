import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { Trash2, Plus, X } from 'lucide-react';

export default function AdminKeywords({ language }) {
  const { cvData, updateCV } = useCV();
  const [keywords, setKeywords] = useState(cvData[language]?.keywords || '');
  
  // We'll treat keywords as a single comma-separated string for easy metadata,
  // or as an array. Let's make it an array.
  const [keywordList, setKeywordList] = useState([]);

  useEffect(() => {
    const rawKeywords = cvData[language]?.keywords || '';
    setKeywords(rawKeywords);
    setKeywordList(rawKeywords ? rawKeywords.split(',').map(k => k.trim()).filter(k => k) : []);
  }, [language, cvData]);

  const saveKeywords = (newList) => {
    setKeywordList(newList);
    const joined = newList.join(', ');
    setKeywords(joined);
    updateCV(language, 'keywords', joined);
  };

  const addKeyword = (value) => {
    if (!value.trim()) return;
    saveKeywords([...keywordList, value.trim()]);
  };

  const removeKeyword = (index) => {
    const newList = [...keywordList];
    newList.splice(index, 1);
    saveKeywords(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight mb-2">Keywords (SEO/ATS)</h3>
        <p className="text-sm text-white/50">Palavras-chave ocultas que ajudam robôs de recrutamento (ATS) a encontrar seu currículo quando exportado em PDF.</p>
      </div>

      <div className="bg-[#222417] p-5 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2 mb-4">
          {keywordList.map((kw, idx) => (
            <div key={idx} className="flex items-center bg-[#3A3B35] border border-white/10 rounded-pill pl-3 pr-1 py-1">
              <span className="text-sm text-white font-medium">{kw}</span>
              <button 
                onClick={() => removeKeyword(idx)}
                className="ml-2 w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Digite uma keyword e pressione Enter ou vírgula..."
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 pointer-events-none">
            ↵ Enter
          </span>
        </div>
      </div>
    </div>
  );
}
