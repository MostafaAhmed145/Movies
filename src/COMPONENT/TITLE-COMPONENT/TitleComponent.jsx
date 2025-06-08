



import React, { Children, createContext, useState } from 'react'
import TitleCopnentCss from "./TitleComponent.module.css"






export let titleContext =  createContext()

export function TitleComponent({ children }) {

    

    
    


   let [ titlyComponent , setTitlyComponent ] = useState( 0  )
  

    
    return <titleContext.Provider value={{ titleCon : titlyComponent , setTitlyComponent  } }>
    
    
    {children} 
    
    
    </titleContext.Provider >
}

export default TitleComponent
