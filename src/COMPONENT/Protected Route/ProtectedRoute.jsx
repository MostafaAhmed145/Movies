



import React from 'react'
import { Navigate } from 'react-router-dom'




export function ProtectedRoute( {children} ) {



    if (localStorage.getItem("tkn") === null ) {

        return <Navigate to="/Login" />
    }

    return <>
    
    {children}

    </>
}

export default ProtectedRoute
