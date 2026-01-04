
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';
import { db } from '../services/db';
import { useAuth } from '../App';
import { Trash2, Search, Filter, ExternalLink } from 'lucide-react';

export const MatchList: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [reports, setReports] = useState(db.getReports());
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const handleDelete = () => {
    if (window.confirm(`${selected.length}개의 리포트를 삭제하시겠습니까?`)) {
      db.deleteReports(selected);
      setReports(db.getReports());
      setSelected([]);
    }
  };

  const filtered = reports.filter(r => 
    r.opponent.includes(search) || r.venue.includes(search)
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-display">경기 리포트 목록</h2>
          <p className="text-slate-500 mt-2">지금까지 기록된 모든 경기를 확인할 수 있습니다.</p>
        </div>
        {isAdmin && selected.length > 0 && (
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
          >
            <Trash2 size={18} /> {selected.length}개 삭제
          </button>
        )}
      </div>

      <div className="bg-card-light dark:bg-card-dark p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl pl-11 pr-4 py-3"
            placeholder="상대팀 또는 경기장 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-2">
          <Filter size={18} /> 정렬
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(report => (
          <div 
            key={report.id}
            className={`group relative bg-card-light dark:bg-card-dark p-6 rounded-2xl border transition-all duration-300 ${
              selected.includes(report.id) ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
            }`}
          >
            {isAdmin && (
              <input 
                type="checkbox"
                className="absolute top-4 left-4 w-5 h-5 rounded-md border-slate-300 dark:border-slate-700 text-primary focus:ring-primary"
                checked={selected.includes(report.id)}
                onChange={(e) => {
                  if (e.target.checked) setSelected([...selected, report.id]);
                  else setSelected(selected.filter(id => id !== report.id));
                }}
              />
            )}
            
            <div className={`flex items-start justify-between ${isAdmin ? 'pl-8' : ''}`}>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{report.date}</span>
                <h3 className="text-xl font-bold mt-1">vs {report.opponent}</h3>
                <p className="text-sm text-slate-500 mt-1">{report.venue}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                report.result === '승' ? 'bg-amber-100 text-amber-700' :
                report.result === '패' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {report.result}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-2xl font-black italic tracking-widest text-primary">
                {report.scoreUs} : {report.scoreThem}
              </div>
              <button 
                onClick={() => navigate(`/report/${report.id}`)}
                className="flex items-center gap-1 text-sm font-bold hover:underline"
              >
                리포트 상세 <ExternalLink size={14} />
              </button>
            </div>

            {report.images.length > 0 && (
              <div className="mt-4 flex -space-x-2 overflow-hidden">
                {report.images.slice(0, 4).map((img, i) => (
                  <img key={i} src={img} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" />
                ))}
                {report.images.length > 4 && (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-900 text-[10px] font-bold">
                    +{report.images.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};
