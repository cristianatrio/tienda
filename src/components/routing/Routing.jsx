import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Index from '../paginas/index.js'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import Layout from '../Layout/Layout'

const Routs = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="item-detail/:id" element={<ItemListContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routs