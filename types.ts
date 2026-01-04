
export enum Page {
  Dashboard = 'dashboard',
  Matches = 'matches',
}

export interface Scorer {
  name: string;
  goals: number;
}

export interface MatchReport {
  id: string;
  date: string;
  opponent: string;
  venue: string;
  scoreUs: number;
  scoreThem: number;
  result: '승' | '무' | '패';
  scorers: Scorer[];
  images: string[];
  notes?: string;
  createdAt: number;
  competition?: string;
}

export interface AuthState {
  isAdmin: boolean;
}