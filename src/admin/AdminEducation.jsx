import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { GripVertical, Trash2, Edit2, X } from 'lucide-react';

export default function AdminEducation({ language }) {
  const { cvData, updateCV } = useCV();
  const [education, setEducation] = useState(cvData[language]?.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    period: '',
    logoUrl: ''
  });

  useEffect(() => {
    setEducation(cvData[language]?.education || []);
  }, [language, cvData]);

  const saveEducation = (newEdu) => {
    setEducation(newEdu);
    updateCV(language, 'education', newEdu);
  };

  const handleAddNew = () => {
    setFormData({ institution: '', degree: '', period: '', logoUrl: '' });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleEdit = (edu, index) => {
    setFormData(edu);
    setEditingId(index);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const newEdu = [...education];
    newEdu.splice(index, 1);
    saveEducation(newEdu);
  };

  const handleSave = () => {
    const newEdu = [...education];
    if (editingId !== null) {
      newEdu[editingId] = formData;
    } else {
      newEdu.push(formData);
    }
    saveEducation(newEdu);
    setIsEditing(false);
    setEditingId(null);
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">
            {editingId !== null ? 'Editar Formação' : 'Nova Formação'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Instituição</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Curso / Grau</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Período</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Foto / Logo da Instituição (1:1)</label>
            <p className="text-[10px] text-white/50 mb-2">Será exibida na página "Sobre Mim". Não aparecerá no PDF do currículo.</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData(prev => ({ ...prev, logoUrl: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-lime/20 file:text-lime hover:file:bg-lime/30"
            />
            {formData.logoUrl && (
              <img src={formData.logoUrl} alt="Logo preview" className="w-16 h-16 mt-3 rounded-xl object-cover border border-white/10" />
            )}
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-lime hover:bg-[#a5bd39] text-[#303324] font-bold rounded-full transition-colors flex items-center justify-center gap-2"
          >
            💾 Salvar Formação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Formação Acadêmica</h3>
        <button
          onClick={handleAddNew}
          className="text-xs font-bold text-[#303324] bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform"
        >
          + Adicionar Formação
        </button>
      </div>

      <div className="space-y-3">
        {education.length === 0 ? (
          <p className="text-white/50 text-sm">Nenhuma formação cadastrada neste idioma.</p>
        ) : (
          education.map((edu, idx) => (
            <div key={idx} className="bg-[#222417] p-4 rounded-xl border border-white/10 flex items-center gap-3 group">
              <div className="cursor-move text-white/30 hover:text-white/70">
                <GripVertical size={20} />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3">
                {edu.logoUrl && <img src={edu.logoUrl} alt="Logo" className="w-8 h-8 rounded object-cover shrink-0" />}
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{edu.degree}</h4>
                  <p className="text-xs text-white/60 truncate">{edu.institution} · {edu.period}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(edu, idx)} className="p-2 text-lime hover:bg-lime/10 rounded-lg">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
