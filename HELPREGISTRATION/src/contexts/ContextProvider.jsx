import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    // the set from the right side declaration of variable is always a void
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
})

export const ContextProvider = ({children}) => {
    // useState (insert values from database to printout using user.variable; ex: user.name)
    const [user, setUser] = useState({
        name: 'Dummy info or no token'
    });

    // useState (token)
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState("");

    // these are voids that are called with but '_' are the declaration so we can create conditional statements inside void
    const setToken = (token) => {
        _setToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = (message) => {
        _setNotification(message);

        // after 5 seconds, make notification as empty string
        setTimeout( () => {
            setNotification("")
        }, 5000)
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)