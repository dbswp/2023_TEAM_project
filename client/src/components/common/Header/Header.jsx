import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../assets/Logo.gif";
import "../../../styles/header.scss";
import axios from "axios";
import { kakaoLogoutUrl } from "../../../kakaoLoginData";

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
export default function Header({ isLogin, setIsLogin, className }) {
  const navigate = useNavigate();

  const logoutKakao = async () => {
    const logoutUser = await axios.get("http://localhost:4000/logout");
    console.log(logoutUser.statusText);
    if (logoutUser.status === 200) navigate("/login");
  };

  const logout = () => {
    if (
      window.localStorage.getItem("kakaoAccessToken") &&
      JSON.parse(window.localStorage.getItem("login")) === "로그아웃" &&
      window.localStorage.getItem("kakao")
    ) {
      window.location.href = kakaoLogoutUrl;
      window.localStorage.removeItem("kakao");
      navigate("/login");
    } else if (
      window.localStorage.getItem("kakaoAccessToken") &&
      JSON.parse(window.localStorage.getItem("login")) === "로그아웃"
    ) {
      setIsLogin(
        window.localStorage.setItem("login", JSON.stringify("로그인"))
      );
      window.location.replace("/login");
    } else {
      // 로그아웃 할 때 쿠키삭제하는 방법 (옛날에 만든 토큰이라고 지정해서 없애는 방법)
      // document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "x_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      window.location.reload();
    }
  };

  return (
    <>
      <div className="headerWrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 left">
              <Link to="/" className="logo">
                Balance Place
              </Link>
            </div>
            <div className="col-4 right">
              {isLogin === "로그인" ? (
                <span onClick={() => logout()}>
                  <button className="blackBtn">{"로그아웃"}</button>
                </span>
              ) : (
                <Link to="/Login">
                  <button className="blackBtn">{"로그인"}</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
