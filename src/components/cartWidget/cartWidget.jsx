
import carrito from './carrito.png'
const CartWidget = () => {
    return (
        <div>
            <img className='icon-carrito' src={carrito} alt="carrito" style={{margin: '20px' }} width="20px" height="20px" />
        </div>
    )
}

export default CartWidget;