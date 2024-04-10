import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login(){

    const email_Ref = useRef();
    const password_Ref = useRef();
    const [errors, setErrors] = useState();
    const {setUser, setToken} = useStateContext();

    // if submit is pressed
    const Submitting = (ev) => {
        ev.preventDefault();
        const payload = {
            email: email_Ref.current.value,
            password: password_Ref.current.value
        }
        
        setErrors(null);
        axiosClient.post('/login', payload)
        // get data
            .then( ({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            // handle errors
            .catch( error => {
                console.log(error)
                const response = error.response;
                if (response && response.status == 422){
                    if (response.data.errors){
                        setErrors(response.data.errors);
                    }
                    else{
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                    
                    
                }
                
            })
            
    }

    return (

        <div>
            {errors && 
                <div>
                    {Object.keys(errors).map(key => (
                        <p key={key}> {errors[key][0]} </p>
                    ))}
                </div>
            }

            <form onSubmit={ Submitting }>
                <h1>Login ka na pre</h1>
                <input ref={ email_Ref } type="email" placeholder="Username"></input>
                <br></br>
                <input ref={ password_Ref} type="password" placeholder="Password"></input>
                <br></br>
                <button type="Submit">Submit</button>
            </form>
            <br></br>
            <Link to="/Signup">Register pa, wala pang account eh kainaman</Link>
        </div>
    )
}