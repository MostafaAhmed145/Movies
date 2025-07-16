import React, { useContext, useEffect, useState } from 'react'
import { myContext } from '../CONTEXT/AuseContext'

function ButtonScrolTop() {


    let [ showButton , setShowButton ] = useState(false)


  

    useEffect( ()=>{
        
        let btnScrollToTop = ()=>{
            setShowButton(window.pageYOffset > 250 )
        }

        window.addEventListener("scroll" , btnScrollToTop)
    } , [])

    let btnScroll = ()=>{
        window.scrollTo({
            top : 0 ,
            behavior : 'smooth'
        })
    }





    


    return <>

    {showButton ? <button onClick={btnScroll} className=' btn bg-danger text-white position-fixed end-0 bottom-0 m-3 rounded-circle z-3'>
        <i className="fa-solid fa-arrow-up"></i>
    </button> : "" }
    
    
    
    </>
}

export default ButtonScrolTop
