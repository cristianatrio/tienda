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
      buyer: {nombre, apellido, direccion, email, telefono }
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
    <div className='formulario '>
        <form onSubmit={onSubmit} className="container border solid ">
            <h2 className="pt-4 text-overflow: hidden">Datos del comprador</h2>

            <div className="row text-center">
                    <div className="col-md-12">
                      <div className="form-group p-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange} onBlur={handleBlur}
                          name="nombre"
                          placeholder="Nombre"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col-md-12">
                      <div className="form-group p-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange} onBlur={handleBlur}
                          name="apellido"
                          placeholder="apellido"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col-md-12">
                      <div className="form-group p-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange} onBlur={handleBlur}
                          name="direccion"
                          placeholder="direccion"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col-md-12">
                      <div className="form-group p-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange} onBlur={handleBlur}
                          name="email"
                          placeholder="email"
                          required
                        />
                      </div>
                    </div>
                  </div>

            
                  <div className="row text-center">
                    <div className="col-md-12">
                      <div className="form-group p-2">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange} onBlur={handleBlur}
                          name="telefono"
                          placeholder="telefono"
                          required
                        />
                      </div>
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