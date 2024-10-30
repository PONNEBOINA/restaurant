import {useContext} from 'react'
import CartContext from '../../context/CartContext'

const CartItem = ({cartItemsDetails}) => {
  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
  } = cartItemsDetails
  const {removeAllItems, increaseQuantity, decreaseQuantity} = useContext(
    CartContext,
  )

  const onI = () => increaseQuantity(dishId)
  const onD = () => decreaseQuantity(dishId)
  const OnR = () => removeAllItems(dishId)
  return (
    <li>
      <img src={dishImage} alt={dishName} />
      <div>
        <p>{dishName}</p>
        <p>
          {dishCurrency} {quantity * dishPrice}
        </p>
        <div>
          <button type="button" onClick={onD}>
            -
          </button>
          <p>{quantity}</p>
          <button type="button" onClick={onI}>
            +
          </button>
        </div>
      </div>
      <button type="button" onClick={OnR}>
        R
      </button>
    </li>
  )
}
export default CartItem
