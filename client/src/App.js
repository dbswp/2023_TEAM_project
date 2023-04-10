import "./App.css";
import Router from "./Router";
import Header from "./routes/Header";
import GlobalStyle from "./routes/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/home/Main";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <Header />
        <Router />
        <Main />
      </header>
    </div>
  );
}

export default App;
