import { fetchJson } from '..';

export const getLeaderboard = () => fetchJson('/api/leaderboard/');
