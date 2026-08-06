import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext.jsx';
import { GripVertical, Trash2, Edit2, X } from 'lucide-react';

export default function AdminCourses({ language }) {
  const { cvData, updateCV } = useCV();
  const [courses, setCourses] = useState(cvData[language]?.courses || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    duration: '',
    year: '',
    certificateLink: '',
    logoUrl: '',
    category: 'Design'
  });

  useEffect(() => {
    setCourses(cvData[language]?.courses || []);
  }, [language, cvData]);

  const saveCourses = (newCourses) => {
    setCourses(newCourses);
    updateCV(language, 'courses', newCourses);
  };

  const handleAddNew = () => {
    setFormData({ title: '', institution: '', duration: '', year: '', certificateLink: '', logoUrl: '', category: 'Design' });
    setEditingId(null);
    setIsEditing(true);
  };

  const handleEdit = (course, index) => {
    setFormData(course);
    setEditingId(index);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    saveCourses(newCourses);
  };

  const handleSave = () => {
    const newCourses = [...courses];
    if (editingId !== null) {
      newCourses[editingId] = formData;
    } else {
      newCourses.push(formData);
    }
    saveCourses(newCourses);
    setIsEditing(false);
    setEditingId(null);
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">
            {editingId !== null ? 'Editar Curso' : 'Novo Curso'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Nome do Curso</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Instituição</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Duração (Ex: 40h)</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Ano</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Categoria</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Ex: Design, Web..."
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Link do Certificado (URL)</label>
              <input
                type="text"
                value={formData.certificateLink || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, certificateLink: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-[#3A3B35] text-white focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#92A150] mb-1 uppercase tracking-wider">Logo da Instituição (1x1)</label>
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
              className="w-full text-white text-sm"
            />
            {formData.logoUrl && (
              <img src={formData.logoUrl} alt="Logo preview" className="w-12 h-12 mt-2 rounded object-cover" />
            )}
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-lime hover:bg-[#a5bd39] text-[#303324] font-bold rounded-full transition-colors flex items-center justify-center gap-2"
          >
            💾 Salvar Curso
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight">Cursos Complementares</h3>
        <button
          onClick={handleAddNew}
          className="text-xs font-bold text-[#303324] bg-lime px-4 py-2 rounded-pill hover:scale-105 transition-transform"
        >
          + Adicionar Curso
        </button>
      </div>

      <div className="space-y-3">
        {courses.length === 0 ? (
          <p className="text-white/50 text-sm">Nenhum curso cadastrado neste idioma.</p>
        ) : (
          courses.map((course, idx) => (
            <div key={idx} className="bg-[#222417] p-4 rounded-xl border border-white/10 flex items-center gap-3 group">
              <div className="cursor-move text-white/30 hover:text-white/70">
                <GripVertical size={20} />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-3">
                {course.logoUrl && <img src={course.logoUrl} alt="Logo" className="w-8 h-8 rounded object-cover shrink-0" />}
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{course.title}</h4>
                  <p className="text-xs text-white/60 truncate">{course.institution} · {course.duration} · {course.year}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(course, idx)} className="p-2 text-lime hover:bg-lime/10 rounded-lg">
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
