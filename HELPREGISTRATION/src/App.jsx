// to user router command, import createBrowserRouter
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { ContextProvider } from './contexts/ContextProvider.jsx';

// add the file for routers
import GuestLayout from './components/GuestLayout.jsx';
import DefaultLayout from "./components/DefaultLayout.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import UserForm from './views/UserForm.jsx';

// create a function App
function App() {
  return (
    <BrowserRouter>

      {/* contextprovider is to check tokens */}
      <ContextProvider>
        <Routes>
          
          {/* Path=web directory; element= import variable*/}
          <Route path="/" element={<DefaultLayout />}>
            {/* Children route of DefaultLayout */}
            <Route path="/" element={<Navigate to="/Dashboard" />}></Route>
            <Route path="/Users" element={<Users />}></Route>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            <Route path="/Users/new" element={<UserForm key="userCreate"/>}></Route>
            <Route path="/Users/:id" element={<UserForm key="userUpdate"/>}></Route>
          </Route>

          <Route path="/" element={<GuestLayout />}>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        
      </ContextProvider>  
    </BrowserRouter>
  )
}

// export the function App to be used in main.jsx
export default App
