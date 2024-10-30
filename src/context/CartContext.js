import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllItems: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})
export default CartContext
