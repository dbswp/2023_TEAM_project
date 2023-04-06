import { Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Blog from './routes/Blog';
import PageDetail from './routes/PageDetail';

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/page_detail" element={<PageDetail />} />
    </Routes>
  );
}
