import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer.jsx'
import Header from './header/Header.jsx'


const Layout = () => {
  return (
    <div className='layout'>
        <Header/>

      
        <div className='container-fluid' style={{ paddingTop: "5%" }}>
          <Outlet/>
          
        </div>

        <Footer/>
    </div>
  )
}

export default Layout