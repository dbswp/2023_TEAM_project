import "./App.css";
import Router from "./Router";
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import GlobalStyle from "./components/common/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/media.css";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState("로그아웃");
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");

  //   if (token) {
  //     setIsLogin("로그인");
  //   }
  // });
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Router isLogin={isLogin} setIsLogin={setIsLogin} />
      </header>
    </div>
  );
}

export default App;
