import "./App.css";
import Router from "./Router";
import Header from "./components/common/Header/Header";
import GlobalStyle from "./components/common/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <Header />
        <Router />
        <Home />
      </header>
    </div>
  );
}

export default App;
