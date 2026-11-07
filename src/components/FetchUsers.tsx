import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  search: string;
};

export default function FetchUsers({ search }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("api실패");
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);
  if (loading) {
    return <h1>사용자 불러오는 중...</h1>;
  }

  if (error) {
    return <h1>오류 발생: {error}</h1>;
  }
  return (
    <div>
      <h1>사용자 목록</h1>
      {filtered.map((u) => (
        <div key={u.id}>
          <h1>{u.name}</h1>
          <h1>{u.email}</h1>
          <h1>----------------------------</h1>
        </div>
      ))}
    </div>
  );
}
