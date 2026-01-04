
import React, { createContext, useContext, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { MatchForm } from './components/MatchForm';
import { MatchList } from './components/MatchList';
import { MatchDetail } from './components/MatchDetail';
import { Login } from './components/Login';

const AuthContext = createContext<{
  isAdmin: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
}>({ isAdmin: false, login: () => false, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (pw: string) => {
    if (pw === '1234') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<MatchList />} />
          <Route path="/report/:id" element={<MatchDetail />} />
          <Route 
            path="/input" 
            element={isAdmin ? <MatchForm /> : <Navigate to="/login" />} 
          />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
