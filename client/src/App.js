import "./App.css";
import Router from "./Router";
import GoogleMap from "./routes/GoogleMap";
import Header from "./routes/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <GoogleMap />
        <Router />
      </header>
    </div>
  );
}

export default App;
