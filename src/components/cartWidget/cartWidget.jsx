import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalProvider.jsx';


const CartWidget = () => {

  const { contextItemsCart } = useContext(GlobalContext); 

 

  return (

    <div className='cartWidget mx-5'>
      <Link to={'/cart'} >
        <FaShoppingCart size={20} color={'#eef5ff'} />&nbsp;&nbsp; 
        <span style={{color: '#88bafe'}}>{contextItemsCart}</span>
      </Link>
    </div> 
   
  )
}

export default CartWidget;