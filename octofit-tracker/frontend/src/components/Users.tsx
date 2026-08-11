import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

type User = {
  _id?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user._id || index}>
            {user.username || 'Unknown user'} — {user.email || 'No email'}
          </li>
        ))}
      </ul>
    </section>
  );
}
