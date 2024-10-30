import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const Cart = () => {
  const {cartList, removeAllItems} = useContext(CartContext)
  const renderEmpty = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
      />
      <p>Your Cart is Empty</p>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div>
        <h1>Cart Items</h1>
        <button type="button" data-testid="cart" onClick={removeAllItems}>
          Remove All
        </button>
      </div>
      <ul>
        {cartList.map(dish => (
          <CartItem key={dish.each} cartItemsDetails={dish} />
        ))}
      </ul>
    </>
  )
  return (
    <div>
      <Header />
      <div>{cartList.length === 0 ? renderEmpty() : renderCartItems()}</div>
    </div>
  )
}
export default Cart
