import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities` : 'http://localhost:8000/api/activities');
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={activity._id || index}>
            {activity.type || 'Activity'} — {activity.duration || 0} min
          </li>
        ))}
      </ul>
    </section>
  );
}
