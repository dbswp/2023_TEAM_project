import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlackButton from "./BlackButton";

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
  padding: 0 80px;
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
            <LoGo src="/Logo.gif" alt="로고 이미지" />
          </Link>

          <Link to="/login">
            <BlackButton text="로그인"></BlackButton>
          </Link>
          {/* <Link to="/register">회원가입 </Link> */}
        </MyHeader>
      </HeaderIntro>
    </>
  );
}
