import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const baseUrl = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev` : 'http://localhost:8000';

      try {
        const response = await fetch(`${baseUrl}/api/users/`);
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
