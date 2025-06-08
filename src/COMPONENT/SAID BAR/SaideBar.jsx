



import React, { useContext, useEffect, useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import SaideBarCss from "./saideBar.module.css"
import { auseContext } from '../TITLE-COMPONENT/TitleComponent'
import { myContext } from '../CONTEXT/AuseContext'
import Aos from 'aos'
import "aos/dist/aos.css"

export function SaideBar() {

    

            let navigate = useNavigate()

           let [ openSaieBar , setOpenSaieBar ] =  useState( false )

            let { myToken , setToken } =  useContext( myContext )



            setToken(localStorage.getItem("tkn"))


            useEffect( ()=>{
                Aos.init( {duration : 2500} )
            } , [ ]  )


            function signOut() {
                localStorage.removeItem("tkn")
                setToken(null)
                navigate("login")
            }


            





    return <>
    
    
    
    <div className= { openSaieBar !== false ?  `${SaideBarCss.open } content bg-black  position-fixed justify-content-between flex-column  top-0 bottom-0 py-3 d-flex ` :  `${SaideBarCss.close } content bg-black position-fixed justify-content-between  flex-column top-0 bottom-0 p-3 d-flex `  } >
            

            <div className="links">

            <ul  className=' pe-3 text-center'>

                {myToken ? <>
                <li data-aos="zoom-in-up" className=' py-2' >
                    <NavLink className=' p-2 rounded-1' to="Home"><i class="fa-solid fa-house"></i> HOME </NavLink>
                </li>

                

                <li className=' py-2' >
                    <NavLink className=' p-2 rounded-1' to="Tranding"> Tranding</NavLink>
                </li>

                <li className=' py-2'>
                    <NavLink className=' p-2 rounded-1'  to="TopRated">Top Rated</NavLink>
                </li>

                <li className=' py-2'>
                    <NavLink className=' p-2 rounded-1'  to="Upcoming"><i class="fa-solid fa-diagram-next"></i> Upcoming</NavLink>
                </li>

                <li className=' py-2'>
                    <NavLink className=' p-2 rounded-1'  to="People"><i class="fa-solid fa-user"></i> People</NavLink>
                </li>



                


                <li className=' py-2'>
                    <span onClick={signOut} className={ SaideBarCss.signOut + ' p-2 rounded-1' }> <i class="fa-solid fa-right-from-bracket"></i> Sign out</span>
                </li></> : <>
                
                <li className=' py-2'>
                    <NavLink className=' p-2 rounded-1  text-white'  to="Register"> Register </NavLink>
                </li> 

                <li className=' py-2'>
                    <NavLink className=' p-2 rounded-1   text-white'  to="Login"> Login</NavLink>
                </li>
                
                </>}
                

               
            </ul>

            </div>





            <div className={ SaideBarCss.befor + "  d-flex  position-absolute end-0 top-0 bottom-0  p-2 "}>

              <div className="logo text-center">
                <img className=' w-75' src={require("../imges/logo (1).png")} alt="Logo" />
              </div>

              <div className={SaideBarCss.basr}>
                {openSaieBar == false ? <i onClick={()=>{setOpenSaieBar(true)}} class="fa-solid fa-bars fa-2x "></i> : <i onClick={ ()=>{setOpenSaieBar(false)} } class="fa-solid fa-xmark fa-2x"></i>  }
              </div>

              <div className={SaideBarCss.shear + " flex-column text-center"}>
                
              <i class="fa-solid fa-share-nodes fa-1x"></i>
              <Link to={"https://www.google.com"}><i class="fa-solid fa-globe fa-1x p-2"></i></Link>
              </div>
            </div>







            <div className="content">
                <div className="myAcounte d-flex justify-content-evenly align-items-center">
                <Link to="https://www.facebook.com/profile.php?id=100055746897260"> <i class="fa-brands fa-facebook text-white"></i> </Link>
                <Link to={"https://wa.me/201121122552"} target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-square-whatsapp text-white"></i></Link>
                <Link to="https://github.com/github-mostafahassan"> <i class="fa-brands fa-github fa-1x p-2 text-white"></i> </Link>
                

                </div>

                <div className="p-3 text-white">
                    <p>Copyright © 2024 All Rights Reserved. </p>
                    <p>Created by : <Link className=' text-danger' to="https://github.com/github-mostafahassan">MOSTAFA HASSAN</Link></p>
                </div>
            </div>



        </div>
        
    
    
    
    
    
    
    </>
}







