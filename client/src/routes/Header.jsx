import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/">홈으로</Link>
      <Link to="/login">로그인 </Link>
      <Link to="/register">회원가입 </Link>
      <Link to="/blog">블로그</Link>
    </header>
  );
}
