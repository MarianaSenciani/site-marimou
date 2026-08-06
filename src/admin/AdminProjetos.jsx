import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AdminProjetos() {
  const handleNavigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-bg-cream flex flex-col font-alexandria">
      <div className="bg-[#303324] text-lime p-4 flex justify-between items-center shadow-md">
        <button 
          onClick={() => handleNavigate('/admin')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold bg-white/10 px-4 py-2 rounded-full border border-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao Painel
        </button>
        <h1 className="text-xl font-bold tracking-widest uppercase">Admin Projetos 🚀</h1>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-near-black mb-4">Em breve... 🚧</h2>
        <p className="text-charcoal text-center max-w-md">
          A interface para gerenciamento de projetos está sendo construída.
        </p>
      </div>
    </div>
  );
}
