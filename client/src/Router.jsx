import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Blog from "./routes/Blog";
import KakaoLogin from "./routes/KakaoLogin";
import Main from "./components/home/Main";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="kakaologin" element={<KakaoLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
