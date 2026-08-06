import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [username, setUsername] = useState('Mari_Minds_2002');
  const [password, setPassword] = useState('Mariana 2011');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen bg-grid-light flex items-center justify-center p-6 font-alexandria text-near-black">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-near-black/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin CV</h1>
          <p className="text-charcoal/80 text-sm">Acesso restrito para Mari Mou</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-near-black mb-1" htmlFor="username">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-near-black/20 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-near-black mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-near-black/20 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 btn-pill rounded-full bg-lime text-near-black font-bold px-6 py-4 flex justify-center items-center gap-2 hover:bg-[#a5bd39] transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-charcoal hover:text-near-black underline decoration-lime underline-offset-4">
            Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}
