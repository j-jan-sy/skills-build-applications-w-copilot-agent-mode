import { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        const items = Array.isArray(data) ? data : data.items || [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id || entry.rank}>
            <strong>Rank {entry.rank}</strong>
            <div>Score: {entry.score}</div>
            <div>User ID: {entry.userId}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
