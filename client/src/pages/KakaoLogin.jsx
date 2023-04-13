import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { KAKAO_API_KEY, KAKAO_REDIRECT_URI } from '../kakaoLoginData';

export default function KakaoLogin() {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');

  const kakaoLogin = async () => {
    // 카카오 인가토큰을 가지고 엑세스 토큰을 요청
    const getKakaoAccessToken = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    const data = await getKakaoAccessToken.json();
    const kakao_access_token = data.access_token;

    console.log('카카오 엑세스 토큰 발급 성공!!   토큰:', kakao_access_token);

    const res = await axios.post('http://localhost:4000/login/kakaologin', {
      kakao_access_token,
    });
    if (res.status === 200) navigate('/blog');
  };

  useEffect(() => {
    kakaoLogin();
  }, []);

  return <div>KakaoLogin 리다이렉트 페이지</div>;
}
