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
import Schoolapp from './component/user/formulaire/formschool/appschool.js';
import SearchBar from "./component/user/bdd/mesecoles/infoeleve.js";
import SearchTeachers from './component/user/bdd/mesecoles/infoprofs.js';
import EcoleInfo from './component/user/bdd/mesecoles/infoecole.js';
import withAuthentication from './component/fonctions/hoc.js';
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
const Authenticatedfaq = withAuthentication(Faq);
const AuthenticatedSchoolForm = withAuthentication(SchoolForm);
const AuthenticatedUserSchoolList = withAuthentication(UserSchoolList);
const AuthenticatedClasses = withAuthentication(Classes);
const AuthenticatedEleves = withAuthentication(Eleves);
const AuthenticatedProf = withAuthentication(Prof);
const AuthenticatedSearchBar = withAuthentication(SearchBar);
const AuthenticatedSearchTeachers = withAuthentication(SearchTeachers);
const AuthenticatedEcoleInfo = withAuthentication(EcoleInfo);
const AuthenticatedSchoolapp = withAuthentication(Schoolapp);

const AuthenticatedReponseFormulaire  = withAuthentication(ReponseFormulaire );

const AuthenticatedAdminPage = withAuthentication(AdminPage);
const AuthenticatedSchoolList = withAuthentication(SchoolList);

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
              <Route path="/faq" element= {<Authenticatedfaq />} /> 
              <Route path="/schoolform" element= {<AuthenticatedSchoolForm />} /> 
              <Route path="/userschool" element= {<AuthenticatedUserSchoolList />} /> 
              <Route path="/classes" element= {<AuthenticatedClasses/>} /> 
              <Route path="/eleves" element= {<AuthenticatedEleves/>} /> 
              <Route path="/prof" element= {<AuthenticatedProf/>} /> 
              <Route path='/infoeleve' element={<AuthenticatedSearchBar />} />
              <Route path='/infoprof' element={<AuthenticatedSearchTeachers/>} />
              <Route path='/infoecole' element={<AuthenticatedEcoleInfo />} />
              <Route path='/appecole' element={<AuthenticatedSchoolapp/>} />
          </Route>

          <Route element={<HegeomaRoute />}>
              <Route path="/reponse-formulaire" element={<AuthenticatedReponseFormulaire />} />
           </Route>

          <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AuthenticatedAdminPage />} />
              <Route path="/school" element={<AuthenticatedSchoolList />} />
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