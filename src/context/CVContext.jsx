import { initialCVData } from '../data.js';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
const CVContext = createContext();
const defaultDesign = { fonts: { title: 'Alexandria, sans-serif', subtitle: 'Alexandria, sans-serif', body: 'Inter, sans-serif' }, colors: { primary: '#8CA728', secondary: '#92A150', background: '#FFFFFF', text: '#222417' } };
const readSaved = (key, fallback) => { try { const saved = JSON.parse(localStorage.getItem(key)); return saved && typeof saved === 'object' ? saved : fallback; } catch { return fallback; } };
export function CVProvider({ children }) {
  const [cvData, setCvData] = useState(() => readSaved('mari_cv_data_v2', initialCVData));
  const [designData, setDesignData] = useState(() => readSaved('mari_cv_design', defaultDesign));
  const [hydrated, setHydrated] = useState(!import.meta.env.DEV);
  const [saveStatus, setSaveStatus] = useState('');
  const queue = useRef(Promise.resolve());
  const revision = useRef(0);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  useEffect(() => { if (import.meta.env.DEV) fetch('/api/config').then(r => r.ok ? r.json() : {}).then(c => setAiEnabled(!!c.aiEnabled)).catch(() => {}); }, []);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let alive = true;
    fetch('/api/cv').then(response => {
      if (!response.ok) throw new Error();
      return response.json();
    }).then(data => {
      if (!alive) return;
      if (data.content?.cvData && data.content?.designData) { setCvData(data.content.cvData); setDesignData(data.content.designData); }
      setHydrated(true);
    }).catch(() => { if (alive) { setHydrated(true); setSaveStatus('Servidor local indisponível. As edições ficarão apenas neste navegador.'); } });
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('mari_cv_data_v2', JSON.stringify(cvData)); localStorage.setItem('mari_cv_design', JSON.stringify(designData)); }
    catch { if (!import.meta.env.DEV) setSaveStatus('Armazenamento indisponível ou cheio. As alterações ainda não foram salvas.'); }
    if (!import.meta.env.DEV) return;
    const current = ++revision.current;
    setSaveStatus('Salvando currículo…');
    const timer = setTimeout(() => {
      queue.current = queue.current.catch(() => {}).then(async () => {
        const response = await fetch('/api/cv', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: { cvData, designData } }) });
        if (!response.ok) throw new Error();
        if (current === revision.current) setSaveStatus('Currículo salvo neste computador.');
      }).catch(() => { if (current === revision.current) setSaveStatus('Não foi possível salvar no servidor local.'); });
    }, 450);
    return () => clearTimeout(timer);
  }, [cvData, designData, hydrated]);
  const updateDesign = (section, data) => { setDesignData(prev => ({ ...prev, [section]: { ...prev[section], ...data } })); setSaveStatus('Aparência atualizada neste navegador.'); };
  const updateCV = async (language, section, data) => {
    setCvData(prev => ({ ...prev, [language]: { ...prev[language], [section]: data } }));
    setSaveStatus('Alterações salvas neste navegador.');
    if (!aiEnabled || !autoTranslate) return;
    const targetLangs = ['pt', 'en', 'es'].filter(l => l !== language);
    try {
      const res = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: { [section]: data }, sourceLang: language, targetLangs }) });
      if (!res.ok) throw new Error();
      const translated = await res.json();
      setCvData(prev => { const next = { ...prev }; targetLangs.forEach(lang => { if (translated[lang]?.[section]) next[lang] = { ...next[lang], [section]: translated[lang][section] }; }); return next; });
      setSaveStatus('Alterações salvas e seção traduzida. Revise os idiomas antes de exportar.');
    } catch { setSaveStatus('A seção foi salva, mas a tradução não foi concluída. Você pode editar os outros idiomas manualmente.'); }
  };
  return <CVContext.Provider value={{ cvData, setCvData, updateCV, designData, updateDesign, saveStatus, hydrated, aiEnabled, autoTranslate, setAutoTranslate }}>{children}</CVContext.Provider>;
}
export const useCV = () => useContext(CVContext);
