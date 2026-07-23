import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Marca que o JS está ativo: habilita os estados iniciais escondidos das animações.
// Se este script não rodar, o conteúdo fica visível normalmente.
document.documentElement.classList.add('gsap-enabled');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
