import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Services from "./component/services/index.js";
import logo from './logo.svg';
import Header from './component/header/index'
import Footer from './component/footer/index'
import Home from './component/home/index'
import Mentions from './component/mentionlegales/index.js'
import Contact from './component/contact/contact.js'
import Blog from "./component/home/blog/pageblog.js"
import Erreur from "./component/erreur/index.js"
import Login from "./component/login/login.js"
import Signup from "./component/login/signup.js"
import Faq from './component/user/faq/index.js';
import { isUserAuthorized } from './component/header/statut.js';
import AdminPage from './component/tabdebordadmin/pageadmin.js';
import HegeomaRoute from './component/privateroute/hegeomaroute.js'; /*on ne peut acceder à la page que s'il on est authentifié*/
import AdminRoute from './component/privateroute/adminroute.js';
import NonConnecteRoute from './component/privateroute/nonconnecteroute.js';
import ClientRoute from './component/privateroute/clientroute.js';
import UserSchoolList from './component/user/bdd/mesecoles/ecoles.js';
import SchoolForm from './component/user/formulaire/formschool/formschool.js';
import SchoolList from './component/tabdebordadmin/listeschool.js';
import Classes from './component/user/formulaire/formschool/classes.js';
import Eleves from './component/user/formulaire/formschool/eleves.js';
import Prof from './component/user/formulaire/formschool/prof.js';
import SearchBar from "./component/user/bdd/mesecoles/infoeleve.js";
import SearchTeachers from './component/user/bdd/mesecoles/infoprofs.js';
import EcoleInfo from './component/user/bdd/mesecoles/infoecole.js';
import { AuthProvider } from './component/privateroute/authcontext.js';
import Erreuracces from './component/erreur/pasacces.js';
import ReponseFormulaire from './component/hegeoma/reponseformulaire/reponseformulaire.js';
import ClientnoncoRoute from './component/privateroute/clientetnoncoroute.js';
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
      <AuthProvider>
      <Router>
      <Layout>
        <Routes>
          <Route element={<ClientnoncoRoute /> }>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<ClientRoute />}>
              <Route path="/faq" element= {<Faq />} /> 
              <Route path="/schoolform" element= {<SchoolForm />} /> 
              <Route path="/userschool" element= {<UserSchoolList />} /> 
              <Route path="/classes" element= {<Classes/>} /> 
              <Route path="/eleves" element= {<Eleves/>} /> 
              <Route path="/prof" element= {<Prof/>} /> 
              <Route path='/infoeleve' element={<SearchBar/>} />
              <Route path='/infoprof' element={<SearchTeachers/>} />
              <Route path='/infoecole' element={<EcoleInfo />} />
          </Route>

          <Route element={<HegeomaRoute />}>
              <Route path="/reponse-formulaire" element={<ReponseFormulaire />} />
           </Route>

          <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/school" element={<SchoolList />} />
           </Route>


          <Route path="/mentionslegales" element={<Mentions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="erreur" element={<Erreuracces />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
      </Layout>
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;