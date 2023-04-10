import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlackButton from "./BlackButton";
import Logo from "../../../assets/Logo.gif";

const HeaderIntro = styled.div`
  position: sticky;
  height: 80px;
  border-bottom: 3px solid #ccc;
`;
const MyHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 140;
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
          <Link to="./Login">
            <BlackButton text="로그인"></BlackButton>
          </Link>

          {/* <Link to="/register">회원가입 </Link> */}
        </MyHeader>
      </HeaderIntro>
    </>
  );
}
