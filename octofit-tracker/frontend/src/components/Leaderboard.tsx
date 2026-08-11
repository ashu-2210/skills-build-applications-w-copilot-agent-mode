import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

type LeaderboardEntry = {
  _id?: string;
  name?: string;
  score?: number;
  [key: string]: unknown;
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setEntries(list.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((entry, index) => (
          <li key={entry._id || index}>{entry.name || 'Anonymous'} — {entry.score || 0}</li>
        ))}
      </ol>
    </section>
  );
}
