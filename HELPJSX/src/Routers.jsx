import './stylesheets/App.css'
import { BrowserRouter as BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { MainLog } from './pages/MainLog.jsx';
import { Navbar } from './components/Navbar.jsx';
import { NavbarAdmin } from './components/NavbarAdmin.jsx';
import Home from './pages/Home.jsx';
import SOS from './pages/SOS.jsx';
import EMS from './pages/EMS.jsx';
import Security from './pages/Security.jsx';
import Fire from './pages/Fire.jsx';
import FAQ from './pages/FAQ.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from './pages/AboutUs.jsx';
import AdminHome from './pages/AdminHome.jsx';
import History from './pages/History.jsx';
import Details from './pages/MoreDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';

export default function Routers() {

  return (
    <div>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            
            <Route path="/" element={<Navbar/>}>
              <Route path="/" element={<Navigate to="/Home"/>}/>
              <Route path="/Home" element={<Home/>}/>
              <Route path="/AboutUs" element={<AboutUs/>}/>
              <Route path="/FAQs" element={<FAQ/>}/>
              <Route path="/User" element={<Profile/>}/>
              <Route path="/SOS" element={<SOS/>}/>
              <Route path="/SOS/EMS" element={<EMS/>}/>
              <Route path="/SOS/Security" element={<Security/>}/>
              <Route path="/SOS/Fire" element={<Fire/>}/>
            </Route>

            <Route path="/Admin" element={<NavbarAdmin/>}>
              <Route path="/Admin" element={<Navigate to="/Admin/Home"/>}/>
              <Route path="/Admin/Home" element={<AdminHome/>}/>
              <Route path="/Admin/Profile" element={<Profile/>}/>
              <Route path="/Admin/ViewHistory" element={<History/>}/>
              <Route path="/Admin/ViewHistory/:id" element={<Details/>}/>
            </Route>

            <Route path="/Login" element={<MainLog/>}/>
            <Route path="*" element={<NotFound/>}/>
            
          </Routes>
        </ContextProvider>
      </BrowserRouter>
      <p className='nexusTag'>NEXUS Innovation Labs Inc.</p>
    </div>
  )
}

