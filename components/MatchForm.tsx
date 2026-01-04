
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';
import { db } from '../services/db';
import { Plus, Minus, Image as ImageIcon, Save } from 'lucide-react';
import { MatchReport, Scorer } from '../types';

export const MatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    opponent: '',
    date: new Date().toISOString().split('T')[0],
    venue: '',
    scoreUs: 0,
    scoreThem: 0,
    notes: '',
  });

  const [scorers, setScorers] = useState<Scorer[]>([{ name: '', goals: 1 }]);
  const [images, setImages] = useState<string[]>([]);

  const handleAddScorer = () => setScorers([...scorers, { name: '', goals: 1 }]);
  const handleRemoveScorer = (idx: number) => setScorers(scorers.filter((_, i) => i !== idx));

  // Fix: added explicit casting for file processing and reader results to fix Blob type error
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const remainingSlots = 6 - images.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      
      (filesToProcess as File[]).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formData.scoreUs > formData.scoreThem ? '승' : formData.scoreUs < formData.scoreThem ? '패' : '무';
    
    const newReport: MatchReport = {
      ...formData,
      id: `match-${Date.now()}`,
      result,
      scorers: scorers.filter(s => s.name.trim() !== ''),
      images,
      createdAt: Date.now()
    };

    db.saveReport(newReport);
    navigate('/list');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary">경기결과 입력</h2>
        <p className="text-slate-500 mt-2">새로운 매치 리포트를 작성합니다 (관리자 전용).</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <section className="bg-card-light dark:bg-card-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2">기본 경기 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">상대팀 이름</label>
              <input 
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary"
                value={formData.opponent}
                onChange={e => setFormData({...formData, opponent: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">경기장</label>
              <input 
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary"
                value={formData.venue}
                onChange={e => setFormData({...formData, venue: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">경기 일자</label>
              <input 
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">우리 점수</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary"
                  value={formData.scoreUs}
                  onChange={e => setFormData({...formData, scoreUs: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">상대 점수</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary"
                  value={formData.scoreThem}
                  onChange={e => setFormData({...formData, scoreThem: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 득점 선수 */}
        <section className="bg-card-light dark:bg-card-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">득점 선수 목록</h3>
            <button 
              type="button"
              onClick={handleAddScorer}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-4">
            {scorers.map((s, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input 
                  placeholder="선수 이름"
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3"
                  value={s.name}
                  onChange={e => {
                    const next = [...scorers];
                    next[i].name = e.target.value;
                    setScorers(next);
                  }}
                />
                <input 
                  type="number"
                  placeholder="득점수"
                  className="w-24 bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 text-center"
                  value={s.goals}
                  onChange={e => {
                    const next = [...scorers];
                    next[i].goals = parseInt(e.target.value);
                    setScorers(next);
                  }}
                />
                {scorers.length > 1 && (
                  <button type="button" onClick={() => handleRemoveScorer(i)} className="text-rose-500 p-2"><Minus size={18} /></button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 사진 업로드 */}
        <section className="bg-card-light dark:bg-card-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2"><ImageIcon size={20} /> 경기 사진 (최대 6장)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Plus size={24} className="text-slate-400" />
                <span className="text-xs text-slate-500 mt-1">업로드</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/list')}
            className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
          >
            취소
          </button>
          <button 
            type="submit"
            className="px-8 py-3 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
          >
            <Save size={20} /> 리포트 저장하기
          </button>
        </div>
      </form>
    </Layout>
  );
};