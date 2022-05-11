import React from 'react'
import { Outlet } from 'react-router-dom';
import Barra from '../navegacion/navbar.js'

const Layout = () => {
  return (
    <>
        <header>
          <Barra/>
        </header>
       
       <Outlet/>
    </>
  )
}

export default Layout