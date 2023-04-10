import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: '양진체';
    src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  body {
    text-align: center;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  a {
  text-decoration: none;
}
`;

export default GlobalStyle;
