import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
// Device-local editor, not production authentication.
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => import.meta.env.DEV && sessionStorage.getItem('marimou_local_editor') === 'open');
  const login = () => { if (!import.meta.env.DEV) return false; sessionStorage.setItem('marimou_local_editor', 'open'); setIsAuthenticated(true); return true; };
  const logout = () => { sessionStorage.removeItem('marimou_local_editor'); setIsAuthenticated(false); };
  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
