import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import Select from 'react-select';
import { countryFlags } from '../utils/flags.js';

export default function AdminLanguages({ language }) {
  const { cvData, updateCV } = useCV();
  const [languages, setLanguages] = useState(cvData[language]?.languages || []);

  useEffect(() => {
    setLanguages(cvData[language]?.languages || []);
  }, [language, cvData]);

  const saveLanguages = (newLangs) => {
    setLanguages(newLangs);
    updateCV(language, 'languages', newLangs);
  };

  const addLanguage = () => {
    const newLangs = [...languages, { name: '', level: '', code: '' }];
    saveLanguages(newLangs);
  };

  const updateLanguage = (index, field, value) => {
    const newLangs = [...languages];
    newLangs[index][field] = value;
    saveLanguages(newLangs);
  };

  const removeLanguage = (index) => {
    const newLangs = [...languages];
    newLangs.splice(index, 1);
    saveLanguages(newLangs);
  };

  const flagOptions = countryFlags.map(f => ({
    value: f.code,
    label: (
      <div className="flex items-center gap-2">
        <img src={`https://flagcdn.com/w20/${f.code}.png`} width="20" alt={f.name} />
        {f.name}
      </div>
    )
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#3A3B35',
      borderColor: 'rgba(255,255,255,0.1)',
      color: 'white',
      minHeight: '42px',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#3A3B35',
      zIndex: 50
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? 'rgba(213,241,80,0.2)' : 'transparent',
      color: 'white',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white'
    })
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Idiomas</h3>
        <button
          onClick={addLanguage}
          className="text-xs font-bold text-[#303324] bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={14} /> Adicionar Idioma
        </button>
      </div>

      <div className="space-y-3">
        {languages.length === 0 ? (
          <p className="text-white/50 text-sm">Nenhum idioma cadastrado.</p>
        ) : (
          languages.map((lang, idx) => (
            <div key={idx} className="bg-[#222417] p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="cursor-move text-white/30 hover:text-white/70">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  options={flagOptions}
                  styles={customStyles}
                  placeholder="Selecione a bandeira"
                  value={flagOptions.find(o => o.value === lang.code) || null}
                  onChange={(selected) => updateLanguage(idx, 'code', selected ? selected.value : '')}
                  isClearable
                />
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(idx, 'name', e.target.value)}
                  placeholder="Ex: Inglês"
                  className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
                />
                <input
                  type="text"
                  value={lang.level}
                  onChange={(e) => updateLanguage(idx, 'level', e.target.value)}
                  placeholder="Ex: Fluente (C1)"
                  className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
                />
              </div>

              <button onClick={() => removeLanguage(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
