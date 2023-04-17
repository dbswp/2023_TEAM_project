import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../assets/Logo.gif";
import "../../../styles/header.scss";
import axios from "axios";
// import { kakaoLogoutUrl } from "../../../kakaoLoginData";

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

  const logout = async () => {
    axios
      .post("http://localhost:4000/logout", {
        token: localStorage.getItem("token"),
      })
      .then((result) => {
        console.log(result);
        localStorage.removeItem("token");
        navigate("/login");
      });
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
