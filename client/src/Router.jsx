import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import KakaoLogin from "./pages/KakaoLogin";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="kakaologin" element={<KakaoLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}
