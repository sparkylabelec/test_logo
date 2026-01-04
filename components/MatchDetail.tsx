
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from './Layout';
import { db } from '../services/db';
import { Download, Share2, ArrowLeft, MapPin, Calendar, Goal } from 'lucide-react';

export const MatchDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = db.getReports().find(r => r.id === id);

  if (!report) return <Layout><div className="text-center py-20 font-bold">리포트를 찾을 수 없습니다.</div></Layout>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('리포트 링크가 복사되었습니다!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="mb-10 print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/list')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={18} /> 목록으로 돌아가기
        </button>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-all font-bold"
          >
            <Share2 size={18} /> 링크 공유
          </button>
          <button 
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-bold shadow-lg shadow-primary/20"
          >
            <Download size={18} /> PDF 저장
          </button>
        </div>
      </div>

      <article className="bg-card-light dark:bg-card-dark rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl print:shadow-none print:border-none">
        {/* Header Section */}
        <div className="p-10 text-center border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-primary font-bold tracking-widest uppercase">Official Match Report</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-3 mx-auto">
                <span className="text-3xl font-black text-primary">FC</span>
              </div>
              <h3 className="text-2xl font-bold">FC United</h3>
            </div>
            
            <div className="text-center">
              <div className="text-7xl font-black italic tracking-tighter mb-2 flex items-center gap-4">
                <span>{report.scoreUs}</span>
                <span className="text-slate-300 text-5xl">:</span>
                <span>{report.scoreThem}</span>
              </div>
              <div className={`px-6 py-1.5 rounded-full text-sm font-black uppercase tracking-widest ${
                report.result === '승' ? 'bg-amber-500 text-white' :
                report.result === '패' ? 'bg-rose-500 text-white' : 'bg-slate-500 text-white'
              }`}>
                {report.result === '승' ? 'Victory' : report.result === '패' ? 'Defeat' : 'Draw'}
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-3 mx-auto">
                <span className="text-3xl font-black text-slate-400">VS</span>
              </div>
              <h3 className="text-2xl font-bold">{report.opponent}</h3>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 border-r border-slate-200 dark:border-slate-800 space-y-8">
            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={16} /> Match Schedule
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                  <span className="text-slate-500">날짜</span>
                  <span className="font-bold">{report.date}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                  <span className="text-slate-500">경기장</span>
                  <span className="font-bold flex items-center gap-1"><MapPin size={14} /> {report.venue}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Goal size={16} /> Goal Scorers
              </h4>
              {report.scorers.length > 0 ? (
                <div className="space-y-3">
                  {report.scorers.map((s, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                      <span className="font-bold">{s.name}</span>
                      <span className="bg-primary text-white text-xs font-black px-2 py-1 rounded">{s.goals} Goals</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm italic">득점 기록이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="p-10 space-y-8">
            <div className="space-y-6">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Match Gallery</h4>
              <div className="grid grid-cols-2 gap-4">
                {report.images.map((img, i) => (
                  <img key={i} src={img} className="aspect-square object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm" />
                ))}
                {report.images.length === 0 && <div className="col-span-2 py-10 text-center text-slate-400 text-sm bg-slate-50 dark:bg-slate-900 rounded-2xl italic">갤러리 사진이 없습니다.</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        {report.notes && (
          <div className="p-10 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Tactical Notes</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{report.notes}</p>
          </div>
        )}
      </article>
    </Layout>
  );
};
