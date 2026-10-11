import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './portfolio/portfolio.css';
import './portfolio/experience.css';
import App from './App.jsx';

// Marca que o JS está ativo: habilita os estados iniciais escondidos das animações.
// Se este script não rodar, o conteúdo fica visível normalmente.
document.documentElement.classList.remove('gsap-enabled');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
