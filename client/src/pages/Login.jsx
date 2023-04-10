import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { kakaoAuthUrl } from "../kakaoLoginData";
import kakaoImg from "../assets/symbol_kakaotalk.png";
import Logo from "../assets/Logo.gif";
import style from "../styles/login.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();

    axios({
      url: "http://localhost:4000/login",
      method: "POST",
      withCredentials: true,
      data: {
        id: id,
        password: password,
      },
    }).then((result) => {
      if (result.status === 200) {
        navigate("/blog");
      }
    });
  };

  return (
    <>
      <div className="login__box">
        <h1>LOGIN</h1>
        <form method="post" onSubmit={sendData}>
          <div className="mt-3 id">
            <label className="mb-2" htmlFor="input-email"></label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={idHandler}
              id="input-email"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="mt-3 password">
            <label className="mb-2" htmlFor="input-pw"></label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={passwordHandler}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-4 password">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
          </div>
        </form>
        <p>SNS 간편로그인</p>
        <img
          src={kakaoImg}
          alt="카카오 로그인"
          className="Kakao_symbol"
          onClick={() => {
            window.location.href = kakaoAuthUrl;
          }}
        />
      </div>
    </>
  );
}
