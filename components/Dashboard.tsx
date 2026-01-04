
import React from 'react';
import { Layout } from './Layout';
import { db } from '../services/db';
import { Trophy, Target, ShieldCheck, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const reports = db.getReports();
  
  // 수치 계산 (스크린샷 기준: 8경기, 3승, 14골, 13실점)
  const totalMatches = reports.length;
  const wins = reports.filter(r => r.result === '승').length;
  const totalGoals = reports.reduce((acc, r) => acc + r.scoreUs, 0);
  const totalConceded = reports.reduce((acc, r) => acc + r.scoreThem, 0);

  const StatCard = ({ title, value, icon: Icon, colorClass, iconColorClass }: any) => (
    <div className="bg-[#1A1D26] p-7 rounded-[1.5rem] border border-slate-800/40 shadow-sm flex flex-col items-start transition-all hover:bg-[#212530] group">
      <div className={`p-3 rounded-xl ${colorClass} mb-6 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
        <Icon size={24} className="text-white" />
      </div>
      <p className="text-slate-500 text-[13px] font-bold tracking-wider uppercase mb-1">{title}</p>
      <h3 className="text-4xl font-black text-white tracking-tight">{value}</h3>
    </div>
  );

  return (
    <Layout>
      <div className="mb-12">
        <h2 className="text-4xl font-black text-white tracking-tight leading-tight">전체 경기 요약</h2>
        <p className="text-slate-500 mt-2 font-medium text-lg">시즌 통합 데이터를 바탕으로 산출된 결과입니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatCard title="총 경기 수" value={`${totalMatches}경기`} icon={Activity} colorClass="bg-[#2D5BFF]" />
        <StatCard title="승리" value={`${wins}승`} icon={Trophy} colorClass="bg-[#FFAA00]" />
        <StatCard title="총 득점" value={`${totalGoals}골`} icon={Target} colorClass="bg-[#00D177]" />
        <StatCard title="총 실점" value={`${totalConceded}골`} icon={ShieldCheck} colorClass="bg-[#FF4D6D]" />
      </div>

      <div className="bg-[#151820] p-8 md:p-10 rounded-[2.5rem] border border-slate-800/40 shadow-2xl">
        <h3 className="text-2xl font-black mb-8 text-white tracking-tight">
          최근 경기 결과
        </h3>
        
        {reports.length === 0 ? (
          <div className="text-center py-20 text-slate-600 font-bold bg-[#1A1D26]/30 rounded-3xl border border-dashed border-slate-800/50">
            데이터가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 5).map(report => (
              <div 
                key={report.id} 
                onClick={() => navigate(`/report/${report.id}`)}
                className="flex items-center justify-between p-5 bg-[#1A1D26] rounded-[1.25rem] border border-slate-800/30 hover:border-primary/40 hover:bg-[#1E222D] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-inner ${
                    report.result === '승' ? 'bg-[#FFAA00] text-white' :
                    report.result === '패' ? 'bg-[#FF4D6D] text-white' : 'bg-[#4B5563] text-white'
                  }`}>
                    {report.result}
                  </div>
                  <div>
                    <h4 className="font-bold text-[17px] text-white group-hover:text-primary transition-colors">vs {report.opponent}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wide">{report.date} | {report.venue}</p>
                  </div>
                </div>
                <div className="text-4xl font-black italic tracking-tighter text-white flex items-center gap-4">
                  <span className="w-8 text-center">{report.scoreUs}</span>
                  <span className="text-slate-600 not-italic text-2xl">:</span>
                  <span className="w-8 text-center">{report.scoreThem}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
