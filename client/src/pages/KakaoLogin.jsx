import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const kakaoLogin = async () => {
    const res = await axios.post('http://localhost:4000/login/kakaologin', {
      code,
    });
    if (res.status === 200) navigate('/blog');
  };

  useEffect(() => {
    kakaoLogin();
  }, []);

  return <div>KakaoLogin 리다이렉트 페이지</div>;
}
