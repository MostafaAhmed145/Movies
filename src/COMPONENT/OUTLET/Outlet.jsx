


import React, { Component, PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { SaideBar } from '../SAID BAR/SaideBar'
import NavBar from '../NAV BAR/NavBar'

export class LeyOet extends Component {
    
    
    render() {
        return <>

        
        
        {/* <SaideBar/> */}

        <NavBar/>

        <Outlet/>
        </>
    }
}

