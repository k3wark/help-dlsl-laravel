import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users(){
    // useState is the initial value, in users and Setusers, initial value is array
    // the left side (loading) is partnered with right side setLoading
        // loading is for the use of conditional statements while setLoading is to setting the variable
    const [users, setUsers] = useState ([]);
    const [loading, setLoading] = useState (false);
    const {notifcation, setNotification} = useStateContext();

    // get value from mysql; this is to read the useEffect without going to voids by buttons etc, it also auto updates
    useEffect( () =>{
        // go to function
        getUsers();
    }, [])

    // make a new function
    const getUsers = () => {
        // to set the values, use parenthesis instead of equal sign '='
        // before making a request, make setLoading as true
        setLoading(true)
        
        axiosClient.get('/users')
            // data is an axios property
            .then( ({data}) => {
                setLoading(false);
                // console.log(data);

                // since we have data inside data, use data.data, this is unaffected by userResource.php since this is too many datas within a data
                setUsers(data.data)
                console.log(users[0]);
            })
            .catch( () =>{
                setLoading(false);
            })
    }

    // get the u from the map to get delete on to the void
    const onDelete = ( u ) => {
        // create a popup window and if not accepted, return like nothing happened
        if ( !window.confirm ("Are you sure you want to delete this user: " + u.email)){
            return;
        }

        // request from axiosClient to delete with the user that has this id
        // users is from apiResource from routes/api.php
        axiosClient.delete(`/users/${u.id}`)
            .then( () => {
                // TODO: SHOW NOTIF
                setNotification("User Deleted Successfully");
                // go back to the void getUsers to update the table in the website
                getUsers();
            })
    }

    return (
        <div>
            These are the list of Users
            <h1>{JSON.stringify(users[0])}</h1>
            <div>
                <h1>Users</h1>
                <Link to={'/Users/new'}>Add new</Link>
            </div>
            <div>
                {/* Create Table */}
                <table>
                    {/* Table titles (table head) */}
                    <thead>
                        <tr>
                            <th>| ID</th>
                            <th>| Name</th>
                            <th>| Email</th>
                            <th>| Created at</th>
                            <th>| Actions</th>
                        </tr>
                    </thead>
                    
                    {/* create a loading window at tables */}
                    {/* if loading is true, show this tbody */}
                    { loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5">
                                    <h1>Loading...</h1>
                                </td>
                            </tr>
                        </tbody>
                    }

                    {/* Table titles (table head) */}
                    {/* if it is not loading, show users */}
                    { !loading &&
                        <tbody>
                            {/* Iterate our users from database */}
                            {/* u can be any variable name */}
                            { users.map( u => (
                                // add this key to avoid console warning
                                <tr key={u.id}>
                                    {/* This is from userresource.php from http/resources */}
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link to={"/users/" + u.id}>Update Users or Edit</Link>
                                        {/* This is to add space */}
                                        &nbsp;
                                        {/* ev is event, goes to onDelete void with the object or pass the object u or user's info */}
                                        <button onClick={ ev => onDelete(u)} > Delete User </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }

                </table>
            </div>
            
            
        </div>
    )
}