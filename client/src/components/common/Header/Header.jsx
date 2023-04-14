import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../assets/Logo.gif";
import { kakaoLogoutUrl } from "../../../kakaoLoginData";
import "../../../styles/header.scss";

window.addEventListener("scroll", () => {
  const headerWrap = document.querySelector(".headerWrap");

  let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치

  if (scrollLocation > 50 && scrollLocation < 860) {
    headerWrap.classList.add("scrollHeader");
  } else if (scrollLocation >= 860) {
    headerWrap.classList.remove("scrollHeader");
  } else {
    headerWrap.classList.remove("scrollHeader");
  }
});

export default function Header() {
  // JWT 확인하는 방법
  const [isLogin, setIsLogin] = useState(Boolean(document.cookie));

  const logout = () => {
    // 로그아웃 할 때 쿠키삭제하는 방법 (옛날에 만든 토큰이라고 지정해서 없애는 방법)
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
  };
  return (
    <>
      <div className="headerWrap blogHeader">
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
                  <button className="blackBtn">로그인</button>
                </Link>
              ) : (
                <span onClick={() => logout()}>
                  <button className="blackBtn">로그아웃</button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
