import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from '../cartWidget/cartWidget.jsx'
const barra = () => {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link active" aria-current="page" to="/inicio">inicio</Link>
          <Link className="nav-link" to="/productos">productos</Link>
          <CartWidget></CartWidget>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default barra