
import { MatchReport } from './types';

export const MOCK_MATCHES: MatchReport[] = [
  {
    id: 'MR-2023-084',
    date: '2023-10-24',
    opponent: 'Red Dragons FC',
    venue: 'Home Stadium',
    result: '승',
    scoreUs: 3,
    scoreThem: 1,
    scorers: [
      { name: 'Marcus Rashford', goals: 1 },
      { name: 'Bruno Fernandes', goals: 1 },
      { name: 'Rasmus Hojlund', goals: 1 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800'],
    notes: '리그 선두를 확정 짓는 중요한 홈 승리였습니다.',
    createdAt: Date.now() - 100000
  },
  {
    id: 'MR-2023-083',
    date: '2023-10-17',
    opponent: 'United City',
    venue: 'City Arena (Away)',
    result: '무',
    scoreUs: 2,
    scoreThem: 2,
    scorers: [
      { name: 'Marcus Rashford', goals: 2 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800'],
    notes: '힘든 원정 경기였으나 마커스의 활약으로 승점을 챙겼습니다.',
    createdAt: Date.now() - 200000
  },
  {
    id: 'MR-2023-082',
    date: '2023-10-10',
    opponent: 'Arsenal',
    venue: 'Emirates Stadium (Away)',
    result: '패',
    scoreUs: 0,
    scoreThem: 2,
    scorers: [],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800'],
    notes: '이번 시즌 첫 패배입니다. 수비 조직력 재정비가 필요합니다.',
    createdAt: Date.now() - 300000
  },
  {
    id: 'MR-2023-081',
    date: '2023-10-03',
    opponent: 'Crystal Palace',
    venue: 'Old Trafford',
    result: '승',
    scoreUs: 3,
    scoreThem: 0,
    scorers: [
      { name: 'Marcus Rashford', goals: 1 },
      { name: 'Casemiro', goals: 1 },
      { name: 'Bruno Fernandes', goals: 1 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800'],
    notes: '클린시트로 완벽한 승리를 거두었습니다.',
    createdAt: Date.now() - 400000
  },
  {
    id: 'MR-2023-080',
    date: '2023-09-26',
    opponent: 'Burnley',
    venue: 'Turf Moor',
    result: '승',
    scoreUs: 1,
    scoreThem: 0,
    scorers: [
      { name: 'Bruno Fernandes', goals: 1 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800'],
    notes: '브루노의 환상적인 발리슛이 결승골이 되었습니다.',
    createdAt: Date.now() - 500000
  },
  {
    id: 'MR-2023-079',
    date: '2023-09-20',
    opponent: 'Bayern Munich',
    venue: 'Allianz Arena',
    result: '패',
    scoreUs: 3,
    scoreThem: 4,
    scorers: [
      { name: 'Rasmus Hojlund', goals: 1 },
      { name: 'Casemiro', goals: 2 },
    ],
    competition: 'Champions League',
    images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800'],
    notes: '난타전 끝에 아쉽게 패배했지만 공격진의 화력은 좋았습니다.',
    createdAt: Date.now() - 600000
  },
  {
    id: 'MR-2023-078',
    date: '2023-09-16',
    opponent: 'Brighton',
    venue: 'Old Trafford',
    result: '패',
    scoreUs: 1,
    scoreThem: 3,
    scorers: [
      { name: 'Alejandro Garnacho', goals: 1 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1518091043644-c1d445eb951d?q=80&w=800'],
    notes: '홈에서 뼈아픈 역전패를 당했습니다.',
    createdAt: Date.now() - 700000
  },
  {
    id: 'MR-2023-077',
    date: '2023-09-03',
    opponent: 'Chelsea',
    venue: 'Stamford Bridge',
    result: '무',
    scoreUs: 1,
    scoreThem: 1,
    scorers: [
      { name: 'Alejandro Garnacho', goals: 1 },
    ],
    competition: 'Premier League',
    images: ['https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800'],
    notes: '경기 막판 극적인 동점골로 무승부를 기록했습니다.',
    createdAt: Date.now() - 800000
  }
];

export const MOCK_PLAYERS = [
  { id: '1', name: 'Marcus Rashford' },
  { id: '2', name: 'Bruno Fernandes' },
  { id: '3', name: 'Rasmus Hojlund' },
  { id: '4', name: 'Alejandro Garnacho' },
  { id: '5', name: 'Casemiro' },
];
