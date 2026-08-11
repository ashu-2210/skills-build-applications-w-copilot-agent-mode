import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams` : 'http://localhost:8000/api/teams');
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={team._id || index}>
            {team.name || 'Unnamed team'} — {team.members?.join(', ') || 'No members'}
          </li>
        ))}
      </ul>
    </section>
  );
}
