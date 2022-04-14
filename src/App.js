import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Barra from './components/navegacion/navbar'
import inicio from './components/paginas/incio'
import productos from './components/paginas/productos'
function App() {
  return (
    <div className="App">
      <Router>

        <Barra>
         
            <Route path='/inicio'exact Component = {inicio}/>
            <Route path='/productos'exact Component = {productos}/>
          
        </Barra>
      </Router>
      
    </div>
  );
}

export default App;
