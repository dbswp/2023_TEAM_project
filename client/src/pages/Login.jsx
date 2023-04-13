import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { kakaoAuthUrl } from "../kakaoLoginData";
import kakaoImg from "../assets/symbol_kakaotalk.png";
import Logo from "../assets/Logo.gif";
import style from "../styles/login.css";
import BlackButton from "../components/common/Header/BlackButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:4000/login",
      method: "post",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((result) => {
      console.log(result);
      if (result.status === 200) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="login__box">
        <h1>로그인</h1>
        <form>
          <div className="mt-3 id">
            <label className="mb-2" htmlFor="input-email"></label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={emailHandler}
              id="input-email"
              placeholder="이메일을 입력하세요"
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
            <button type="submit" className="btn btn-primary" onClick={sendData}>
              로그인
            </button>
          </div>
        </form>
        <Link to="/register">
          <span className="registerFont">회원가입</span>
        </Link>
        <span className="loginFont">카카오 로그인</span>
        <img
          src={kakaoImg}
          alt="카카오 로그인"
          className="kakaoLogin"
          onClick={() => {
            window.location.href = kakaoAuthUrl;
          }}
        />
      </div>
    </>
  );
}
