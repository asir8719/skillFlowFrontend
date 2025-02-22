import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Logout = () => {

    const {LogoutUser} = useAuth()
    useEffect(() =>{
        LogoutUser()
        toast.warning('User Logged Out!')
    }, [LogoutUser])

    return <Navigate to='/login'/>
}
