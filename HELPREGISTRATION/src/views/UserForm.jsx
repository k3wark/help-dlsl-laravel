import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {

    // useParams is used to get the id from the link
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {notification, setNotification} = useStateContext();

    // add a navigate by using useNavigate and importing it
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    if ( id ){
        useEffect( () => {
            setLoading(true);

            // /users is from api.php in routes at laravel
            axiosClient.get(`users/${id}`)
                // get the id as a response from inspect element which will become as 'data'
                .then( ({data}) => {
                    setLoading(false);
                    // DATA.DATA IS DA WAE
                    // get the data from the inside of data
                    // setUser(data.data);
                    
                    // to get the data within the data without using data.data, add this 'public static $wrap = false;' in the userResource
                        // this will unwrap the object
                    setUser(data);

                })
                .catch( () => {
                    setLoading(false);
                })
        }, [])
    }

    // this does not use payload then going to signup in axios from register since the line of code does not correspond such as making tokens
    const Submitting = (ev) => {

        ev.preventDefault();
        console.log (user);

        // if there is user id, proceed to update
        if ( user.id ){

            
            // put if we would like to update
            axiosClient.put(`/users/${user.id}`, user)
                .then( () => {
                    
                    // SHOW NOTIFICATION AFTER UPDATING
                    setNotification("User Updated Successfully");

                    navigate( `/users` );
                })
                .catch( (error) =>{
                    const response = error.response;
                    if (response && response.status == 422){
                        setErrors(response.data.errors);
                    }
                })
        }

        // if there is no user.id
        else{
            // this post is `/users` is only a name and post it in database if no api routing in api.php
            axiosClient.post(`/users`, user)
                .then( () => {
                    
                    // SHOW NOTIFICATION AFTER CREATING USER
                    setNotification("User Created Successfully");

                    navigate( `/users` );
                })
                .catch( (error) =>{
                    const response = error.response;
                    if (response && response.status == 422){
                        setErrors(response.data.errors);
                    }
                })
        }
    }

    return (
        <div>
            User Forms
            {/* if user.id exists, update */}
            { user.id && <h1>Update this user: {user.name}</h1>}
            {/* if user.id does not exist, create */}
            { !user.id && <h1>Create new user:</h1>}
            
            {/* if it is loading, output loading */}
            { loading &&
                <div>
                    <h1>Loading...</h1>
                </div>
            }

            {errors && 
                <div>
                {Object.keys(errors).map(key => (
                    <p key={key}> {errors[key][0]} </p>
                ))}
                </div>
            }
            

            {/* if loading is done */}
            { !loading &&
                <div>
                {/* create form */}
                    <form onSubmit={Submitting}>
                        <h2>Ew, bat ka nagpapasignup ng iba</h2>
                        {/* This is a two way data binding input fields */}
                        {/* setUser is long because it accepts object */}
                        {/* '...' is to take an existing object to destructure it which is only to add name, email, etc without hindering other values*/}
                        <input value={ user.name } onChange={ ev => setUser( {...user, name: ev.target.value} )} type="text" placeholder="Name"></input>
                        <br></br>
                        <input value={ user.email } onChange={ ev => setUser( {...user, email: ev.target.value} )} type="email" placeholder="Email"></input>
                        <br></br>
                        <input onChange={ ev => setUser( {...user, password: ev.target.value} )} type="password" placeholder="Password"></input>
                        <br></br>
                        <input onChange={ ev => setUser( {...user, password_confirmation: ev.target.value} )} type="password" placeholder="Confirm Password"></input>
                        <br></br>
                        <button type="submit">Save</button>
                    </form>
                </div>
            }

            <br></br>
            <br></br>
            <Link to={'/Users'}>FUCK GO BACK</Link>
        </div>
    )
}