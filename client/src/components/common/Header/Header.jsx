import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlackButton from "./BlackButton";
import Logo from "../../../assets/Logo.gif";
import { kakaoLogoutUrl } from "../../../kakaoLoginData";

const HeaderIntro = styled.div`
  height: 80px;
  border-bottom: 2px solid #ccc;
  background-color: #fff;
`;
const MyHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 6;
  flex-basis: 140;
`;

const MyGnb = styled.div`
  & > :first-child {
    margin-right: 0.75rem;
  }

  & > :last-child {
    margin-right: 0;
  }
`;
const LoGo = styled.img`
  width: 100px;
`;

export default function Header() {
  return (
    <>
      <HeaderIntro>
        <MyHeader>
          <Link to="/">
            <img src={Logo} />
          </Link>

          <MyGnb>
            <Link to="/Login">
              <BlackButton text="로그인" />
            </Link>

            <Link to="/register">
              <BlackButton text="회원가입" />
            </Link>

            <button
              onClick={() => {
                window.location.href = kakaoLogoutUrl;
              }}
            >
              카카오 계정 로그아웃
            </button>
          </MyGnb>
        </MyHeader>
      </HeaderIntro>
    </>
  );
}
