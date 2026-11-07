import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>홈</h1>
      <button onClick={() => navigate("/users")}>사용자 목록 보기</button>
    </div>
  );
}
