import React, { useState } from 'react';
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
import { Download, Upload } from 'lucide-react';

export default function AdminLayout({ currentPath }) {
  const { cvData, designData, setCvData, saveStatus, aiEnabled, autoTranslate, setAutoTranslate } = useCV();
  const [activeTab, setActiveTab] = useState('info');
  const [language, setLanguage] = useState('pt');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [pdfStatus, setPdfStatus] = useState('');

  const tabs = [
    { id: 'info', label: 'Dados pessoais' },
    { id: 'summary', label: 'Resumo' },
    { id: 'experience', label: 'Experiência' },
    { id: 'education', label: 'Formação' },
    { id: 'courses', label: 'Cursos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'languages', label: 'Idiomas' },
    { id: 'keywords', label: 'Palavras-chave' },
    { id: 'appearance', label: 'Aparência' },
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

  const handleExportPDF = async (publish = false) => {
    setIsExporting(true);
    const element = document.getElementById('cv-preview');
    if (!element) { setIsExporting(false); return; }

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

      if (publish) {
        const response = await fetch('/api/cv/pdf', { method: 'PUT', headers: { 'Content-Type': 'application/pdf' }, body: pdf.output('blob') });
        if (!response.ok) throw new Error('Falha ao atualizar o PDF');
        setPdfStatus('PDF atualizado para download na prévia do site.');
      } else {
        pdf.save(`CV_${cvData[language]?.personal?.name?.replace(/\s+/g, '_') || 'Mariana'}_${language.toUpperCase()}.pdf`);
        setPdfStatus('PDF baixado. Você também pode atualizar o arquivo oferecido no site.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setPdfStatus('Não foi possível gerar ou atualizar o PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePublicPDF = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' || file.size > 10 * 1024 * 1024) { setPdfStatus('Escolha um PDF de até 10 MB.'); event.target.value = ''; return; }
    try {
      const response = await fetch('/api/cv/pdf', { method: 'PUT', headers: { 'Content-Type': 'application/pdf' }, body: file });
      if (!response.ok) throw new Error();
      setPdfStatus('PDF enviado. O botão “Baixar currículo” da prévia já usa este arquivo.');
    } catch { setPdfStatus('Não foi possível salvar este PDF no servidor local.'); }
    event.target.value = '';
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
        setPdfStatus('Dados do currículo importados. Revise os campos antes de atualizar o PDF.');
      } else {
        setPdfStatus('Falha ao importar os dados do currículo.');
      }
    } catch (err) {
      console.error(err);
      setPdfStatus('Não foi possível importar os dados do currículo.');
    } finally {
      setIsImporting(false);
      e.target.value = '';
    }
  };

  return (
    <div className="admin-cv-page admin-container">
      <div className="admin-kicker"><span>CONTEÚDO / CURRÍCULO</span><span>03 / 03</span></div>
      <div className="admin-page-heading"><div><p className="admin-eyebrow">TRAJETÓRIA EM CONSTRUÇÃO</p><h1>Sua história,<br /><em>bem contada.</em></h1></div><p>Edite os dados ao lado da prévia. As mudanças na página Sobre mim aparecem imediatamente; o PDF pode ser atualizado separadamente.</p></div>
      <div className="admin-cv">
      <aside className="admin-cv-nav">
        <div className="admin-cv-nav-heading"><span>SEÇÕES DO CURRÍCULO</span><strong>09</strong></div>
        
        <nav aria-label="Seções do currículo">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'is-active' : ''}
              aria-current={activeTab === tab.id ? 'true' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-cv-nav-tools">
          <label className={`admin-import-ai ${!aiEnabled ? 'is-disabled' : ''}`}>
            <Upload size={16} />
            {isImporting ? 'Importando...' : aiEnabled ? 'Importar PDF com Gemini' : 'Importação IA não configurada'}
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleImportCV}
              disabled={isImporting || !aiEnabled}
              className="hidden" 
            />
          </label>
          
          <span>IMPORTAR DADOS COM IA EXIGE CHAVE GEMINI.</span>
        </div>
      </aside>

      <main className="admin-cv-main">
        <div className="admin-cv-status" role="status">{saveStatus || 'Currículo pronto para editar.'}{pdfStatus && <span>{pdfStatus}</span>}{aiEnabled && <label><input type="checkbox" checked={autoTranslate} onChange={e => setAutoTranslate(e.target.checked)} /> Traduzir automaticamente com Gemini</label>}</div>
        <header className="admin-cv-toolbar">
          <h2>
            Editar: {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
          
          <div className="flex items-center gap-3">
            <span>IDIOMA</span>
            <div className="admin-language-switch">
              {[
                { id: 'pt', label: 'PT' },
                { id: 'en', label: 'EN' },
                { id: 'es', label: 'ES' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={language === lang.id ? 'is-active' : ''}
                  aria-pressed={language === lang.id}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="admin-cv-workspace">
          <div className="admin-cv-editor">
            {renderContent()}
          </div>
          
          <div className="admin-cv-preview">
            <div className="admin-cv-preview-toolbar">
              <span>PRÉVIA DO CURRÍCULO</span>
              <div><button onClick={() => handleExportPDF(false)} disabled={isExporting}><Download size={15} /> Baixar PDF</button><button onClick={() => handleExportPDF(true)} disabled={isExporting}>{isExporting ? 'Gerando…' : 'Atualizar PDF do site'}</button></div>
            </div>
            <div className="admin-cv-pdf-upload"><label><Upload size={15} /> Enviar um PDF pronto<input type="file" accept="application/pdf,.pdf" onChange={handlePublicPDF} hidden /></label><a href="/api/cv/pdf" target="_blank" rel="noreferrer">Ver PDF oferecido no site ↗</a></div>
            <p className="admin-pdf-note">O PDF gerado pela prévia é visual. Para candidaturas que leem texto automaticamente, envie um PDF pronto com texto selecionável.</p>
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
      <p className="admin-local-note">PRÉVIA LOCAL <span>•</span> Dados e PDF salvos neste computador. Atualizar o PDF do site não publica alterações na versão hospedada.</p>
    </div>
  );
}
