// importing outlet is needed to use outlet code etc
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect } from "react";
import axiosClient from "../axios-client.jsx";

export default function DefaultLayout(){

    // get token if there is available
    const {user, token, notification, setUser, setToken, setNotification} = useStateContext();

    // if token is not avilable, return to login
    if (!token){
        return <Navigate to="/Login" />
    }

    // onLogout accepts (ev) or event onclick
    const onLogout = (ev) => {
        ev.preventDefault()
        // console.log(user);
        // console.log(token);

        // post request to go into authcontroller tab in laravel
        axiosClient.post('/logout')
            .then( () => {
                // '{}' is used as an object which means no object in the users NOTE: WE USED OBJECT IN SETTING USER
                setUser({})
                // token as null
                setToken(null)
            })
            .catch( error => {

            })
        
    }

    // get values by using useEffect Hooks by react
    useEffect( () => {
        // this is to get values from /user in api.php
        axiosClient.get('/user')
            // create variable data
            .then( ({data}) => {
                // Set the user informations by using setUser in contextProvider
                setUser(data)
            })
    }, [])


    return (
        <div>
            <h1>====================This is default Layout====================</h1>
            <div>
                <h4>Logged in as: </h4>{user.name}
                &nbsp;
                <a href="#" onClick={onLogout} >Logout</a>
            </div>
            {/* Sidebar */}
            <aside>
                <h1>GO TO:</h1>
                <Link to="/Dashboard">Dashboard</Link>
                <br></br>   
                <Link to="/Users">Users</Link>
            </aside>
            <h1>====================This is end default Layout====================</h1>

            <br></br>
            <h1>THIS IS START OF OUTLET</h1>
            {/* Outlet is used to load child router element */}
            <Outlet />
            <h1>THIS IS END OF OUTLET</h1>

            {/* if there is notification, output notification */}
            { notification &&
                <div>
                    {notification}
                </div>
            }
        </div>
    )
}