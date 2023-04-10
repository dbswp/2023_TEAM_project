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
  background-color: #333;
  border: 2px solid #333;
  color: #fff;
  border-radius: 0.8em;
  user-select: none;
  &:hover {
  }
`;
export default function Button({ text }) {
  return <MyButton>{text}</MyButton>;
}
