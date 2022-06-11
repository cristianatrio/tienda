import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalProvider.jsx'
import { BsBagCheckFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast';


import { db } from '../../services/firebase.js'
import { collection, addDoc } from "firebase/firestore";

const Formulario = ( { itemsCompra, totalCompra} ) => {

    const { clearCart } = useContext(GlobalContext); 
  
    const [formulario, setFormulario] = useState ({
      buyer: {
          nombre: "",
          apellido: "",
          direccion: "",
          email: "",
          telefono: ""
      },
      total: totalCompra,
      items: itemsCompra
    });
  
    const [error, setError] = useState ({});
  
    const {
        buyer: {nombre, apellido, direccion, email, telefono}
    } = formulario;
    
  
    const validarCampos = (campos) => {
        return !(Object.values(campos).some((campo) => campo === ""))
    }
  
   
    const guardarTicketCompra =  async (formulario) => {
      try {
          const coleccion = collection(db, "ordenes")
          const ordenCompra = await addDoc(coleccion, formulario)
          toast.success(`Su compra a sido registrada con el id: ${ordenCompra.id}`)
         
      } catch (error) {
          console.log(error)
      }
    };
  
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      
  
     
      if (validarCampos(formulario.buyer)) {
          guardarTicketCompra(formulario)
          setTimeout(clearCart, 4000)
      } else {
          toast.error('Por favor llene todos los campos del formulario')
      }
    }
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormulario({
          ...formulario,
          buyer: {
              ...formulario.buyer,
              [name]: value
          },
      });

    };
  
    const handleBlur = (e) => {
      const { value, name } = e.target;
      if (value === "") {
        setError({ ...error, [name]: "Este campo es obligatorio" });
        return;
      }
      setError({});
    };
  
  
    return (
      <div className='formulario'>
          <form onSubmit={onSubmit} className="container border g-2 container-fluid">
              <h2 className="col-xs-8">Datos del comprador</h2>
              <div className="row xs-4">
                 
                      <div className="form-floating">
                          <input type="text" name="nombre" className="form-control" 
                                 onChange={handleChange} onBlur={handleBlur}
                                 placeholder="Nombre" value={nombre}/>
                          <label className="form-label text-left" htmlFor="nombre">Nombre</label>
                      </div>
             
              
                      <div className="form-floating">
                          <input type="text" name="apellido" className="form-control" 
                                 onChange={handleChange} onBlur={handleBlur}
                                 placeholder="Apellido" value={apellido} />
                          <label className="form-label" htmlFor="apellido">Apellido</label>
                      </div>
                  </div>
            
  
              {/* Dirección */}
              <div className="form-floating xs-4">
                  <input type="text" name="direccion" className="form-control" 
                         onChange={handleChange} onBlur={handleBlur}
                         placeholder="Direccion" value={direccion} />
                  <label className="form-label" htmlFor="direccion">Dirección</label>
              </div>
  
              <div className="row xs-4">
                  
                      {/* Email input */}
                      <div className="form-floating">
                          <input type="email" name="email" className="form-control" 
                                 onChange={handleChange} onBlur={handleBlur}
                                 placeholder="Email" value={email} />
                          <label className="form-label" htmlFor="email">Email</label>
                      </div>
              
                
                      {/* Telefono input */}
                      <div className="form-floating">
                          <input type="text" name="telefono" className="form-control" 
                                 onChange={handleChange} onBlur={handleBlur}
                                 placeholder="Telefono" value={telefono} />
                          <label className="form-label" htmlFor="telefono">Teléfono</label>
                      </div>
                  </div>
            
  
              {/* Submit button */}
              <button type="submit" className="btn btn-success btn-block my-4">
                  <BsBagCheckFill/>{" "}Terminar compra
              </button>
  
              <Toaster/>
  
          </form>
      </div>
    )
  }
  
  export default Formulario