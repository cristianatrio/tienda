import { Link } from 'react-router-dom'
import CartWidget from '../cartWidget/CartWidget.jsx'
import logo from '../../logo.png.png'
import './NavBar.css';
const NavBar = () => {

  return (
    <div className='navBar'>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top mb-5">
        <div className="container-fluid mx-3">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown" >
            <Link to="/" className="text-decoration-none" >
              <a className="navbar-brand">
                <img alt="" src={logo} width="60" height="60"
                  className="d-inline-block align-center" />
                &nbsp;&nbsp;&nbsp;Tienda Airkids
              </a>
            </Link>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{ fontSize: "120%" }} >
              <li className="nav-item px-2">
                <Link to="/" className="text-decoration-none" >
                  <a className="nav-link" aria-current="page" >
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/nosotros" className="text-decoration-none" >
                  <a className="nav-link" >
                    Sobre Nosotros
                  </a>
                </Link>
              </li>
              <li className="nav-item dropdown px-2">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link to='tipo/cortos' className="text-decoration-none" >
                      <a className="dropdown-item" >
                        Cortos
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to='tipo/largos' className="text-decoration-none" >
                      <a className="dropdown-item" >
                        Largos
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to='tipo/mediaestacion' className="text-decoration-none" >
                      <a className="dropdown-item" >
                        Media Estacion
                      </a>
                    </Link>
                  </li>
                  <li><hr className="/dropdown-divider" /></li>
                  <li>
                    <Link to="/productos" className="text-decoration-none" >
                      <a className="dropdown-item" >
                        Todos los Productos
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <CartWidget />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;