
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Page } from '../types';

export const Nav: React.FC<{ activePage: Page }> = ({ activePage }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="sticky top-0 z-50 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex-shrink-0">
              <img src="./logo.png" alt="MatchManager Logo" className="h-8 w-auto object-contain" onError={(e) => (e.target as any).style.display='none'} />
            </div>
            <span className="font-semibold text-lg tracking-tight text-text-light dark:text-text-dark">MatchManager</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${activePage === Page.Dashboard ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark'}`}>Dashboard</Link>
            <Link to="/list" className={`text-sm font-medium transition-colors ${activePage === Page.Matches ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark'}`}>Matches</Link>
            <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark transition-colors text-sm font-medium">Players</Link>
            <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-text-light dark:hover:text-text-dark transition-colors text-sm font-medium">Settings</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <span className="material-icons">notifications</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-white dark:ring-gray-800">
              <img alt="Admin Profile" className="h-full w-full object-cover" src="https://picsum.photos/id/64/100/100"/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="mt-auto bg-card-light dark:bg-card-dark border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 MatchManager. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#">Privacy Policy</a>
        <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#">Terms of Service</a>
        <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#">Support</a>
      </div>
    </div>
  </footer>
);
