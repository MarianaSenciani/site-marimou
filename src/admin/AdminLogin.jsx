import { useAuth } from '../context/AuthContext.jsx';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
export default function AdminLogin() {
  const { login } = useAuth();
  return <main className="local-login"><a href="/" className="wordmark">mari<span>mou</span><i>✳</i></a><div><p className="eyebrow">SEU ESPAÇO DE CRIAÇÃO</p><h1>Por trás<br />do portfólio.</h1><p>Edite seu currículo e organize os projetos. Nesta versão, as alterações ficam salvas apenas neste navegador.</p><button className="pill primary" onClick={login}>Abrir painel local <ArrowUpRight size={18} /></button><a className="text-link" href="/"><ArrowLeft size={16} /> Voltar ao site</a></div><small>Prévia local · O painel fica desativado na versão de produção.</small></main>;
}
