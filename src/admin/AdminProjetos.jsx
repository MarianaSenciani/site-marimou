import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Download, ImagePlus, Pencil, Plus, Save, Search, Trash2, Upload, X } from 'lucide-react';
import { useProjects, validProject } from '../portfolio/ProjectContext.jsx';
import { ProjectVisual } from '../portfolio/PortfolioSite.jsx';
import { processContent } from '../portfolio/content.js';

const blank = { title: '', subtitle: '', category: 'Produto digital', year: String(new Date().getFullYear()), description: '', image: '', tile: 0, tags: [], demo: false };
const safeImage = image => !image || /^(https?:\/\/|\/[^/]|data:image\/(png|jpeg|webp|gif);base64,)/i.test(image);

export default function AdminProjetos() {
  const { projects, setProjects, saveStatus, saveError, hydrated } = useProjects();
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState('');
  const [removeId, setRemoveId] = useState(null);
  const [query, setQuery] = useState('');
  const [readingImage, setReadingImage] = useState(false);
  const importInput = useRef(null);
  const imageInput = useRef(null);
  const setField = (key, value) => setDraft(current => ({ ...current, [key]: value }));
  const visibleProjects = projects.map((project, index) => ({ project, index })).filter(({ project }) => `${project.title} ${project.category} ${project.subtitle}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));

  const startNew = () => { setDraft({ ...blank }); setNotice(''); setRemoveId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const startEdit = project => { setDraft({ ...project }); setNotice(''); setRemoveId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const save = event => {
    event.preventDefault();
    if (!draft || readingImage) return;
    const next = { ...draft, title: draft.title.trim(), subtitle: (draft.subtitle || '').trim(), description: (draft.description || '').trim(), year: (draft.year || '').trim(), id: draft.id || crypto.randomUUID(), tags: typeof draft.tags === 'string' ? draft.tags.split(',').map(tag => tag.trim()).filter(Boolean) : draft.tags };
    if (!next.title) { setNotice('Adicione um título para salvar o projeto.'); return; }
    if (!safeImage(next.image)) { setNotice('Use uma URL http/https, um caminho iniciado em / ou carregue uma imagem.'); return; }
    setProjects(list => list.some(project => project.id === next.id) ? list.map(project => project.id === next.id ? next : project) : [...list, next]);
    setDraft(null); setNotice(`“${next.title}” ${draft.id ? 'atualizado' : 'cadastrado'} no portfólio.`);
  };
  const uploadImage = event => {
    const file = event.target.files?.[0]; if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 5 * 1024 * 1024) { setNotice('Escolha PNG, JPG, WebP ou GIF de até 5 MB.'); event.target.value = ''; return; }
    setReadingImage(true);
    const reader = new FileReader();
    reader.onload = () => { setField('image', reader.result); setReadingImage(false); setNotice(`Capa “${file.name}” pronta para salvar.`); };
    reader.onerror = () => { setReadingImage(false); setNotice('Não foi possível ler esta imagem.'); };
    reader.readAsDataURL(file);
  };
  const exportProjects = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'marimou-projetos.json'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const importProjects = async event => {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data) || !data.every(validProject)) throw new Error();
      setProjects(list => [...list, ...data.map(project => ({ ...project, id: crypto.randomUUID() }))]);
      setNotice(`${data.length} projeto${data.length === 1 ? '' : 's'} importado${data.length === 1 ? '' : 's'}. Os existentes foram mantidos.`);
    } catch { setNotice('Arquivo inválido. Use um JSON exportado por este painel.'); }
    event.target.value = '';
  };
  const reorder = (index, direction) => setProjects(list => { const next = [...list]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; return next; });

  return <main className="admin-projects-page admin-container">
    <div className="admin-kicker"><span>CONTEÚDO / PROJETOS</span><span>02 / 03</span></div>
    <div className="admin-page-heading"><div><p className="admin-eyebrow">O QUE VOCÊ CRIA MERECE SER VISTO</p><h1>Projetos em<br /><em>movimento.</em></h1></div><p>Cadastre cases, ajuste imagens e organize a ordem em que eles aparecem na home e na página de projetos.</p></div>
    <div className="admin-project-actions"><button className="admin-button admin-button-primary" onClick={startNew} disabled={!hydrated}><Plus size={17} /> Novo projeto</button><button className="admin-button admin-button-outline" onClick={exportProjects}><Download size={16} /> Exportar backup</button><button className="admin-button admin-button-outline" onClick={() => importInput.current?.click()}><Upload size={16} /> Importar backup</button><input ref={importInput} type="file" accept="application/json,.json" hidden onChange={importProjects} /><a href="/projetos" target="_blank" rel="noreferrer" className="admin-button admin-button-text">Ver portfólio <ArrowUpRight size={17} /></a></div>
    {(notice || saveError || saveStatus) && <p className={`admin-feedback ${saveError ? 'is-error' : ''}`} role="status">{saveError || notice || saveStatus}</p>}
    <div className={`admin-project-layout ${draft ? 'is-editing' : ''}`}>
      <section className="admin-project-list" aria-label="Projetos cadastrados"><div className="admin-list-heading"><div><span>SEUS PROJETOS</span><strong>{String(projects.length).padStart(2, '0')}</strong></div><label className="admin-search"><Search size={16} /><span className="sr-only">Buscar projetos</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar projeto" /></label></div>
        {visibleProjects.map(({ project, index }) => <article className="admin-project-card" key={project.id}><div className="admin-project-thumb"><ProjectVisual project={project} /></div><div className="admin-project-card-body"><span className="admin-project-meta">{project.category} <i>•</i> {project.year || 'Sem ano'} {project.demo && <b>ESTUDO VISUAL</b>}</span><h2>{project.title}</h2><p>{project.subtitle || 'Sem subtítulo'}</p><div className="admin-project-row-actions"><button onClick={() => startEdit(project)}><Pencil size={15} /> Editar</button><button onClick={() => setRemoveId(project.id)}><Trash2 size={15} /> Excluir</button></div></div><div className="admin-order"><button disabled={index === 0 || !!query} aria-label={`Mover ${project.title} para cima`} onClick={() => reorder(index, -1)}><ArrowUp size={17} /></button><button disabled={index === projects.length - 1 || !!query} aria-label={`Mover ${project.title} para baixo`} onClick={() => reorder(index, 1)}><ArrowDown size={17} /></button></div>{removeId === project.id && <div className="admin-delete-confirm" role="alert"><p>Excluir “{project.title}” do portfólio?</p><div><button onClick={() => { setProjects(list => list.filter(item => item.id !== project.id)); setRemoveId(null); setNotice('Projeto excluído.'); }}>Sim, excluir</button><button onClick={() => setRemoveId(null)}>Cancelar</button></div></div>}</article>)}
        {!visibleProjects.length && <div className="admin-empty">{query ? 'Nenhum projeto corresponde à busca.' : 'Seu portfólio começa aqui. Adicione o primeiro projeto.'}</div>}
      </section>
      <aside className="admin-project-editor" aria-label="Editor de projeto">{draft ? <form onSubmit={save}><div className="admin-editor-head"><div><span>{draft.id ? 'EDITANDO PROJETO' : 'NOVO PROJETO'}</span><h2>{draft.id ? draft.title || 'Sem título' : 'Vamos criar algo novo?'}</h2></div><button type="button" onClick={() => setDraft(null)} aria-label="Fechar editor"><X size={20} /></button></div><div className="admin-editor-preview"><ProjectVisual project={draft} /><span>PRÉVIA DA CAPA</span></div><div className="admin-form-fields"><label>Título <input required maxLength={100} value={draft.title} onChange={event => setField('title', event.target.value)} placeholder="Nome do projeto" /></label><label>Subtítulo <input maxLength={160} value={draft.subtitle || ''} onChange={event => setField('subtitle', event.target.value)} placeholder="Uma frase sobre o trabalho" /></label><div className="admin-field-row"><label>Categoria <select value={draft.category} onChange={event => setField('category', event.target.value)}>{processContent.map(item => <option key={item.name}>{item.name}</option>)}</select></label><label>Ano <input value={draft.year || ''} onChange={event => setField('year', event.target.value)} placeholder="2026" /></label></div><label>Descrição <textarea rows="5" value={draft.description || ''} onChange={event => setField('description', event.target.value)} placeholder="Conte o desafio, sua atuação e o resultado…" /></label><label>Tags <input value={Array.isArray(draft.tags) ? draft.tags.join(', ') : draft.tags || ''} onChange={event => setField('tags', event.target.value)} placeholder="UX/UI, Branding, Webdesign" /><small>Separe por vírgulas.</small></label><label>URL da imagem ou GIF <input value={(draft.image || '').startsWith('data:') ? '' : draft.image || ''} onChange={event => setField('image', event.target.value)} placeholder="https://… ou /assets/…" /></label><div className="admin-cover-actions"><button type="button" onClick={() => imageInput.current?.click()}><ImagePlus size={17} /> Enviar capa</button>{draft.image && <button type="button" onClick={() => setField('image', '')}>Remover capa</button>}<input ref={imageInput} type="file" hidden accept="image/png,image/jpeg,image/webp,image/gif" onChange={uploadImage} /><small>PNG, JPG, WebP ou GIF · até 5 MB</small></div><label>Mockup padrão <select value={draft.tile ?? 0} onChange={event => setField('tile', Number(event.target.value))}><option value="0">Celulares</option><option value="1">Ecobag</option><option value="2">Cartazes</option><option value="3">Website</option></select></label><label className="admin-check"><input type="checkbox" checked={!!draft.demo} onChange={event => setField('demo', event.target.checked)} /><span>Identificar como estudo visual demonstrativo</span></label></div><div className="admin-editor-footer"><button type="submit" className="admin-button admin-button-primary" disabled={readingImage || !hydrated}><Save size={16} /> {readingImage ? 'Lendo imagem…' : 'Salvar projeto'}</button><button type="button" className="admin-button admin-button-text" onClick={() => setDraft(null)}>Cancelar</button></div></form> : <div className="admin-editor-idle"><span>✳</span><h2>Cada projeto tem<br />uma história.</h2><p>Selecione um trabalho para editar seus detalhes ou comece um novo case.</p><button className="admin-button admin-button-outline" onClick={startNew}><Plus size={16} /> Criar projeto</button></div>}</aside>
    </div><p className="admin-local-note">PRÉVIA LOCAL <span>•</span> Os dados são salvos em arquivos neste computador. Exporte um backup para levá-los a outro dispositivo.</p>
  </main>;
}
