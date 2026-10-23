import { useState, useEffect } from 'react';
import ItemDetail from '../itemDetail/ItemDetail.jsx';
import Loader from '../Loader/Loader.jsx';
import { db } from '../../services/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export default function ItemDetailCointainer({ id }) {
  const [state, setState] = useState({ loading: true });
  useEffect(() => {
    let active = true;
    setState({ loading: true });
    getDoc(doc(db, 'productos', id)).then(snapshot => {
      if (active) setState(snapshot.exists()
        ? { producto: { ...snapshot.data(), id: snapshot.id } }
        : { error: 'Este producto no existe.' });
    }).catch(() => {
      if (active) setState({ error: 'No pudimos cargar el producto. Intentá nuevamente.' });
    });
    return () => { active = false; };
  }, [id]);
  return <div className="itemDetailContainer container pt-5">
    {state.loading ? <Loader/> : state.error
      ? <p role="alert">{state.error}</p>
      : <ItemDetail key={id} producto={state.producto}/>}
  </div>;
}
