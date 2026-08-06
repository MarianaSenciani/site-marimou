import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';

export default function AdminPersonalInfo({ language }) {
  const { cvData, updateCV } = useCV();
  const [formData, setFormData] = useState(cvData[language]?.personal || {});

  useEffect(() => {
    setFormData(cvData[language]?.personal || {});
  }, [language, cvData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateCV(language, 'personal', formData);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Informações Pessoais</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
            Foto de Perfil (Para a página Sobre Mim)
          </label>
          {formData.profilePhoto && (
            <img src={formData.profilePhoto} alt="Perfil" className="w-24 h-24 rounded-full object-cover mb-2 border border-white/10" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-lime/20 file:text-lime hover:file:bg-lime/30"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
            Cargo / Título
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">
            Localização
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-6">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-6 py-3 bg-lime hover:bg-[#a5bd39] text-[#303324] font-bold rounded-full transition-colors flex items-center justify-center gap-2"
        >
          💾 Salvar Informações
        </button>
      </div>
    </div>
  );
}
