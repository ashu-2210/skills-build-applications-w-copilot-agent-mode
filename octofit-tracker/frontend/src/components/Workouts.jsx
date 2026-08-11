import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      const baseUrl = import.meta.env.VITE_CODESPACE_NAME
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
        : 'http://localhost:8000';

      try {
        const response = await fetch(`${baseUrl}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={workout._id || index}>
            {workout.title || 'Workout'} — {workout.difficulty || 'Unknown'} ({workout.duration || 0} min)
          </li>
        ))}
      </ul>
    </section>
  );
}
