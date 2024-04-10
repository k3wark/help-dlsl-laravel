// to user router command, import createBrowserRouter
import {createBrowserRouter} from "react-router-dom";

// add the file for routers
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";

createBrowserRouter([

    // create router for login
    {
        path: '/login',     // web directory
        element: <Login />  // files directory
    },

    // create router for signup
    {
        path: '/signup',
        element: <Signup />
    },

    // create router for users
    {
        path: '/users',
        element: <Users />
    },

    // create router for all
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;