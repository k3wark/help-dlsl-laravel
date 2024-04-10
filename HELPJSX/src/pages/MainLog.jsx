import { Link, Navigate } from 'react-router-dom';
import '../stylesheets/MainLog.css'
import HelpLogo from '../assets/images/logoLarge.png';
import { useStateContext } from '../contexts/ContextProvider';
import { useRef, useState } from 'react';
import axiosClient from '../contexts/axios';

export function MainLog(){

    const {currentToken, setCurrentUser, setCurrentToken} = useStateContext();
    const email_Ref = useRef();
    const password_Ref = useRef();
    const [error, setError] = useState({__html: ''});

    // if there is token
    if (currentToken){
        return <Navigate to="/" />
    }

    const loggingIn = (ev) => {
        ev.preventDefault();
        setError(null);

        const payload = {
            email: email_Ref.current.value,
            password: password_Ref.current.value
        }
        
        axiosClient.post('/login', payload)
            // get data
            .then( ({data}) => {
                setCurrentUser(data.user)
                setCurrentToken(data.token)
            })
            // handle errors
            .catch( error => {
                const response = error.response;
                if (response && response.status == 422){
                    if (response.data.errors){
                        setError({
                            email: [response.data.message]
                        })
                    }
                    else{
                        setError({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    return(
        <div className='loginMainDiv'>
            <div className='helpDesc'>
                <img src={HelpLogo} alt="helpLogo"/>
                <div className='helpDescText'>
                    A system that aims to further automate the office of ISSESO into its coverage and to increase its effectiveness on fulfilling its duty; giving more possibilities to community-connection and enhancement of the services the office can provide to the stakeholders of De La Salle Lipa.
                </div>
            </div>
            <div className='loginFill'>
                    <h1>Welcome!</h1>
                    <h2>Login to your account</h2>

                    {error && 
                        <div className='errorMsg'>
                            {Object.keys(error).map(key => (
                                <p key={key}> {error[key][0]} </p>
                            ))}
                        </div>
                    }

                    <form onSubmit={loggingIn}>
                        <h3>Username</h3>
                        <input className='loginUsername' type='text' ref={ email_Ref } required />
                        <h3>Password</h3>
                        <input className='loginPassword' type='password' ref={ password_Ref } required />
                        <button className='loginBtn'>Login</button>
                    </form>

                    <div className='loginRemFor'>
                        <label className='checkbox'>
                            <input type='checkbox'/>
                            <span className='checkmark'></span>
                            <span className='loginRem'>Remember Me</span>
                        </label>
                        <Link><div className='loginFor'>Forgot Passsword?</div></Link>
                    </div>
            </div>
        </div>
    )
}