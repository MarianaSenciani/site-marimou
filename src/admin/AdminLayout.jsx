import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCV } from '../context/CVContext.jsx';
import AdminPersonalInfo from './AdminPersonalInfo.jsx';
import AdminSummary from './AdminSummary.jsx';
import AdminExperience from './AdminExperience.jsx';
import AdminEducation from './AdminEducation.jsx';
import AdminCourses from './AdminCourses.jsx';
import AdminSkills from './AdminSkills.jsx';
import AdminLanguages from './AdminLanguages.jsx';
import AdminKeywords from './AdminKeywords.jsx';
import AdminAppearance from './AdminAppearance.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Upload } from 'lucide-react';

export default function AdminLayout({ currentPath }) {
  const { logout } = useAuth();
  const { cvData, designData, setCvData } = useCV();
  const [activeTab, setActiveTab] = useState('info');
  const [language, setLanguage] = useState('pt');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const tabs = [
    { id: 'info', label: '👤 Info Pessoal' },
    { id: 'summary', label: '📝 Resumo' },
    { id: 'experience', label: '💼 Experiência' },
    { id: 'education', label: '🎓 Formação' },
    { id: 'courses', label: '📚 Cursos' },
    { id: 'skills', label: '⚙️ Habilidades' },
    { id: 'languages', label: '🌐 Idiomas' },
    { id: 'keywords', label: '🔑 Keywords' },
    { id: 'appearance', label: '🎨 Aparência' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info': return <AdminPersonalInfo language={language} />;
      case 'summary': return <AdminSummary language={language} />;
      case 'experience': return <AdminExperience language={language} />;
      case 'education': return <AdminEducation language={language} />;
      case 'courses': return <AdminCourses language={language} />;
      case 'skills': return <AdminSkills language={language} />;
      case 'languages': return <AdminLanguages language={language} />;
      case 'keywords': return <AdminKeywords language={language} />;
      case 'appearance': return <AdminAppearance />;
      default: return null;
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('cv-preview');
    if (!element) return;

    try {
      // Small delay to ensure any fonts/images are loaded
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dynamic height to fit all content on a single page
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Add keywords as metadata to help ATS parsers somewhat (although true text is better)
      const keywords = cvData[language]?.keywords || '';
      if (keywords) {
        pdf.setProperties({
          title: `CV_${cvData[language]?.personal?.name || 'Mariana'}_${language.toUpperCase()}`,
          author: cvData[language]?.personal?.name || 'Mariana',
          keywords: keywords,
        });
      }

      pdf.save(`CV_${cvData[language]?.personal?.name?.replace(/\s+/g, '_') || 'Mariana'}_${language.toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportCV = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const parsedData = await res.json();
        setCvData(prev => ({
          ...prev,
          [language]: {
            ...prev[language],
            ...parsedData
          }
        }));
        alert('CV importado com sucesso!');
      } else {
        alert('Falha ao importar CV.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao importar CV.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-grid-dark font-alexandria flex text-bg-cream">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 border-r border-white/10 flex flex-col bg-[#303324]/80 backdrop-blur">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-lime tracking-tight">Admin CV</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-[12px] text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-lime text-near-black font-bold shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <label className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-white/5 hover:bg-white/10 text-white rounded-pill cursor-pointer transition-colors border border-white/10">
            <Upload size={16} />
            {isImporting ? 'Importando...' : 'Importar PDF CV'}
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleImportCV}
              disabled={isImporting}
              className="hidden" 
            />
          </label>
          
          <a href="/admin" className="block w-full text-center px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
            Voltar ao Painel
          </a>
          <a href="/" className="block w-full text-center px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
            Ver site
          </a>
          <button
            onClick={logout}
            className="w-full px-4 py-3 text-sm font-bold bg-transparent border-2 border-lime text-lime hover:bg-lime hover:text-near-black rounded-pill transition-colors"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-[72px] shrink-0 border-b border-white/10 flex items-center justify-between px-8 bg-[#303324]/90 backdrop-blur z-10">
          <h2 className="text-xl font-bold text-white">
            Editar: {tabs.find((t) => t.id === activeTab)?.label.substring(3)}
          </h2>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Idioma:</span>
            <div className="flex bg-[#3A3B35] rounded-full p-1 border border-white/10">
              {[
                { id: 'pt', label: 'PT' },
                { id: 'en', label: 'EN' },
                { id: 'es', label: 'ES' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${
                    language === lang.id
                      ? 'bg-lime text-near-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Editor & Preview Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Area */}
          <div className="w-1/2 overflow-y-auto p-8 relative z-0">
            {renderContent()}
          </div>
          
          {/* Preview Area */}
          <div className="w-1/2 overflow-y-auto p-8 bg-grid-light border-l border-white/10 relative z-0">
            <div className="mb-6 flex justify-between items-center bg-[#F5FAE2]/90 backdrop-blur p-4 rounded-2xl border border-near-black/10 shadow-sm sticky top-0 z-10">
              <span className="text-xs font-bold tracking-[0.1em] text-near-black uppercase">Preview do Currículo</span>
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="text-xs font-bold text-near-black bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform duration-150 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isExporting ? 'Exportando...' : 'Exportar PDF'}
              </button>
            </div>
            {/* The preview box */}
            <div 
              id="cv-preview" 
              className="shadow-2xl p-10 font-sans mx-auto overflow-hidden relative"
              style={{ 
                width: '210mm', 
                minHeight: '297mm',
                backgroundColor: designData?.colors?.background || '#FFFFFF',
                color: designData?.colors?.text || '#222417',
                fontFamily: designData?.fonts?.body || 'Inter, sans-serif'
              }}
            >
              <div className="text-center mb-8">
                <h1 
                  className="text-4xl font-bold mb-2 tracking-tight"
                  style={{ 
                    color: designData?.colors?.primary || '#D5F150',
                    fontFamily: designData?.fonts?.title || 'Alexandria, sans-serif'
                  }}
                >
                  {cvData[language]?.personal?.name || 'Seu Nome'}
                </h1>
                <p className="text-charcoal font-bold">
                  {cvData[language]?.personal?.role || 'Seu Cargo'}
                </p>
                <div className="w-12 h-1 bg-lime mx-auto mt-4 mb-4" />
                <p className="text-sm text-charcoal">
                  {cvData[language]?.personal?.email || 'email@exemplo.com'} · {cvData[language]?.personal?.phone || '(00) 00000-0000'} · {cvData[language]?.personal?.location || 'Sua Cidade'}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 
                  className="text-sm font-bold tracking-widest uppercase mb-3 border-b-2 pb-2"
                  style={{ 
                    color: designData?.colors?.primary || '#D5F150',
                    borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                    fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                  }}
                >Resumo</h2>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {cvData[language]?.summary || 'Escreva seu resumo...'}
                </p>
              </div>

              {cvData[language]?.experience?.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-sm font-bold tracking-widest uppercase mb-4 border-b-2 pb-2"
                    style={{ 
                      color: designData?.colors?.primary || '#D5F150',
                      borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                      fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                    }}
                  >Experiência Profissional</h2>
                  <div className="space-y-5">
                    {cvData[language].experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-base">{exp.role}</h3>
                          <span className="text-xs font-bold text-charcoal/60">{exp.period}</span>
                        </div>
                        <p className="text-sm font-bold text-charcoal mb-2">{exp.company}</p>
                        <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-1 text-charcoal/90">
                          {exp.activities?.map((act, i) => (
                            <li key={i}>{act}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cvData[language]?.education?.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-sm font-bold tracking-widest uppercase mb-4 border-b-2 pb-2"
                    style={{ 
                      color: designData?.colors?.primary || '#D5F150',
                      borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                      fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                    }}
                  >Formação Acadêmica</h2>
                  <div className="space-y-4">
                    {cvData[language].education.map((edu, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-base">{edu.degree}</h3>
                          <span className="text-xs font-bold text-charcoal/60">{edu.period}</span>
                        </div>
                        <p className="text-sm font-bold text-charcoal">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {cvData[language]?.courses?.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-sm font-bold tracking-widest uppercase mb-4 border-b-2 pb-2"
                    style={{ 
                      color: designData?.colors?.primary || '#D5F150',
                      borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                      fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                    }}
                  >Cursos Complementares</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {cvData[language].courses.map((course, idx) => (
                      <div key={idx} className="break-inside-avoid">
                        <h3 className="font-bold text-sm mb-1">{course.title}</h3>
                        <p className="text-xs font-bold text-charcoal/80">{course.institution}</p>
                        <p className="text-xs text-charcoal/60">{course.duration} · {course.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cvData[language]?.skills?.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-sm font-bold tracking-widest uppercase mb-4 border-b-2 pb-2"
                    style={{ 
                      color: designData?.colors?.primary || '#D5F150',
                      borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                      fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                    }}
                  >Habilidades</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {cvData[language].skills.map((skillCat, idx) => (
                      <div key={idx} className="break-inside-avoid">
                        <h3 className="font-bold text-sm mb-2">{skillCat.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {skillCat.items?.map((item, i) => (
                            <span key={i} className="text-[10px] font-bold bg-near-black/5 text-near-black px-2 py-0.5 rounded-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cvData[language]?.languages?.length > 0 && (
                <div className="mb-8">
                  <h2 
                    className="text-sm font-bold tracking-widest uppercase mb-4 border-b-2 pb-2"
                    style={{ 
                      color: designData?.colors?.primary || '#D5F150',
                      borderColor: `${designData?.colors?.primary || '#D5F150'}33`,
                      fontFamily: designData?.fonts?.subtitle || 'Alexandria, sans-serif'
                    }}
                  >Idiomas</h2>
                  <div className="flex gap-6">
                    {cvData[language].languages.map((lang, idx) => (
                      <div key={idx} className="flex gap-2 items-baseline">
                        <span className="font-bold text-sm">{lang.name}:</span>
                        <span className="text-sm text-charcoal/80">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
