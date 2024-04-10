import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.jsx";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup(){
    
    // datas that are submitted in form
    const name_Ref = useRef();
    const email_Ref = useRef();
    const password_Ref = useRef();
    const confirm_password_Ref = useRef();

    // errors as variable
    const [errors, setErrors] = useState(null);

    // tokens variables
    const {setUser, setToken} = useStateContext();

    // if Register is pressed, then submit
    const Submitting = (ev) => {
        // prevent default is to stop the program to load another site
        ev.preventDefault(); 
        const payload = {
            name: name_Ref.current.value,
            email: email_Ref.current.value,
            password: password_Ref.current.value,
            // password_confirmation is the used term for confirming password in laravel
            password_confirmation: confirm_password_Ref.current.value
        }
        // console.log(payload)

        // the data of payload from /signup page ...
        // axios also access the controller from api in laravel
        axiosClient.post('/signup', payload)

        // ... will be set as variable 'data' and it will set user and tokens.
        // data user and token is from AuthController.php /signup
            .then( ({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            // if there are errors
            .catch(error => {
                // console.log(error);
                const response = error.response;
                // validation error
                if (response && response.status == 422){
                    // console.log(response.data.errors);
                    setErrors(response.data.errors);
                }

            })
    }

    return (
        <div>
            {/* if errors exists, then */}
            {errors && 
                <div>
                {Object.keys(errors).map(key => (
                    <p key={key}> {errors[key][0]} </p>
                ))}
                </div>
            }
            
            {/* form to be submitted wtih ref variables to be taken*/}
            <form onSubmit={Submitting}>
                <h1>Signup ka na pre</h1>
                
                <input ref={ name_Ref } type="text" placeholder="Name"></input>
                <br></br>
                <input ref={ email_Ref } type="email" placeholder="Email"></input>
                <br></br>
                <input ref={ password_Ref } type="password" placeholder="Password"></input>
                <br></br>
                <input ref={ confirm_password_Ref } type="password" placeholder="Confirm Password"></input>
                <br></br>
                <button type="submit">Register</button>
                <a href="/Login">Signup</a>
            </form>

            <br></br>
            <Link to="/Login">Anu gang ulaga, meron na ga akong account</Link>

        </div>
    )
}