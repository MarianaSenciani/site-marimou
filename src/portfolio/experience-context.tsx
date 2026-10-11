import { createContext, useContext } from 'react';
export type Language = 'pt' | 'en' | 'es';
export type Theme = 'dark' | 'light';
export const ExperienceContext = createContext({ lang: 'pt' as Language, theme: 'dark' as Theme, hero: 1,
  setLang: (_: Language) => {}, setTheme: (_: Theme) => {}, setHero: (_: number) => {} });
export function useExperience() {
  const value = useContext(ExperienceContext);
  return { ...value, t: (pt: string, en: string, es: string) => ({ pt, en, es })[value.lang] };
}
export const email = 'mailto:marianasenciani@gmail.com';
export const linkedin = 'https://www.linkedin.com/in/mariana-senciani/';
