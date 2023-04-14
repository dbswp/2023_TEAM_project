import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlackButton from "./BlackButton";
import Logo from "../../../assets/Logo.gif";
import { kakaoLogoutUrl } from "../../../kakaoLoginData";

import "../../../styles/header.scss";

window.addEventListener("scroll", () => {
  const headerWrap = document.querySelector(".headerWrap");

  let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치

  if (scrollLocation > 50 && scrollLocation < 900) {
    headerWrap.classList.add("scrollHeader");
  } else if (scrollLocation >= 900) {
    headerWrap.classList.remove("scrollHeader");
  } else {
    headerWrap.classList.remove("scrollHeader");
  }
});

export default function Header() {
  const [isLogin, setIsLogin] = useState(Boolean(document.cookie));

  const logout = () => {
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
  };
  return (
    <>
      <div className="headerWrap">
        <div className="container">
          <div className="row">
            <div className="col-8 left">
              <Link to="/" className="logo">
                Balance Place
              </Link>
            </div>
            <div className="col-4 right">
              {!isLogin ? (
                <Link to="/Login">
                  <BlackButton text="로그인" />
                </Link>
              ) : (
                <span onClick={() => logout()}>
                  <BlackButton text="로그아웃" />
                </span>
              )}

              {/* <button
                onClick={() => {
                  window.location.href = kakaoLogoutUrl;
                }}
              >
                카카오 계정 로그아웃
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
