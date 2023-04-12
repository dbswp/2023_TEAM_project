import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KakaoLogout() {
  const navigate = useNavigate();

  const logoutKakao = async () => {
    // const logoutUser = await axios.get('http://localhost:4000/logout');
    const logoutKakao = await axios.get(
      'http://localhost:4000/logout/kakaologout'
    );
    console.log(logoutKakao.statusText);
    if (logoutKakao.status === 200) navigate('/login');
  };

  useEffect(() => {
    logoutKakao();
  }, []);

  return <div>KakaoLogout 리다이렉트 페이지 입니다.</div>;
}
