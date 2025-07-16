


import React, {  createContext, useState } from 'react'

 export  let myContext   = createContext( )

 export default function AuseContextProvider( {children} ) {


     let [ Token , setToken ] =   useState(null)
     let [ btnscroll , setBtnscroll ] =   useState(null)


    return <myContext.Provider value={ { myToken : Token  , setToken , btnscroll , setBtnscroll } } >
    
       {children}

    </myContext.Provider>
}

 