
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Footer } from './Shared';
import { Page, MatchReport } from '../types';
import { MOCK_MATCHES } from '../constants';

export const MatchesGridView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans transition-colors duration-300">
      <Nav activePage={Page.Matches} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl sm:truncate text-text-light dark:text-text-dark">Match Reports</h1>
            <p className="mt-2 text-sm text-secondary-light dark:text-secondary-dark">Manage and review all game outcomes, statistics, and media.</p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-text-light dark:text-text-dark bg-white dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Export CSV</button>
            <button onClick={() => navigate('/new-report')} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600">
              <span className="material-icons text-sm mr-2">add</span>New Report
            </button>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-4 mb-8 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400">search</span>
              </div>
              <input className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white h-10" placeholder="Search by opponent, venue, or date..." type="text"/>
            </div>
            <div className="w-full md:w-48">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white h-10">
                <option>All Seasons</option>
                <option>2023-2024</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MATCHES.map((match) => (
            <div key={match.id} onClick={() => navigate(`/report-detail/${match.id}`)} className="group relative bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
              <div className="h-40 w-full relative overflow-hidden">
                {/* Fix: use images[0] instead of non-existent image property */}
                <img alt={match.opponent} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={match.images[0] || 'https://picsum.photos/400/200'}/>
                {/* Fix: correct result comparisons using Korean values */}
                <div className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide 
                  ${match.result === '승' ? 'bg-green-500' : match.result === '패' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {match.result === '승' ? 'Win' : match.result === '패' ? 'Loss' : 'Draw'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-sm font-medium opacity-90">{match.date} • {match.venue}</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-text-light dark:text-text-dark">{match.scoreUs}</div>
                    <span className="text-secondary-light dark:text-secondary-dark font-light">-</span>
                    <div className="text-2xl font-bold text-secondary-light dark:text-secondary-dark">{match.scoreThem}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary-light dark:text-secondary-dark uppercase tracking-wider font-semibold">Opponent</p>
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{match.opponent}</h3>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary hover:text-blue-700 font-medium flex items-center">
                      Details <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};