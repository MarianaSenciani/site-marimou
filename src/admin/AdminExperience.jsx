import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { GripVertical, Trash2, Edit2, Plus, X } from 'lucide-react';

export default function AdminExperience({ language }) {
  const { cvData, updateCV } = useCV();
  const [experiences, setExperiences] = useState(cvData[language]?.experience || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    isCurrent: false,
    activities: ['']
  });

  useEffect(() => {
    setExperiences(cvData[language]?.experience || []);
  }, [language, cvData]);

  const saveExperiences = (newExperiences) => {
    setExperiences(newExperiences);
    updateCV(language, 'experience', newExperiences);
  };

  const handleAddNew = () => {
    setFormData({
      company: '',
      role: '',
      period: '',
      isCurrent: false,
      activities: ['']
    });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleEdit = (exp, index) => {
    setFormData({ ...exp, activities: exp.activities.length ? exp.activities : [''] });
    setEditingId(index);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const newExp = [...experiences];
    newExp.splice(index, 1);
    saveExperiences(newExp);
  };

  const handleSave = () => {
    const newExp = [...experiences];
    const cleanedActivities = formData.activities.filter(a => a.trim() !== '');
    const dataToSave = { ...formData, activities: cleanedActivities };
    
    if (editingId !== null) {
      newExp[editingId] = dataToSave;
    } else {
      newExp.push(dataToSave);
    }
    
    saveExperiences(newExp);
    setIsEditing(false);
    setEditingId(null);
  };

  const addActivity = () => {
    setFormData(prev => ({ ...prev, activities: [...prev.activities, ''] }));
  };

  const updateActivity = (index, value) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData(prev => ({ ...prev, activities: newActivities }));
  };

  const removeActivity = (index) => {
    const newActivities = [...formData.activities];
    newActivities.splice(index, 1);
    setFormData(prev => ({ ...prev, activities: newActivities }));
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">
            {editingId !== null ? 'Editar Experiência' : 'Nova Experiência'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Empresa</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Cargo</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Período (Ex: 12/2024–presente)</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData(prev => ({ ...prev, isCurrent: e.target.checked }))}
                  className="w-4 h-4 rounded border-lime text-lime focus:ring-lime"
                />
                Trabalho atual
              </label>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-[#92A150] mb-2 uppercase tracking-wider">Atividades (Bullets)</label>
            {formData.activities.map((act, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={act}
                  onChange={(e) => updateActivity(idx, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-[#3A3B35] text-white text-sm focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
                  placeholder="Ex: Planejamento e condução de testes..."
                />
                <button onClick={() => removeActivity(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={addActivity} className="text-xs font-bold text-lime mt-2 flex items-center gap-1 hover:underline">
              <Plus size={14} /> Adicionar bullet
            </button>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-lime hover:bg-[#a5bd39] text-[#303324] font-bold rounded-full transition-colors flex items-center justify-center gap-2"
          >
            💾 Salvar Experiência
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Experiência Profissional</h3>
        <button
          onClick={handleAddNew}
          className="text-xs font-bold text-[#303324] bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform"
        >
          + Adicionar Entrada
        </button>
      </div>

      <div className="space-y-3">
        {experiences.length === 0 ? (
          <p className="text-white/50 text-sm">Nenhuma experiência cadastrada neste idioma.</p>
        ) : (
          experiences.map((exp, idx) => (
            <div key={idx} className="bg-[#222417] p-4 rounded-xl border border-white/10 flex items-center gap-3 group">
              <div className="cursor-move text-white/30 hover:text-white/70">
                <GripVertical size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{exp.company}</h4>
                <p className="text-xs text-white/60 truncate">{exp.role} · {exp.period}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(exp, idx)} className="p-2 text-lime hover:bg-lime/10 rounded-lg">
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
