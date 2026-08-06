import React from 'react';
import { useCV } from '../context/CVContext.jsx';
import FontSelector from './FontSelector.jsx';

export default function AdminAppearance() {
  const { designData, updateDesign } = useCV();

  const handleFontChange = (field, value) => {
    updateDesign('fonts', { [field]: value });
  };

  const handleColorChange = (field, value) => {
    updateDesign('colors', { [field]: value });
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div className="mb-6">
        <h3 className="text-[#F5FAE2] font-bold text-xl tracking-tight mb-2">Aparência (PDF & Sobre Mim)</h3>
        <p className="text-sm text-white/50">Personalize as cores e fontes do seu currículo e página web.</p>
      </div>

      <div className="bg-[#222417] p-5 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-lime tracking-widest uppercase mb-4 border-b-2 border-lime/20 pb-2">Fontes</h4>
          <div className="space-y-4">
            <FontSelector
              label="Fonte dos Títulos"
              value={designData.fonts.title}
              onChange={(value) => handleFontChange('title', value)}
            />
            <FontSelector
              label="Fonte dos Subtítulos"
              value={designData.fonts.subtitle}
              onChange={(value) => handleFontChange('subtitle', value)}
            />
            <FontSelector
              label="Fonte do Texto"
              value={designData.fonts.body}
              onChange={(value) => handleFontChange('body', value)}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-lime tracking-widest uppercase mb-4 border-b-2 border-lime/20 pb-2 mt-8">Cores</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1 uppercase tracking-wider">Cor Primária</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: designData.colors.primary }} />
                <input
                  type="text"
                  value={designData.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-[#0d0f08] text-white focus:outline-none focus:border-lime"
                />
                <input
                  type="color"
                  value={designData.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-10 h-10 p-1 rounded-xl cursor-pointer bg-transparent border border-white/10 shrink-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1 uppercase tracking-wider">Cor Secundária</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: designData.colors.secondary }} />
                <input
                  type="text"
                  value={designData.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-[#0d0f08] text-white focus:outline-none focus:border-lime"
                />
                <input
                  type="color"
                  value={designData.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-10 h-10 p-1 rounded-xl cursor-pointer bg-transparent border border-white/10 shrink-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1 uppercase tracking-wider">Cor de Fundo</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: designData.colors.background }} />
                <input
                  type="text"
                  value={designData.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-[#0d0f08] text-white focus:outline-none focus:border-lime"
                />
                <input
                  type="color"
                  value={designData.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-10 h-10 p-1 rounded-xl cursor-pointer bg-transparent border border-white/10 shrink-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/70 mb-1 uppercase tracking-wider">Cor do Texto</label>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full shrink-0 border border-white/20" style={{ backgroundColor: designData.colors.text }} />
                <input
                  type="text"
                  value={designData.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-[#0d0f08] text-white focus:outline-none focus:border-lime"
                />
                <input
                  type="color"
                  value={designData.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-10 h-10 p-1 rounded-xl cursor-pointer bg-transparent border border-white/10 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
