import React from 'react'
import Modelo1 from './modelo1.jpeg'

import ItemCount from './itemCount'


const Cards = () => {
  return (
    <div className="card" style= {{width: "18rem"}}>
  <img src={Modelo1} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <ItemCount></ItemCount>
  </div>
</div>
  )
}


export default Cards