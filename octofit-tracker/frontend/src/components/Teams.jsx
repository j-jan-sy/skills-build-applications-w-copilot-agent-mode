import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchJson('/api/teams/');
        const items = Array.isArray(data) ? data : data.items || [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name}</strong>
            <div className="text-muted">{team.sport}</div>
            <div>Members: {team.members?.length || 0}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
