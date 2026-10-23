import React, { useContext, useState, useRef } from 'react'

import { GlobalContext } from '../../context/GlobalProvider.jsx'
import { BsBagCheckFill } from 'react-icons/bs'
import toast from 'react-hot-toast';

// Firebase
import { db } from '../../services/firebase.js'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
  const [sending, setSending] = useState(false);
  const submitting = useRef(false);
  const [emailConfirm, setEmailConfirm] = useState("");

  const {
      buyer: {nombre, apellido, direccion, email, telefono}
  } = formulario;
  
  // valida que ningun campo este vacío   
  const validarCampos = (campos) => {
      return !(Object.values(campos).some((campo) => typeof campo !== "string" || campo.trim() === ""))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    if (email.trim() !== emailConfirm.trim() || !validarCampos(formulario.buyer) || !itemsCompra.length || totalCompra <= 0) {
      toast.error('Completá los datos y agregá productos al carrito.');
      return;
    }
    submitting.current = true;
    setSending(true);
    try {
      const buyer = Object.fromEntries(Object.entries(formulario.buyer).map(([key, value]) => [key, value.trim()]));
      const order = await addDoc(collection(db, "ordenes"), {
        buyer, total: totalCompra, items: itemsCompra, fecha: serverTimestamp(), estado: "generada"
      });
      toast.success(`Compra registrada: ${order.id}`);
      clearCart();
    } catch {
      toast.error('No pudimos registrar la compra. Tu carrito se conserva; intentá nuevamente.');
    } finally {
      submitting.current = false;
      setSending(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
        ...formulario,
        buyer: {
            ...formulario.buyer,
            [name]: value
        },
    });
    // console.log(formulario)
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
        <form onSubmit={onSubmit} className="container border px-5 py-3 ">
            <h2 className="pb-4">Datos del comprador</h2>
            <div className="row mb-4">
                <div className="col">
                    <div className="form-floating">
                        <input type="text" id="nombre" required maxLength={200} disabled={sending} name="nombre" className="form-control" 
                               onChange={handleChange} onBlur={handleBlur}
                               placeholder="Nombre" value={nombre}/>
                        <label className="form-label text-left" htmlFor="nombre">Nombre</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating">
                        <input type="text" id="apellido" required maxLength={200} disabled={sending} name="apellido" className="form-control" 
                               onChange={handleChange} onBlur={handleBlur}
                               placeholder="Apellido" value={apellido} />
                        <label className="form-label" htmlFor="apellido">Apellido</label>
                    </div>
                </div>
            </div>

            {/* Dirección */}
            <div className="form-floating mb-4">
                <input type="text" id="direccion" required maxLength={200} disabled={sending} name="direccion" className="form-control" 
                       onChange={handleChange} onBlur={handleBlur}
                       placeholder="Direccion" value={direccion} />
                <label className="form-label" htmlFor="direccion">Dirección</label>
            </div>

            <div className="row mb-4">
                <div className="col">
                    {/* Email input */}
                    <div className="form-floating">
                        <input type="email" id="email" required maxLength={200} disabled={sending} name="email" className="form-control" 
                               onChange={handleChange} onBlur={handleBlur}
                               placeholder="Email" value={email} />
                        <label className="form-label" htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="col">
                    {/* Telefono input */}
                    <div className="form-floating">
                        <input type="text" id="telefono" required maxLength={200} disabled={sending} name="telefono" className="form-control" 
                               onChange={handleChange} onBlur={handleBlur}
                               placeholder="Telefono" value={telefono} />
                        <label className="form-label" htmlFor="telefono">Teléfono</label>
                    </div>
                </div>
            </div>

            <label htmlFor="emailConfirm">Repetir email</label><input id="emailConfirm" type="email" required maxLength={200} disabled={sending} className="form-control" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} />
            <button type="submit" disabled={sending} aria-busy={sending} className="btn btn-success btn-block my-4">
                <BsBagCheckFill/>{" "}Terminar compra
            </button>

            

        </form>
    </div>
  )
}

export default Formulario
