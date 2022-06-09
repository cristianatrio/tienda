import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalProvider.jsx';



const CartWidget = () => {

  const { contextItemsCart } = useContext(GlobalContext); 

 

  return (

    <div className='cartWidget mx-5  textNone ml-1 p-1'>
      <Link to={'/cart'} style={{ textDecoration: "none", color: "black" }}>
        <FaShoppingCart size={30} color={'#FFFFFF'} /> 
        <span style={{color: '#FFFFFF'} } >{contextItemsCart()}</span>
      </Link>
    </div> 
   
  )
}

export default CartWidget;