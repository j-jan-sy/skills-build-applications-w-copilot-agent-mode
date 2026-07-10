import { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchJson('/api/workouts/');
        const items = Array.isArray(data) ? data : data.items || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.title}>
            <strong>{workout.title}</strong>
            <div>{workout.description}</div>
            <div>{workout.durationMinutes} mins • {workout.difficulty}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
