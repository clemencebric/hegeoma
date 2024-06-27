import logo from './logo.svg';
import Header from './component/header/index'
import Footer from './component/footer/index'
import Home from './component/home/index'
import './App.css';

function App() {
  return (
    <div className="App">
          <div>
            <Header />
            <Home />
            <Footer />
          </div>
    </div>
  );
}

export default App;
/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/