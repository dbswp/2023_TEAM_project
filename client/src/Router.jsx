import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import KakaoLogin from "./pages/KakaoLogin";
import Home from "./pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="kakaologin" element={<KakaoLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
