import { initialCVData } from "../data.js";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CVContext = createContext();


const defaultDesign = {
  fonts: {
    title: 'Alexandria, sans-serif',
    subtitle: 'Alexandria, sans-serif',
    body: 'Inter, sans-serif'
  },
  colors: {
    primary: '#D5F150',
    secondary: '#92A150',
    background: '#FFFFFF',
    text: '#222417'
  }
};

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('mari_cv_data_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCVData;
      }
    }
    return initialCVData;
  });

  const [designData, setDesignData] = useState(() => {
    const saved = localStorage.getItem('mari_cv_design');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultDesign;
      }
    }
    return defaultDesign;
  });

  useEffect(() => {
    localStorage.setItem('mari_cv_data_v2', JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    localStorage.setItem('mari_cv_design', JSON.stringify(designData));
  }, [designData]);

  const updateDesign = (section, data) => {
    setDesignData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  const updateCV = async (language, section, data) => {
    setCvData((prev) => {
      const newState = {
        ...prev,
        [language]: {
          ...prev[language],
          [section]: data
        }
      };
      return newState;
    });

    const targetLangs = ['pt', 'en', 'es'].filter(l => l !== language);

    try {
      const currentData = JSON.parse(localStorage.getItem('mari_cv_data_v2') || '{}');
      const dataToTranslate = {
        ...(currentData[language] || {}),
        [section]: data
      };

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: dataToTranslate,
          sourceLang: language,
          targetLangs: targetLangs
        })
      });
      
      if (res.ok) {
        const translated = await res.json();
        setCvData(prev => {
          const nextState = { ...prev };
          targetLangs.forEach(lang => {
            if (translated[lang]) {
              nextState[lang] = { ...nextState[lang], ...translated[lang] };
            }
          });
          return nextState;
        });
      }
    } catch (e) {
      console.error("Translation failed", e);
    }
  };

  return (
    <CVContext.Provider value={{ cvData, updateCV, designData, updateDesign, setCvData }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}
