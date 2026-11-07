import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getUser() {
      try {
        if (!id) {
          setError("사용자 ID가 없습니다.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        setUser(null);

        const url = `https://jsonplaceholder.typicode.com/users/${id}`;
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("api 요청 실패");
        }
        const data = await response.json();
        setUser(data);
      } catch (e) {
        if (controller.signal.aborted) return;
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    getUser();

    return () => {
      controller.abort();
    };
  }, [id]);
  if (error) {
    return <h1>{error}</h1>;
  }
  if (loading) {
    return <h1>사용자 정보 불러오는 중...</h1>;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <h1>사용자 상세 페이지</h1>
      <h1>{user && `이름: ${user.name}`}</h1>
      <h2>사용자 ID: {id}</h2>
      <h1>{user && `이메일: ${user.email}`}</h1>
      <h1>{user && `전화번호: ${user.phone}`}</h1>
      <h2>현재 보고있는 사용자는 {id}번 회원입니다</h2>
    </div>
  );
}
