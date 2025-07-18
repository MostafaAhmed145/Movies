import React, {  useEffect } from 'react'
import HeaderCss from "./header.module.css"
import Aos from 'aos'
import "aos/dist/aos.css"


function Header() {


     useEffect( ()=>{
                Aos.init( {duration : 2500} )
            } , [] )

    return <>
    
    <div className={ HeaderCss.HeaderHome + ' bg-dark vh-100 d-flex justify-content-center align-items-center' }>
            <div data-aos="zoom-in-up" className="text text-white text-center">
                
                <h1 className=' fw-bolder display-5'>Best Movies Here</h1>
                <p className="mb-4 text-lg fs-5">New, Exclusive & Exciting - Get Ready to Watch!</p>
                
            </div>
    </div>
    
    
    
    </>
}

export default Header
