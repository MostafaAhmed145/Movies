


import React, { Children, createContext, useState } from 'react'

 export  let myContext   = createContext( )

 export default function AuseContextProvider( {children} ) {


     let [ Token , setToken ] =   useState(null)


    return <myContext.Provider value={ { myToken : Token  , setToken} } >
    
       {children}

    </myContext.Provider>
}

 