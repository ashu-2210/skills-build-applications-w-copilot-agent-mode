import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

type Team = {
  _id?: string;
  name?: string;
  members?: string[];
  [key: string]: unknown;
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
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
