import { fetchJson } from '..';

export const getActivities = () => fetchJson('/api/activities/');
