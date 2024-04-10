import './component-css/Navbar.css';
import {Link, NavLink, Navigate, Outlet } from "react-router-dom"
import {useEffect, useState} from 'react';
import HelpLogo from '../assets/images/helpLogo.svg';
import UserAvatar from '../assets/images/userAvatar.svg'
import axiosClient from '../contexts/axios';
import { useStateContext } from '../contexts/ContextProvider';

export const Navbar = () => {

    const {currentToken, currentUser, setCurrentToken, setCurrentUser} = useStateContext();

    // if there is no token
    if ( !currentToken ){
        return <Navigate to="/Login" />
    }

    if ( currentUser.Auth_Type === "Admin"){
        return <Navigate to="/Admin" />
    }

    useEffect( () =>{
        getUser();
    }, [])

    const getUser = () => {
        axiosClient.get('/user')
            .then( ({data}) => {
                setCurrentUser(data)
                // setCurrentUser({...currentUser, Full_Name: (currentUser.First_Name + " " + currentUser.Last_Name)})
            })
            .catch( () =>{
            })
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then( () => {
                setCurrentUser({})
                setCurrentToken(null)
            })
            .catch( error => {

            })
    }
  
    const [open, setOpen] = useState(false);

    return (
        <div>
            <nav>
                <div className='navLinks'>
                    <Link to="/Home"><img src={HelpLogo}/></Link>
                    <NavLink to="/Home"><p className='navLinkText'>Home</p></NavLink>
                    <NavLink to="/AboutUs"><p className='navLinkText'>About Us</p></NavLink>
                    <NavLink to="/FAQs"><p className='navLinkText'>FAQs</p></NavLink>
                    <NavLink to="/SOS"><p className='navLinkText'>Call S.O.S</p></NavLink>
                </div>

                <div className='navUser' onClick={() => setOpen(!open)}>
                    <p className='userText'>{currentUser.First_Name} {currentUser.LastName}</p>
                    <div className='userAvatar'><img src={UserAvatar}/></div>

                    {
                        open &&
                        <div className='dropdownContent'>
                            <div className='dropdownArrowContainer'><div className='dropdownArrow'></div></div>
                            <div className='dropdownMenu'>
                                <Link to ="/User"><p>User Profile</p></Link>
                                <a href="#" onClick={onLogout} ><p>Logout</p></a>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        <Outlet/>
    </div>
  )
}