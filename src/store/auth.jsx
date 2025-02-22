import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [data, setData] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
    const API = 'http://localhost:3000'
    
    const storeTokenInLS = (serverToken) =>{
        setIsLoggedIn(true)
        setToken(serverToken)
        localStorage.setItem('token', serverToken)
    }
    
    const LogoutUser = () =>{
        setToken('')
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        }
    
    const userAuthentication = async() => {
        try {
            const response = await fetch(`${API}/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                const userData = await response.json()
                setData(userData)
            } else{
                console.error('error fetching user data')
                setData('')
                setIsLoggedIn(false)
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.error('error fetching user data')
        }
    }
    
    useEffect(() =>{
            userAuthentication()
    }, [isLoggedIn])
    
    return ( <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, data, token, API}}>
        {children}
    </AuthContext.Provider>
)}

export const useAuth = () =>{
    return useContext(AuthContext)
}