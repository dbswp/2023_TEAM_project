import React from "react";
import styled from "styled-components";

const MyButton = styled.a`
  position: relative;
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  line-height: 1.6em;
  font-size: 1.2em;
  padding: 0.55em 0.5em;
  background-color: ${(props) => props.mainColor};
  border: 2px solid ${(props) => props.subColor};
  color: ${(props) => props.color};
  border-radius: 0.8em;
  user-select: none;
  transition: transform 0.15s ease-out;
  transform-style: preserve-3d;
  &:hover {
    background-color: ${(props) => props.hoverColor};
    transform: translateY(0.25em);
  }
`;
export default function Button({ text, clickEvent, mainColor, subColor, hoverColor, color }) {
  return (
    <MyButton onClick={clickEvent} mainColor={mainColor} subColor={subColor} hoverColor={hoverColor} color={color}>
      {text}
    </MyButton>
  );
}
