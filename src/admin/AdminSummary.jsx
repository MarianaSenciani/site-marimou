import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { Sparkles, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminSummary({ language }) {
  const { cvData, updateCV } = useCV();
  const [summary, setSummary] = useState(cvData[language]?.summary || '');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setSummary(cvData[language]?.summary || '');
  }, [language, cvData]);

  const handleSave = () => {
    updateCV(language, 'summary', summary);
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setSummary(`Profissional de UX/UI e Direção de Arte com mais de 3 anos de experiência em grandes marcas como Adobe e Brasil Tecpar. Especialista em unir estética visual e usabilidade estratégica para criar produtos digitais que resolvem problemas reais. Foco em wireframes, design systems e identidades visuais de alta performance.`);
      setIsGenerating(false);
    }, 1500);
  };

  const getStatus = (lang) => {
    const text = cvData[lang]?.summary;
    if (text && text.trim().length > 0) return 'translated';
    return 'pending';
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Resumo / Texto Introdutório</h3>
      </div>

      <div className="bg-[#222417] p-5 rounded-2xl border border-white/10 space-y-4 relative">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={8}
          className="w-full bg-transparent text-sm text-white leading-relaxed resize-none focus:outline-none"
          placeholder="Escreva seu resumo aqui..."
        />
        
        <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-4">
          <span className="text-xs text-white/50">
            {summary.length} / 800 caracteres
          </span>
          <div className="flex gap-2">
            <button 
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple/10 text-purple border border-purple/30 rounded-full text-xs font-bold hover:bg-purple/20 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
              Gerar com IA
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-lime text-[#303324] rounded-full text-xs font-bold hover:bg-[#a5bd39] transition-colors flex items-center gap-2"
            >
              <Save size={14} />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
