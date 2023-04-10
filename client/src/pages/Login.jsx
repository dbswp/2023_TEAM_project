import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { kakaoAuthUrl } from "../kakaoLoginData";
import kakaoImg from "../kakao_login_medium_narrow.png";

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
      <h1>로그인 페이지</h1>
      <form method="post" onSubmit={sendData}>
        <div className="mt-3 id">
          <label className="mb-2" htmlFor="input-email">
            아이디
          </label>
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
          <label className="mb-2" htmlFor="input-pw">
            비밀번호
          </label>
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
      <img
        src={kakaoImg}
        alt="카카오 로그인"
        onClick={() => {
          window.location.href = kakaoAuthUrl;
        }}
        style={{
          boxShadow: "0 3px 5px 0 black",
          borderRadius: "0.7rem",
          cursor: "pointer",
          margin: "10px",
        }}
      />
    </>
  );
}
