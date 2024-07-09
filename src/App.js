import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import logo from './logo.svg';
import Header from './component/header/index'
import Footer from './component/footer/index'
import Home from './component/home/index'
import Mentions from './component/mentionlegales/index.js'
import Contact from './component/contact/contact.js'
import Blog from "./component/home/blog/pageblog.js"
import Erreur from "./component/erreur/index.js"

import './App.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentionslegales" element={<Mentions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
      </Layout>
    </Router>
    </div>
  );
}

export default App;