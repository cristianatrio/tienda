import { useState, useEffect } from 'react';
import ItemList from '../itemList/ItemList.jsx';
import Loader from '../Loader/Loader.jsx';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export default function ItemListContainer({ titulo, tipo }) {
  const [state, setState] = useState({ loading: true, productos: [] });
  useEffect(() => {
    let active = true;
    setState({ loading: true, productos: [] });
    const filters = tipo === undefined ? [orderBy('tipo')] : [where('tipo', '==', tipo)];
    const request = query(collection(db, 'productos'), ...filters, orderBy('subtipo'), orderBy('codigo'));
    getDocs(request).then(data => {
      if (active) setState({ productos: data.docs.map(doc => ({ ...doc.data(), id: doc.id })) });
    }).catch(() => {
      if (active) setState({ productos: [], error: 'No pudimos cargar el catálogo. Intentá nuevamente.' });
    });
    return () => { active = false; };
  }, [tipo]);
  return <div className="itemListContainer container pt-5">
    <h1>{titulo}</h1>
    {state.loading ? <Loader/> : state.error ? <p role="alert">{state.error}</p>
      : state.productos.length ? <ItemList productos={state.productos} tipo={tipo}/>
      : <p>No hay productos en esta categoría.</p>}
  </div>;
}
