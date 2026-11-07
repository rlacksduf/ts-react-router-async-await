import "./App.css";
import { Route, Routes, Link } from "react-router";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/users">유저</Link>
        <Link to="/about">소개</Link>
        <Link to="/users/1">1번 사용자 보기</Link>
        <Link to="/users/3">3번 사용자 보기</Link>
        <Link to="/users/10">10번 사용자 보기</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
