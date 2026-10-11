import { createContext, useContext } from 'react';

export const MotionPreference = createContext(false);
export const useMotionPaused = () => useContext(MotionPreference);
