import './App.css';
import Router from './Router';
import Header from './routes/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/home/Main';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Router />
        <Main/>
      </header>
    </div>
  );
}

export default App;
