

import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { myContext } from '../CONTEXT/AuseContext'

function NavBar() {

    let {  setToken } =  useContext( myContext )
    let navigate = useNavigate()



    function signOut() {
        localStorage.removeItem("tkn")
        setToken(null)
        navigate("login")
    }


    return <>
    


    <nav class="navbar navbar-expand-lg bg-black p-2">
  <div class="container-fluid">
    <Link className="navbar-brand text-primary fw-bolder" to="#">FilmFlix</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav align-items-center">
        <li class="nav-item my-1">
        <NavLink className=' py-1 px-2 rounded-1' to="Home"> HOME </NavLink>
        </li>
        <li class="nav-item my-1">
        <NavLink className=' py-1 px-2 rounded-1' to="Tranding"> Tranding</NavLink>
        </li>
        <li class="nav-item my-1">
        <NavLink className=' py-1 px-2 rounded-1'  to="TopRated">Top Rated</NavLink>
        </li>
        <li class="nav-item my-1">
        <NavLink className=' py-1 px-2 rounded-1'  to="Upcoming"> Upcoming</NavLink>
        </li>
        <li class="nav-item my-1">
        <NavLink className=' py-1 px-2 rounded-1 '  to="People"> People</NavLink>
        </li>
        
        
      </ul>
      
    </div>
    <div className=' py-2' style={ {"cursor" : "pointer" } }>
                    <span  onClick={signOut} className=' p-2 rounded-1 text-danger' > <i class="fa-solid fa-right-from-bracket text-danger"></i> Sign out</span>
                </div>
  </div>

</nav>





    
    </>
}

export default NavBar
