// importing outlet is needed to use outlet code
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function GuestLayout(){
    const {token} = useStateContext()

    // if user is logged in, go to "/" which goes to users
    if (token){
        return <Navigate to="/" />
    }

    return (
        <div>
            <h1>====================This is Guest Layout====================</h1>
            {/* Outlet is to render child route elements */}
            <Outlet />
            
        </div>
    )
}