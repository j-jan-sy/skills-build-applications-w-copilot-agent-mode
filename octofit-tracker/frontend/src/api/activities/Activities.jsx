import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items || [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong>
            <div>{activity.durationMinutes} mins</div>
            <div>{activity.caloriesBurned} calories</div>
            <div className="text-muted">{new Date(activity.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
