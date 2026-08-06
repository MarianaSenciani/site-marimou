import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { Trash2, Plus } from 'lucide-react';

export default function AdminSkills({ language }) {
  const { cvData, updateCV } = useCV();
  const [categories, setCategories] = useState(cvData[language]?.skills || []);
  
  useEffect(() => {
    setCategories(cvData[language]?.skills || []);
  }, [language, cvData]);

  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    updateCV(language, 'skills', newCategories);
  };

  const addCategory = () => {
    const newCategories = [...categories, { title: 'Nova Categoria', items: [] }];
    saveCategories(newCategories);
  };

  const updateCategoryTitle = (catIndex, title) => {
    const newCategories = [...categories];
    newCategories[catIndex].title = title;
    saveCategories(newCategories);
  };

  const removeCategory = (catIndex) => {
    const newCategories = [...categories];
    newCategories.splice(catIndex, 1);
    saveCategories(newCategories);
  };

  const addItem = (catIndex) => {
    const newCategories = [...categories];
    newCategories[catIndex].items.push('');
    saveCategories(newCategories);
  };

  const updateItem = (catIndex, itemIndex, value) => {
    const newCategories = [...categories];
    newCategories[catIndex].items[itemIndex] = value;
    saveCategories(newCategories);
  };

  const removeItem = (catIndex, itemIndex) => {
    const newCategories = [...categories];
    newCategories[catIndex].items.splice(itemIndex, 1);
    saveCategories(newCategories);
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Habilidades & Ferramentas</h3>
        <button
          onClick={addCategory}
          className="text-xs font-bold text-[#303324] bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={14} /> Adicionar Categoria
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-white/50 text-sm">Nenhuma habilidade cadastrada neste idioma.</p>
      ) : (
        <div className="space-y-8">
          {categories.map((category, catIdx) => (
            <div key={catIdx} className="bg-[#222417] p-5 rounded-2xl border border-white/10 relative">
              <button 
                onClick={() => removeCategory(catIdx)}
                className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors"
                title="Remover Categoria"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="mb-4 pr-8">
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => updateCategoryTitle(catIdx, e.target.value)}
                  placeholder="Nome da categoria (Ex: Design & Produção)"
                  className="w-full bg-transparent text-white font-bold text-lg border-b border-white/10 pb-1 focus:outline-none focus:border-lime"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center bg-[#3A3B35] border border-white/10 rounded-pill pl-3 pr-1 py-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateItem(catIdx, itemIdx, e.target.value)}
                      className="bg-transparent text-sm text-white w-24 focus:outline-none focus:w-auto transition-all"
                      placeholder="Habilidade..."
                    />
                    <button 
                      onClick={() => removeItem(catIdx, itemIdx)}
                      className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-white/5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => addItem(catIdx)}
                  className="flex items-center gap-1 text-xs font-bold text-lime px-3 py-1.5 rounded-pill border border-lime/30 hover:bg-lime/10 transition-colors"
                >
                  <Plus size={14} /> Novo Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
