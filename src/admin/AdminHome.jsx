import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FileText, FolderGit2, LogOut, ArrowLeft } from 'lucide-react';

export default function AdminHome() {
  const { logout } = useAuth();

  const handleNavigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-bg-cream flex flex-col font-alexandria">
      <div className="bg-[#303324] text-lime p-4 flex justify-between items-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold bg-white/10 px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Site
          </button>
          <h1 className="text-xl font-bold tracking-widest uppercase hidden md:block">Admin Dashboard ⚡</h1>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 font-bold bg-transparent border-2 border-lime text-lime hover:bg-lime hover:text-near-black px-5 py-2 rounded-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-lime/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#E9CDFF]/40 rounded-full blur-3xl -z-10"></div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-near-black text-center max-w-2xl leading-tight">
          O que você deseja gerenciar hoje?
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
          <button 
            onClick={() => handleNavigate('/admin/cv')}
            className="flex-1 group relative bg-white border-2 border-near-black rounded-[32px] p-8 hover:bg-lime transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(45,45,45,1)] hover:shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:translate-x-1 hover:translate-y-1 flex flex-col items-center justify-center gap-6 min-h-[320px]"
          >
            <div className="w-24 h-24 bg-near-black/5 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FileText className="w-12 h-12 text-near-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-3xl font-bold text-near-black">Admin CV 📄</span>
              <p className="text-charcoal font-medium">Gerencie seu currículo, dados pessoais, experiências e gere o PDF.</p>
            </div>
          </button>

          <button 
            onClick={() => handleNavigate('/admin/projetos')}
            className="flex-1 group relative bg-white border-2 border-near-black rounded-[32px] p-8 hover:bg-[#E9CDFF] transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(45,45,45,1)] hover:shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:translate-x-1 hover:translate-y-1 flex flex-col items-center justify-center gap-6 min-h-[320px]"
          >
            <div className="w-24 h-24 bg-near-black/5 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FolderGit2 className="w-12 h-12 text-near-black group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-3xl font-bold text-near-black">Admin Projetos 🚀</span>
              <p className="text-charcoal font-medium">Adicione, edite ou remova projetos do seu portfólio na home.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
