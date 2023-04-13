import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlackButton from "./BlackButton";
import Logo from "../../../assets/Logo.gif";
import { kakaoLogoutUrl } from "../../../kakaoLoginData";

import "../../../styles/header.scss";

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
            <div className="col let">
              <Link to="/" className="logo">
                Balance Place
              </Link>
            </div>
            <div className="col right">
              <Link to="/Login">
                <BlackButton text="로그인" />
              </Link>
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
