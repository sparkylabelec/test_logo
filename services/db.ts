
import { MatchReport } from '../types';
import { MOCK_MATCHES } from '../constants';

const STORAGE_KEY = 'match_manager_reports';

export const db = {
  getReports: (): MatchReport[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    // 데이터가 없으면 constants.tsx의 MOCK_MATCHES를 반환
    return data ? JSON.parse(data) : MOCK_MATCHES;
  },
  saveReport: (report: MatchReport) => {
    const reports = db.getReports();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([report, ...reports]));
  },
  deleteReports: (ids: string[]) => {
    const reports = db.getReports();
    const filtered = reports.filter(r => !ids.includes(r.id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
