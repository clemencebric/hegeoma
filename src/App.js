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