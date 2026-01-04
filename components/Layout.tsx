
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FilePlus, List, LogOut, LogIn, Trophy } from 'lucide-react';
import { useAuth } from '../App';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, logout } = useAuth();
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F1117] text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1D26] border-r border-slate-800/50 p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto z-40">
        <Link to="/" className="flex items-center gap-3 px-2 hover:opacity-80 transition-opacity group">
          <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-dashed border-primary/40 rounded-xl bg-primary/10 overflow-hidden transition-colors group-hover:border-primary">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain p-1.5"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Trophy className="text-primary w-6 h-6" />
            )}
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">MatchManager</h1>
        </Link>

        <nav className="flex flex-col gap-1.5 mt-2">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all text-slate-400 hover:text-white group">
            <LayoutDashboard size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
            <span className="font-bold text-[15px]">대시보드</span>
          </Link>
          <Link to="/list" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all text-slate-400 hover:text-white group">
            <List size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
            <span className="font-bold text-[15px]">경기 목록</span>
          </Link>
          {isAdmin && (
            <Link to="/input" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-all text-primary group">
              <FilePlus size={20} />
              <span className="font-bold text-[15px]">경기결과 입력</span>
            </Link>
          )}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-800/50">
          {isAdmin ? (
            <button onClick={logout} className="flex items-center gap-3 p-3 w-full text-left rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors">
              <LogOut size={20} />
              <span className="font-bold">관리자 로그아웃</span>
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors text-slate-500 hover:text-white">
              <LogIn size={20} />
              <span className="font-bold">관리자 로그인</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#0F1117]">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
