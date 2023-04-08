import "./App.css";
import Router from "./Router";
import GlobalStyle from "./routes/GlobalStyle";
import Header from "./routes/Header";
import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
}

export default App;
