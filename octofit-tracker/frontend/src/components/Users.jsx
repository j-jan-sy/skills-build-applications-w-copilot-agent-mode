import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchJson('/api/users/');
        const items = Array.isArray(data) ? data : data.items || [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email}</div>
            <div>Goal: {user.fitnessGoal}</div>
            <div>Level: {user.level}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
