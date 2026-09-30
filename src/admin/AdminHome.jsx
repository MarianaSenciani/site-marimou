import { ArrowUpRight, FileText, FolderOpen, Plus, Sparkles } from 'lucide-react';
import { useProjects } from '../portfolio/ProjectContext.jsx';
import { useCV } from '../context/CVContext.jsx';

export default function AdminHome() {
  const { projects, saveStatus: projectStatus, saveError } = useProjects();
  const { cvData, saveStatus: cvStatus } = useCV();
  const name = cvData.pt?.personal?.name?.split(' ')[0] || 'Mari';
  return <main className="admin-overview admin-container">
    <div className="admin-kicker"><span>PAINEL DE CRIAÇÃO</span><span>01 / 03</span></div>
    <div className="admin-overview-heading"><div><p className="admin-eyebrow">OLÁ, {name.toUpperCase()} ✳</p><h1>Seu trabalho,<br /><em>do seu jeito.</em></h1></div><p>Este é o seu espaço para cuidar dos projetos e manter o currículo em dia. Cada ajuste ganha vida no portfólio da prévia local.</p></div>
    <div className="admin-overview-strip"><div><strong>{String(projects.length).padStart(2, '0')}</strong><span>projetos no portfólio</span></div><div><strong>{String(projects.filter(project => !project.demo).length).padStart(2, '0')}</strong><span>cases reais</span></div><div><Sparkles size={22} /><span>{saveError || projectStatus || cvStatus || 'Tudo pronto para criar.'}</span></div></div>
    <div className="admin-section-heading"><span>ESCOLHA POR ONDE COMEÇAR</span><span>GESTÃO DE CONTEÚDO ↓</span></div>
    <div className="admin-entry-grid">
      <a className="admin-entry admin-entry-projects" href="/admin/projetos"><div className="admin-entry-top"><span>01 / PORTFÓLIO</span><ArrowUpRight size={23} /></div><div className="admin-entry-icon"><FolderOpen size={36} strokeWidth={1.4} /></div><div><h2>Projetos<span>↗</span></h2><p>Cadastre, organize e apresente seus trabalhos com imagens, contexto e detalhes.</p></div><span className="admin-entry-link"><Plus size={16} /> Gerenciar projetos</span></a>
      <a className="admin-entry admin-entry-cv" href="/admin/cv"><div className="admin-entry-top"><span>02 / TRAJETÓRIA</span><ArrowUpRight size={23} /></div><div className="admin-entry-icon"><FileText size={36} strokeWidth={1.4} /></div><div><h2>Currículo<span>↗</span></h2><p>Edite sua trajetória, visualize o resultado e atualize o PDF oferecido no site.</p></div><span className="admin-entry-link"><Plus size={16} /> Editar currículo</span></a>
    </div>
    <p className="admin-local-note">PRÉVIA LOCAL <span>•</span> Conteúdo salvo em arquivos neste computador. O painel continua desativado na versão pública até receber autenticação e hospedagem.</p>
  </main>;
}
