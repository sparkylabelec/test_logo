
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Lock, ArrowRight, Home } from 'lucide-react';

export const Login: React.FC = () => {
  const [pw, setPw] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pw)) {
      navigate('/input');
    } else {
      alert('비밀번호가 틀렸습니다 (힌트: 1234)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-6">
      <div className="w-full max-w-md bg-card-light dark:bg-card-dark p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <Lock size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-black text-center mb-2">관리자 로그인</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">경기 결과 관리를 위해 비밀번호를 입력하세요.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password"
              placeholder="비밀번호 입력 (초기: 1234)"
              className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl p-4 text-center text-xl font-bold focus:ring-2 focus:ring-primary"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
            />
          </div>
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all">
            접속하기 <ArrowRight size={20} />
          </button>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="w-full mt-6 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Home size={16} /> 홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};
