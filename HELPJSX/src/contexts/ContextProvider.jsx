import { createContext, useContext, useState } from "react";

// this is to get the initial value to be broadcast as an object
const StateContext = createContext({
    currentUser: null,
    currentToken: null,
    loading: null,
    setCurrentUser: () => {},
    setCurrentToken: () => {},
    setLoading: () => {}
})

// gets children
export const ContextProvider = ( {children} ) => {

    const [currentUser, setCurrentUser] = useState({});
    const [currentToken, _setCurrentToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [loading, setLoading] = useState(false);

    const setCurrentToken = (token) => {
        _setCurrentToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={ {
            currentUser,
            setCurrentUser,
            currentToken,
            setCurrentToken,
            loading,
            setLoading,
        } }>
            {/* Outputs the children */}
            {children}
        </StateContext.Provider>
    )
}

// broadcast this useStateContext
export const useStateContext = () => useContext(StateContext);